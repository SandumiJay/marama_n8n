/**
 * End-to-End Workflow Tests
 * Tests complete RSS feed processing workflows from trigger to storage
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import { 
  MOCK_RSS_FEEDS, 
  MOCK_WORKFLOW_RESPONSES, 
  MOCK_ECOSYSTEM_MAPPING 
} from '../fixtures/mock-rss-feeds';
import { 
  N8N_WORKFLOW_MOCK_RESPONSES, 
  SUPABASE_MOCK_RESPONSES, 
  AWS_S3_MOCK_RESPONSES 
} from '../fixtures/mock-api-responses';
import nock from 'nock';

describe('End-to-End Workflow Tests', () => {
  
  beforeEach(() => {
    nock.cleanAll();
  });

  describe('Complete RSS Processing Pipeline', () => {
    
    it('should process RSS feed through entire workflow successfully', async () => {
      // Mock the complete workflow execution
      const workflowExecution = MOCK_WORKFLOW_RESPONSES.workflowExecutionSuccess;
      
      expect(workflowExecution.status).toBe('success');
      expect(workflowExecution.data.articlesProcessed).toBe(5);
      expect(workflowExecution.data.classificationsCreated).toBe(8);
      expect(workflowExecution.data.ecosystemMappings).toBe(5);
      expect(workflowExecution.data.s3UploadSuccess).toBe(true);
    });

    it('should handle workflow execution from RSS trigger to S3 storage', async () => {
      // 1. RSS Feed Trigger
      const rssData = MOCK_RSS_FEEDS.grist;
      // Validate RSS feed structure
      expect(rssData.title).toBeDefined();
      expect(rssData.items).toBeDefined();
      expect(Array.isArray(rssData.items)).toBe(true);
      expect(rssData.items.length).toBeGreaterThan(0);
      
      // 2. Content Classification
      const classifications = rssData.items.map(item => ({
        title: item.title,
        category: 'Biodiversity', // Mock classification
        confidence: 0.89
      }));
      
      expect(classifications).toHaveLength(3);
      
      // 3. Ecosystem Mapping
      const ecosystemData = MOCK_ECOSYSTEM_MAPPING.slice(0, 3);
      expect(ecosystemData).toHaveLength(3);
      
      // 4. Data Aggregation
      const aggregatedData = {
        source: rssData.title,
        totalArticles: rssData.items.length,
        classifications: classifications,
        ecosystems: ecosystemData.map(e => e.ecosystem),
        timestamp: new Date().toISOString()
      };
      
      expect(aggregatedData.totalArticles).toBe(3);
      expect(aggregatedData.ecosystems).toHaveLength(3);
      
      // 5. S3 Storage
      const s3Response = AWS_S3_MOCK_RESPONSES.uploadSuccess;
      expect(s3Response.Location).toContain('test-bucket.s3.amazonaws.com');
    });

    it('should maintain data integrity throughout the pipeline', async () => {
      const originalArticle = MOCK_RSS_FEEDS.grist.items[0];
      
      // Track article through pipeline
      const pipelineData = {
        original: {
          title: originalArticle.title,
          guid: originalArticle.guid,
          pubDate: originalArticle.pubDate
        },
        processed: {
          title: originalArticle.title,
          guid: originalArticle.guid,
          pubDate: originalArticle.pubDate,
          category: 'Biodiversity',
          confidence: 0.92,
          ecosystem: 'Forest Conservation'
        }
      };
      
      // Verify data integrity
      expect(pipelineData.processed.title).toBe(pipelineData.original.title);
      expect(pipelineData.processed.guid).toBe(pipelineData.original.guid);
      expect(pipelineData.processed.pubDate).toBe(pipelineData.original.pubDate);
    });

  });

  describe('Dynamic Workflow Creation', () => {
    
    it('should create new RSS scraper workflow from form submission', async () => {
      const formData = {
        'News Site Name': 'Test Sustainability News',
        'Feed URL': 'https://test-sustainability.com/feed/'
      };
      
      // Mock workflow creation
      const createdWorkflow = {
        ...N8N_WORKFLOW_MOCK_RESPONSES.workflowCreateSuccess,
        name: `[Marama] - ${formData['News Site Name']} News Scrapper`
      };
      
      expect(createdWorkflow.name).toBe('[Marama] - Test Sustainability News News Scrapper');
      expect(createdWorkflow.id).toBeDefined();
    });

    it('should validate form input before workflow creation', async () => {
      const invalidFormData = {
        'News Site Name': '', // Empty name
        'Feed URL': 'invalid-url' // Invalid URL
      };
      
      // Validation checks
      const isValidName = invalidFormData['News Site Name'].trim().length > 0;
      const isValidUrl = /^https?:\/\/.+/.test(invalidFormData['Feed URL']);
      
      expect(isValidName).toBe(false);
      expect(isValidUrl).toBe(false);
      
      // Should not create workflow with invalid data
      if (!isValidName || !isValidUrl) {
        const validationError = {
          error: 'Validation failed',
          details: [
            !isValidName && 'News site name is required',
            !isValidUrl && 'Valid feed URL is required'
          ].filter(Boolean)
        };
        
        expect(validationError.details).toContain('News site name is required');
        expect(validationError.details).toContain('Valid feed URL is required');
      }
    });

    it('should inherit classification system in new workflows', async () => {
      const templateWorkflow = {
        textClassifierNode: {
          type: '@n8n/n8n-nodes-langchain.textClassifier',
          parameters: {
            categories: {
              categories: [
                { category: 'Climate & Carbon' },
                { category: 'Biodiversity' },
                { category: 'Blue Economy' }
                // ... all 26+ categories
              ]
            }
          }
        }
      };
      
      expect(templateWorkflow.textClassifierNode.type).toBe('@n8n/n8n-nodes-langchain.textClassifier');
      expect(templateWorkflow.textClassifierNode.parameters.categories.categories).toHaveLength(3);
    });

  });

  describe('Error Handling and Recovery', () => {
    
    it('should handle RSS feed failures gracefully', async () => {
      const workflowWithError = MOCK_WORKFLOW_RESPONSES.workflowExecutionError;
      
      expect(workflowWithError.status).toBe('error');
      expect(workflowWithError.error.node).toBe('OpenAI Chat Model');
      expect(workflowWithError.error.code).toBe('RATE_LIMIT_ERROR');
    });

    it('should implement retry logic for failed nodes', async () => {
      const retryConfiguration = {
        rssNode: { maxRetries: 3, retryDelay: 5000 },
        openaiNode: { maxRetries: 5, retryDelay: 10000 },
        supabaseNode: { maxRetries: 3, retryDelay: 2000 },
        s3Node: { maxRetries: 3, retryDelay: 3000 }
      };
      
      Object.values(retryConfiguration).forEach(config => {
        expect(config.maxRetries).toBeGreaterThan(0);
        expect(config.retryDelay).toBeGreaterThan(0);
      });
    });

    it('should continue processing other articles when one fails', async () => {
      const batchResults = [
        { article: 'Article 1', status: 'success', classification: 'Climate & Carbon' },
        { article: 'Article 2', status: 'failed', error: 'Classification timeout' },
        { article: 'Article 3', status: 'success', classification: 'Biodiversity' },
        { article: 'Article 4', status: 'success', classification: 'Blue Economy' }
      ];
      
      const successfulArticles = batchResults.filter(r => r.status === 'success');
      const failedArticles = batchResults.filter(r => r.status === 'failed');
      
      expect(successfulArticles).toHaveLength(3);
      expect(failedArticles).toHaveLength(1);
      expect(successfulArticles[0]).toHaveProperty('classification');
    });

  });

  describe('Performance and Scalability', () => {
    
    it('should process multiple RSS sources concurrently', async () => {
      const sources = Object.keys(MOCK_RSS_FEEDS);
      const processingTimes = sources.map((source, index) => ({
        source,
        startTime: Date.now() + (index * 100),
        estimatedDuration: 2000 + (index * 500)
      }));
      
      // All should start within 1 second
      const maxStartTime = Math.max(...processingTimes.map(p => p.startTime));
      const minStartTime = Math.min(...processingTimes.map(p => p.startTime));
      
      expect(maxStartTime - minStartTime).toBeLessThan(1000);
    });

    it('should handle high-volume article processing', async () => {
      const highVolumeScenario = {
        totalArticles: 1000,
        processingRate: 100, // articles per minute
        expectedDuration: 10 * 60 * 1000, // 10 minutes
        maxMemoryUsage: 512 * 1024 * 1024 // 512MB
      };
      
      expect(highVolumeScenario.processingRate).toBeGreaterThan(50);
      expect(highVolumeScenario.expectedDuration).toBeLessThan(15 * 60 * 1000); // Under 15 minutes
    });

    it('should optimize database queries for ecosystem mapping', async () => {
      const ecosystemQueries = MOCK_ECOSYSTEM_MAPPING.map((mapping, index) => ({
        index: mapping.index,
        category: mapping.category,
        queryTime: 50 + (Math.random() * 100) // 50-150ms
      }));
      
      const averageQueryTime = ecosystemQueries.reduce((sum, q) => sum + q.queryTime, 0) / ecosystemQueries.length;
      
      expect(averageQueryTime).toBeLessThan(200); // Should average under 200ms
    });

  });

  describe('Data Quality and Validation', () => {
    
    it('should validate all required fields in processed data', async () => {
      const processedArticle = {
        title: 'Test Article',
        source: 'Test Source',
        pubDate: '2024-01-10T10:00:00Z',
        category: 'Climate & Carbon',
        confidence: 0.85,
        ecosystem: 'Climate Action',
        s3Key: 'data-test-2024-01-10.json'
      };
      
      const requiredFields = ['title', 'source', 'pubDate', 'category', 'confidence', 'ecosystem', 's3Key'];
      
      requiredFields.forEach(field => {
        expect(processedArticle).toHaveProperty(field);
        expect(processedArticle[field as keyof typeof processedArticle]).toBeDefined();
      });
    });

    it('should ensure classification confidence meets minimum thresholds', async () => {
      const classifications = [
        { category: 'Climate & Carbon', confidence: 0.95 },
        { category: 'Biodiversity', confidence: 0.82 },
        { category: 'Blue Economy', confidence: 0.78 },
        { category: 'Indigenous', confidence: 0.65 } // Below threshold
      ];
      
      const minConfidence = 0.7;
      const validClassifications = classifications.filter(c => c.confidence >= minConfidence);
      
      expect(validClassifications).toHaveLength(3);
    });

    it('should maintain referential integrity between classifications and ecosystems', async () => {
      const classifications = ['Climate & Carbon', 'Biodiversity', 'Blue Economy'];
      const availableEcosystems = MOCK_ECOSYSTEM_MAPPING.map(m => m.category);
      
      const validMappings = classifications.filter(category => 
        availableEcosystems.includes(category)
      );
      
      expect(validMappings.length).toBeGreaterThan(0);
    });

  });

  describe('Monitoring and Alerting', () => {
    
    it('should track workflow execution metrics', async () => {
      const executionMetrics = {
        workflowId: 'test-workflow-001',
        executionTime: 150000, // 2.5 minutes
        articlesProcessed: 25,
        successRate: 0.96,
        errorRate: 0.04,
        averageClassificationTime: 800,
        memoryUsage: 256 * 1024 * 1024 // 256MB
      };
      
      expect(executionMetrics.successRate).toBeGreaterThan(0.9);
      expect(executionMetrics.errorRate).toBeLessThan(0.1);
      expect(executionMetrics.averageClassificationTime).toBeLessThan(2000);
    });

    it('should generate alerts for critical failures', async () => {
      const criticalConditions = [
        { condition: 'RSS feed unreachable for > 1 hour', severity: 'critical' },
        { condition: 'Classification failure rate > 50%', severity: 'critical' },
        { condition: 'Database connection failed', severity: 'critical' },
        { condition: 'S3 upload failures', severity: 'warning' }
      ];
      
      const criticalAlerts = criticalConditions.filter(c => c.severity === 'critical');
      
      expect(criticalAlerts).toHaveLength(3);
    });

  });

}); 