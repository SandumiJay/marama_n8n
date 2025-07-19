/**
 * Test Setup Configuration for Marama n8n Workflows
 * Initializes testing environment, mocks, and global configurations
 */

import * as dotenv from 'dotenv';
import nock from 'nock';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Global test configuration
const TEST_CONFIG = {
  timeout: 30000,
  retries: 3,
  n8nInstance: process.env.N8N_TEST_INSTANCE || 'http://localhost:5678',
  openaiApiKey: process.env.OPENAI_TEST_API_KEY || 'test-key',
  supabaseUrl: process.env.SUPABASE_TEST_URL || 'https://test.supabase.co',
  supabaseKey: process.env.SUPABASE_TEST_KEY || 'test-key',
  awsRegion: process.env.AWS_TEST_REGION || 'us-east-1',
  awsBucket: process.env.AWS_TEST_BUCKET || 'test-bucket'
};

// Make configuration available globally
global.testConfig = TEST_CONFIG;

// Global setup before all tests
beforeAll(async () => {
  console.log('🧪 Setting up Marama n8n Test Environment...');
  
  // Clear any existing nock interceptors
  nock.cleanAll();
  
  // Set default nock behavior
  if (process.env.NODE_ENV === 'test') {
    nock.disableNetConnect();
    // Allow localhost connections for local testing
    nock.enableNetConnect((host) => {
      return host.includes('localhost') || host.includes('127.0.0.1');
    });
  }
});

// Global cleanup after all tests
afterAll(async () => {
  console.log('🧹 Cleaning up test environment...');
  
  // Clean up nock interceptors
  nock.cleanAll();
  nock.restore();
});

// Global setup before each test
beforeEach(() => {
  // Reset nock before each test
  nock.cleanAll();
});

// Global cleanup after each test
afterEach(() => {
  // Ensure all nock interceptors were used
  if (!nock.isDone()) {
    console.warn('⚠️  Unused nock interceptors detected:');
    console.warn(nock.pendingMocks());
  }
  
  // Clean up after each test
  nock.cleanAll();
});

// Extend Jest matchers for n8n-specific assertions
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidN8nWorkflow(): R;
      toHaveValidRSSFeed(): R;
      toBeValidSustainabilityCategory(): R;
      toHaveSuccessfulClassification(): R;
    }
  }
  
  var testConfig: typeof TEST_CONFIG;
}

// Custom Jest matchers
expect.extend({
  toBeValidN8nWorkflow(received: any) {
    const pass = received && 
                 received.nodes && 
                 Array.isArray(received.nodes) &&
                 received.connections &&
                 typeof received.connections === 'object';
    
    return {
      pass,
      message: () => pass 
        ? `Expected ${received} not to be a valid n8n workflow`
        : `Expected ${received} to be a valid n8n workflow with nodes and connections`
    };
  },
  
  toHaveValidRSSFeed(received: any) {
    const pass = received && 
                 received.title &&
                 received.items &&
                 Array.isArray(received.items);
    
    return {
      pass,
      message: () => pass
        ? `Expected ${received} not to be a valid RSS feed`
        : `Expected ${received} to be a valid RSS feed with title and items`
    };
  },
  
  toBeValidSustainabilityCategory(received: string) {
    const validCategories = [
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
    
    const pass = validCategories.includes(received);
    
    return {
      pass,
      message: () => pass
        ? `Expected ${received} not to be a valid sustainability category`
        : `Expected ${received} to be one of the valid sustainability categories: ${validCategories.join(', ')}`
    };
  },
  
  toHaveSuccessfulClassification(received: any) {
    const pass = received &&
                 received.classifications &&
                 Array.isArray(received.classifications) &&
                 received.classifications.length > 0 &&
                 received.classifications.every((c: any) => c.category && c.confidence);
    
    return {
      pass,
      message: () => pass
        ? `Expected ${received} not to have successful classification`
        : `Expected ${received} to have successful classification with categories and confidence scores`
    };
  }
});

export { TEST_CONFIG }; 