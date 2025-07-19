# Marama n8n Workflows - Test Suite

This directory contains comprehensive test suites for the Marama n8n workflows, covering unit tests, integration tests, and end-to-end workflow validation.

## 📁 Test Structure

```
tests/
├── fixtures/              # Mock data and test fixtures
│   ├── mock-rss-feeds.ts  # RSS feed mock data
│   └── mock-api-responses.ts # API response mocks
├── unit/                  # Unit tests for individual components
│   └── rss-feed.test.ts   # RSS feed processing tests
├── integration/           # Integration tests for external services
│   └── openai-classification.test.ts # OpenAI API integration
├── workflow/              # End-to-end workflow tests
│   └── end-to-end.test.ts # Complete pipeline tests
├── setup.ts              # Test environment setup
├── jest.config.js        # Jest configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Dependencies and scripts
└── .env.test            # Test environment variables
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- n8n instance (local or remote)
- Test API credentials

### Installation

```bash
# Navigate to tests directory
cd tests

# Install dependencies
npm install

# Set up test environment
cp .env.test.example .env.test
# Edit .env.test with your test credentials
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:workflow

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run tests for CI/CD
npm run test:ci
```

## 🧪 Test Categories

### Unit Tests

**Purpose**: Test individual components and functions in isolation

**Coverage**:
- RSS feed parsing and validation
- Content extraction and cleaning
- Data transformation logic
- Error handling mechanisms

**Example**:
```typescript
describe('RSS Feed Parsing', () => {
  it('should parse valid RSS feed correctly', async () => {
    const feedData = MOCK_RSS_FEEDS.grist;
    expect(feedData).toHaveValidRSSFeed();
    expect(feedData.items).toHaveLength(3);
  });
});
```

### Integration Tests

**Purpose**: Test integration with external services and APIs

**Coverage**:
- OpenAI API classification
- Supabase database operations
- AWS S3 file operations
- RSS feed fetching

**Example**:
```typescript
describe('OpenAI Classification Integration', () => {
  it('should successfully classify sustainability content', async () => {
    nock('https://api.openai.com')
      .post('/v1/chat/completions')
      .reply(200, OPENAI_MOCK_RESPONSES.textClassificationSuccess);
    
    // Test classification logic
  });
});
```

### End-to-End Workflow Tests

**Purpose**: Test complete workflows from trigger to completion

**Coverage**:
- Full RSS-to-storage pipeline
- Dynamic workflow creation
- Error recovery and retry logic
- Performance and scalability

**Example**:
```typescript
describe('Complete RSS Processing Pipeline', () => {
  it('should process RSS feed through entire workflow', async () => {
    const workflowExecution = MOCK_WORKFLOW_RESPONSES.workflowExecutionSuccess;
    expect(workflowExecution.status).toBe('success');
    expect(workflowExecution.data.articlesProcessed).toBe(5);
  });
});
```

## 🎯 Custom Jest Matchers

We've created custom Jest matchers for n8n-specific testing:

### `toBeValidN8nWorkflow()`
Validates n8n workflow structure
```typescript
expect(workflow).toBeValidN8nWorkflow();
```

### `toHaveValidRSSFeed()`
Validates RSS feed structure
```typescript
expect(feedData).toHaveValidRSSFeed();
```

### `toBeValidSustainabilityCategory()`
Validates sustainability category names
```typescript
expect('Climate & Carbon').toBeValidSustainabilityCategory();
```

### `toHaveSuccessfulClassification()`
Validates classification response structure
```typescript
expect(classificationResult).toHaveSuccessfulClassification();
```

## 🔧 Test Configuration

### Environment Variables

Configure test environment in `.env.test`:

```bash
# n8n Instance
N8N_TEST_INSTANCE=http://localhost:5678

# OpenAI (use test API keys)
OPENAI_TEST_API_KEY=sk-test-...

# Supabase (use test database)
SUPABASE_TEST_URL=https://test-project.supabase.co
SUPABASE_TEST_KEY=test-key...

