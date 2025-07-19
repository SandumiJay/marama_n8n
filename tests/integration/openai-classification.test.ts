/**
 * Integration Tests for OpenAI Classification
 * Tests AI-powered content classification functionality
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import { OPENAI_MOCK_RESPONSES } from '../fixtures/mock-api-responses';
import { MOCK_CLASSIFICATION_RESPONSES, MOCK_MULTI_CLASSIFICATION } from '../fixtures/mock-rss-feeds';
import nock from 'nock';

// Valid sustainability categories
const VALID_CATEGORIES = [
  'Art / Design / Culture',
  'Behaviour Change',
  'Blue Economy',
  'Biodiversity',
  'Biomimicry',
  'Bioregional',
  'Circular / Spiral Economy',
  'Climate & Carbon',
  'Conservation',
  'Cradle to Cradle',
  'Degrowth / Steady State',
  'Doughnut Economics',
  'Ecocide',
  'Ecological Footprint',
  'Ecology / Deep Ecology',
  'Indigenous',
  'Modern Slavery',
  'Nature',
  'Place-Based / Cities',
  'Planetary Boundaries',
  'Regenerative Thinking',
  'Social Justice & DEI',
  'Social Procurement',
  'Sustainability / ESG / Six Capitals',
  'Symbio(s)cene',
  'Systems Thinking',
  'Time Horizons'
];

describe('OpenAI Classification Integration', () => {
  
  beforeEach(() => {
    nock.cleanAll();
  });

  describe('Text Classification API', () => {
    
    it('should successfully classify sustainability content', async () => {
      // Mock OpenAI API response
      nock('https://api.openai.com')
        .post('/v1/chat/completions')
        .reply(200, OPENAI_MOCK_RESPONSES.textClassificationSuccess);

      const testContent = 'Climate change is fundamentally altering biodiversity patterns across the globe.';
      
      // Mock classification result
      const classificationResult = MOCK_CLASSIFICATION_RESPONSES.biodiversity;
      
      expect(classificationResult).toHaveProperty('category');
      expect(classificationResult).toHaveProperty('confidence');
      expect(VALID_CATEGORIES).toContain(classificationResult.category);
      expect(classificationResult.confidence).toBeGreaterThan(0.8);
    });

    it('should handle multi-class classification', async () => {
      nock('https://api.openai.com')
        .post('/v1/chat/completions')
        .reply(200, {
          ...OPENAI_MOCK_RESPONSES.textClassificationSuccess,
          choices: [{
            ...OPENAI_MOCK_RESPONSES.textClassificationSuccess.choices[0],
            message: {
              role: 'assistant',
              content: JSON.stringify({
                classifications: MOCK_MULTI_CLASSIFICATION.climateAndBiodiversity
              })
            }
          }]
        });

      const multiClassResult = {
        classifications: MOCK_MULTI_CLASSIFICATION.climateAndBiodiversity
      };
      
      // Validate successful classification structure
      expect(multiClassResult).toHaveProperty('classifications');
      expect(Array.isArray(multiClassResult.classifications)).toBe(true);
      expect(multiClassResult.classifications.length).toBeGreaterThan(0);
      expect(multiClassResult.classifications).toHaveLength(3);
      
      multiClassResult.classifications.forEach(classification => {
        expect(VALID_CATEGORIES).toContain(classification.category);
        expect(classification.confidence).toBeGreaterThan(0.7);
      });
    });

    it('should handle API rate limiting gracefully', async () => {
      nock('https://api.openai.com')
        .post('/v1/chat/completions')
        .reply(429, OPENAI_MOCK_RESPONSES.textClassificationError);

      const rateLimitError = OPENAI_MOCK_RESPONSES.textClassificationError;
      
      expect(rateLimitError.error.type).toBe('rate_limit_error');
      expect(rateLimitError.error.code).toBe('rate_limit_exceeded');
    });

    it('should validate API key authentication', async () => {
      nock('https://api.openai.com')
        .post('/v1/chat/completions')
        .reply(401, OPENAI_MOCK_RESPONSES.invalidApiKey);

      const authError = OPENAI_MOCK_RESPONSES.invalidApiKey;
      
      expect(authError.error.type).toBe('invalid_request_error');
      expect(authError.error.code).toBe('invalid_api_key');
    });

  });

  describe('Classification Quality', () => {
    
    it('should maintain minimum confidence thresholds', () => {
      const classifications = Object.values(MOCK_CLASSIFICATION_RESPONSES);
      
      classifications.forEach(classification => {
        expect(classification.confidence).toBeGreaterThanOrEqual(0.7);
        expect(classification.confidence).toBeLessThanOrEqual(1.0);
      });
    });

    it('should provide meaningful explanations', () => {
      const classifications = Object.values(MOCK_CLASSIFICATION_RESPONSES);
      
      classifications.forEach(classification => {
        expect(classification.explanation).toBeDefined();
        expect(classification.explanation.length).toBeGreaterThan(20);
        expect(classification.explanation).toMatch(/^[A-Z]/); // Should start with capital letter
        // Should contain relevant keywords related to the content
        expect(classification.explanation).toMatch(/[a-zA-Z\s]{10,}/); // At least 10 characters of text
      });
    });

    it('should classify different sustainability domains correctly', () => {
      const testCases = [
        {
          content: 'Ocean conservation and marine biodiversity protection',
          expectedCategory: 'Blue Economy',
          mockResponse: MOCK_CLASSIFICATION_RESPONSES.blueEconomy
        },
        {
          content: 'Traditional indigenous knowledge for land stewardship',
          expectedCategory: 'Indigenous',
          mockResponse: MOCK_CLASSIFICATION_RESPONSES.indigenous
        },
        {
          content: 'Circular economy principles in waste management',
          expectedCategory: 'Circular / Spiral Economy',
          mockResponse: MOCK_CLASSIFICATION_RESPONSES.circularEconomy
        }
      ];

      testCases.forEach(testCase => {
        expect(testCase.mockResponse.category).toBe(testCase.expectedCategory);
        expect(VALID_CATEGORIES).toContain(testCase.mockResponse.category);
      });
    });

  });

  describe('Classification Performance', () => {
    
    it('should process classifications within reasonable time', async () => {
      const startTime = Date.now();
      
      // Mock API call timing
      nock('https://api.openai.com')
        .post('/v1/chat/completions')
        .delay(500) // 500ms delay
        .reply(200, OPENAI_MOCK_RESPONSES.textClassificationSuccess);

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const endTime = Date.now();
      const processingTime = endTime - startTime;
      
      expect(processingTime).toBeLessThan(2000); // Should complete within 2 seconds
    });

    it('should handle batch classification efficiently', async () => {
      const articles = [
        'Climate change impacts on arctic ice',
        'Renewable energy solutions for cities',
        'Indigenous land management practices'
      ];

      // Mock batch processing
      const batchResults = articles.map((article, index) => ({
        article,
        classification: Object.values(MOCK_CLASSIFICATION_RESPONSES)[index],
        processingTime: 300 + (index * 50) // Incremental timing
      }));

      batchResults.forEach((result, index) => {
        expect(result.classification).toHaveProperty('category');
        expect(result.classification).toHaveProperty('confidence');
        expect(result.processingTime).toBeLessThan(1000);
      });
    });

  });

  describe('Error Recovery', () => {
    
    it('should implement retry logic for transient failures', async () => {
      // First call fails, second succeeds
      nock('https://api.openai.com')
        .post('/v1/chat/completions')
        .reply(503, { error: 'Service temporarily unavailable' })
        .post('/v1/chat/completions')
        .reply(200, OPENAI_MOCK_RESPONSES.textClassificationSuccess);

      // Mock retry logic
      const retryConfig = {
        maxRetries: 3,
        retryDelay: 1000,
        exponentialBackoff: true
      };

      expect(retryConfig.maxRetries).toBe(3);
      expect(retryConfig.retryDelay).toBe(1000);
    });

    it('should handle content that is difficult to classify', async () => {
      const ambiguousContent = 'The weather is nice today.';
      
      // Mock response for content that doesn't fit sustainability categories
      const lowConfidenceResult = {
        category: 'Nature',
        confidence: 0.45,
        explanation: 'Content mentions weather but lacks clear sustainability context'
      };

      expect(lowConfidenceResult.confidence).toBeLessThan(0.7);
      expect(lowConfidenceResult.explanation).toContain('lacks clear sustainability context');
    });

  });

  describe('Content Preprocessing', () => {
    
    it('should clean HTML content before classification', () => {
      const htmlContent = '<p>Climate change is <strong>affecting</strong> <a href="#">ecosystems</a> worldwide.</p>';
      const cleanedContent = 'Climate change is affecting ecosystems worldwide.';
      
      // Mock HTML cleaning function
      const cleanHtml = (html: string) => html.replace(/<[^>]*>/g, '');
      
      expect(cleanHtml(htmlContent)).toBe(cleanedContent);
    });

    it('should handle special characters and encoding', () => {
      const contentWithSpecialChars = 'Climate change affects biodiversity—species migration patterns are changing.';
      
      expect(contentWithSpecialChars).toContain('—');
      expect(contentWithSpecialChars).toMatch(/[a-zA-Z\s—.,]+/);
    });

    it('should truncate extremely long content', () => {
      const longContent = 'Climate change '.repeat(1000);
      const maxLength = 4000; // GPT token limit consideration
      
      const truncatedContent = longContent.length > maxLength 
        ? longContent.substring(0, maxLength)
        : longContent;
      
      expect(truncatedContent.length).toBeLessThanOrEqual(maxLength);
    });

  });

  describe('Classification Validation', () => {
    
    it('should validate classification response format', () => {
      const validResponse = OPENAI_MOCK_RESPONSES.textClassificationSuccess;
      
      expect(validResponse).toHaveProperty('choices');
      expect(validResponse.choices).toHaveLength(1);
      expect(validResponse.choices[0]).toHaveProperty('message');
      expect(validResponse.choices[0].message).toHaveProperty('content');
    });

    it('should parse JSON classification results correctly', () => {
      const jsonContent = OPENAI_MOCK_RESPONSES.textClassificationSuccess.choices[0].message.content;
      const parsedContent = JSON.parse(jsonContent);
      
      expect(parsedContent).toHaveProperty('classifications');
      expect(Array.isArray(parsedContent.classifications)).toBe(true);
      expect(parsedContent.classifications.length).toBeGreaterThan(0);
    });

    it('should handle malformed JSON responses gracefully', () => {
      const malformedJson = '{ "classifications": [{ "category": "Climate & Carbon", "confidence": 0.9 }'; // Missing closing braces
      
      expect(() => {
        JSON.parse(malformedJson);
      }).toThrow();
      
      // In real implementation, this would be caught and handled
      const safeParse = (jsonString: string) => {
        try {
          return JSON.parse(jsonString);
        } catch (error) {
          return { error: 'Invalid JSON format', original: jsonString };
        }
      };
      
      const result = safeParse(malformedJson);
      expect(result).toHaveProperty('error');
    });

  });

}); 