# AWS S3 (use test bucket)
AWS_TEST_BUCKET=marama-test-bucket
```

### Jest Configuration

Key configuration options in `jest.config.js`:

- **Test Environment**: Node.js
- **Test Timeout**: 30 seconds
- **Coverage Threshold**: 70%
- **Setup Files**: Global test setup
- **Mock Configuration**: HTTP request mocking

## 📊 Mock Data

### RSS Feed Mocks

```typescript
export const MOCK_RSS_FEEDS = {
  grist: {
    url: 'https://grist.org/feed/',
    title: 'Grist',
    items: [/* article data */]
  }
  // More feed mocks...
};
```

### API Response Mocks

```typescript
export const OPENAI_MOCK_RESPONSES = {
  textClassificationSuccess: {
    choices: [{
      message: {
        content: JSON.stringify({
          classifications: [/* classification data */]
        })
      }
    }]
  }
  // More response mocks...
};
```

## 🚦 Test Strategies

### Mocking External Services

We use `nock` to mock HTTP requests:

```typescript
nock('https://api.openai.com')
  .post('/v1/chat/completions')
  .reply(200, mockResponse);
```

### Database Testing

- Use test database for Supabase operations
- Seed with known test data
- Clean up after each test

### File System Testing

- Use test S3 bucket or local storage
- Mock AWS SDK operations
- Verify file operations without actual uploads

## 📈 Coverage Reports

Generate and view coverage reports:

```bash
# Generate coverage
npm run test:coverage

# View HTML report
open coverage/lcov-report/index.html
```

**Coverage Targets**:
- **Lines**: 70%
- **Functions**: 70%
- **Branches**: 70%
- **Statements**: 70%

## 🔍 Debugging Tests

### Running Individual Tests

```bash
# Run specific test file
npm test -- rss-feed.test.ts

# Run specific test case
npm test -- --testNamePattern="should parse valid RSS feed"

# Run with verbose output
npm test -- --verbose
```

### Debug Mode

```bash
# Run tests with Node.js debugging
node --inspect-brk node_modules/.bin/jest --runInBand

# Run single test with debugging
npm test -- --runInBand --no-cache rss-feed.test.ts
```

## 🚨 Error Scenarios

### Common Test Failures

1. **Network Timeouts**
   - Increase timeout values
   - Check mock configurations
   - Verify test environment

2. **API Rate Limits**
   - Use test API keys
   - Implement proper mocking
   - Add retry logic to tests

3. **Database Connection Issues**
   - Verify test database setup
   - Check connection credentials
   - Ensure proper cleanup

4. **Memory Issues**
   - Monitor memory usage
   - Implement proper cleanup
   - Use streaming for large data

## 📝 Writing New Tests

### Test Naming Convention

```typescript
describe('Component/Feature Name', () => {
  describe('Specific Functionality', () => {
    it('should behave in expected way when condition', () => {
      // Test implementation
    });
  });
});
```

### Test Structure

```typescript
// Arrange
const testData = createTestData();

// Act
const result = await functionUnderTest(testData);

// Assert
expect(result).toMatchExpectedBehavior();
```

### Best Practices

1. **Test Isolation**: Each test should be independent
2. **Clear Naming**: Descriptive test and variable names
3. **Comprehensive Coverage**: Test happy path, edge cases, and errors
4. **Mock External Dependencies**: Use mocks for external services
5. **Cleanup**: Always clean up resources after tests

## 🔄 Continuous Integration

### GitHub Actions Integration

```yaml
name: Test Suite
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd tests && npm ci
      - run: cd tests && npm run test:ci
```

### Test Reports

- **Coverage Reports**: Automatically generated
- **Test Results**: JUnit XML format for CI systems
- **Performance Metrics**: Execution time tracking

## 🤝 Contributing

### Adding New Tests

1. Create test file in appropriate directory
2. Follow naming conventions
3. Add comprehensive test cases
4. Update mock data if needed
5. Ensure tests pass locally
6. Submit pull request

### Test Review Checklist

- [ ] Tests cover new functionality
- [ ] Mock data is realistic
- [ ] Error cases are tested
- [ ] Performance impact considered
- [ ] Documentation updated

## 📞 Support

For test-related issues:

1. Check test logs and error messages
2. Verify environment configuration
3. Review mock data setup
4. Create GitHub issue with details
5. Include test output and configuration

---

**Happy Testing! 🧪**

*These tests ensure the reliability and quality of the Marama sustainability platform.* 