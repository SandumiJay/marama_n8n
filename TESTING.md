# Marama n8n Workflows - Testing Guide

[![Tests](https://img.shields.io/badge/Tests-Comprehensive-green.svg)](./tests/)
[![Coverage](https://img.shields.io/badge/Coverage-70%25+-blue.svg)](./tests/coverage/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Enabled-blue.svg)](./tests/tsconfig.json)

## 🧪 Overview

This project includes a comprehensive test suite for the Marama n8n workflows, ensuring reliability and quality of the sustainability news aggregation and classification system.

## 📁 Test Structure

```
tests/
├── 📦 Framework Setup
│   ├── package.json           # Dependencies and scripts
│   ├── jest.config.js         # Jest configuration
│   ├── tsconfig.json          # TypeScript setup
│   └── setup.ts               # Global test setup
├── 🎭 Mock Data & Fixtures
│   ├── mock-rss-feeds.ts      # RSS feed test data
│   └── mock-api-responses.ts  # External API mocks
├── 🔬 Unit Tests
│   └── rss-feed.test.ts       # RSS processing tests
├── 🔗 Integration Tests
│   └── openai-classification.test.ts  # AI classification tests
├── 🌊 End-to-End Tests
│   └── end-to-end.test.ts     # Complete workflow tests
├── 🛠️ Utilities
│   ├── .env.test              # Test environment
│   ├── .gitignore             # Git exclusions
│   └── scripts/run-tests.sh   # Test runner script
└── 📖 Documentation
    └── README.md               # Detailed testing docs
```

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** 
- **npm/yarn**
- **n8n instance** (local or remote)
- **Test API credentials**

### Installation

```bash
# Navigate to tests directory
cd tests

# Install dependencies
npm install

# Set up environment
cp .env.test.example .env.test
# Edit .env.test with your test credentials
```

### Running Tests

```bash
# Quick test run
./scripts/run-tests.sh

# Specific test suites
./scripts/run-tests.sh -t unit
./scripts/run-tests.sh -t integration
./scripts/run-tests.sh -t workflow

# With coverage
./scripts/run-tests.sh -c

# Watch mode for development
./scripts/run-tests.sh -w

# CI mode
./scripts/run-tests.sh --ci-mode
```

## 🎯 Test Categories

### 🔬 Unit Tests
**Purpose**: Test individual components in isolation
- RSS feed parsing and validation
- Content extraction and cleaning
- Data transformation logic
- Error handling mechanisms

### 🔗 Integration Tests
**Purpose**: Test external service integrations
- OpenAI API classification
- Supabase database operations
- AWS S3 file operations
- RSS feed fetching

### 🌊 End-to-End Tests
**Purpose**: Test complete workflows
- Full RSS-to-storage pipeline
- Dynamic workflow creation
- Error recovery and retry logic
- Performance and scalability

## 🎭 Mock Data

### RSS Feeds
- **Grist**: Environmental news and commentary
- **Earth.Org**: Environmental awareness content
- **Inside Climate News**: Climate and energy coverage

### API Responses
- **OpenAI**: Classification responses and errors
- **Supabase**: Database operations and queries
- **AWS S3**: File upload/download operations

## 🏗️ Test Framework Features

### Custom Jest Matchers
- `toBeValidN8nWorkflow()` - Validates workflow structure
- `toHaveValidRSSFeed()` - Validates RSS feed format
- `toBeValidSustainabilityCategory()` - Validates categories
- `toHaveSuccessfulClassification()` - Validates AI results

### Environment Management
- Isolated test environment variables
- Mock service endpoints
- Test database configuration
- Safe credential handling

### Coverage & Reporting
- **Target Coverage**: 70% across all metrics
- **HTML Reports**: Visual coverage analysis
- **CI Integration**: Automated test execution
- **Performance Tracking**: Execution time monitoring

## 📊 Test Metrics

| Metric | Target | Description |
|--------|--------|-------------|
| **Lines** | 70%+ | Code lines covered by tests |
| **Functions** | 70%+ | Functions with test coverage |
| **Branches** | 70%+ | Conditional branches tested |
| **Statements** | 70%+ | Statements executed in tests |

## 🔧 Configuration

### Environment Variables

```bash
# n8n Configuration
N8N_TEST_INSTANCE=http://localhost:5678

# OpenAI (Test Keys)
OPENAI_TEST_API_KEY=sk-test-...

# Supabase (Test Database)
SUPABASE_TEST_URL=https://test.supabase.co
SUPABASE_TEST_KEY=test-key...

# AWS S3 (Test Bucket)
AWS_TEST_BUCKET=marama-test-bucket
```

### Jest Settings
- **Test Environment**: Node.js
- **Timeout**: 30 seconds
- **Setup Files**: Global test configuration
- **Mock Strategy**: HTTP request interception

## 🚦 Test Strategies

### Mocking External Services
```typescript
// HTTP request mocking with nock
nock('https://api.openai.com')
  .post('/v1/chat/completions')
  .reply(200, mockResponse);
```

### Database Testing
- Use dedicated test database
- Seed with known test data
- Clean up after each test
- Transaction rollback for isolation

### File System Testing
- Test S3 bucket or local storage
- Mock AWS SDK operations
- Verify without actual uploads
- Cleanup test artifacts

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
      - run: cd tests && npm ci
      - run: cd tests && ./scripts/run-tests.sh --ci-mode
```

### CI Features
- **Automated Execution**: On every push/PR
- **Coverage Reporting**: Automatic coverage analysis
- **Parallel Testing**: Multiple test suites concurrently
- **Artifact Storage**: Test results and coverage reports

## 🚨 Error Scenarios Tested

### Network & API Failures
- RSS feed timeout/unreachable
- OpenAI API rate limiting
- Supabase connection issues
- AWS S3 upload failures

### Data Quality Issues
- Malformed RSS feeds
- Invalid XML content
- Classification parsing errors
- Database constraint violations

### Performance Edge Cases
- High-volume article processing
- Memory usage optimization
- Concurrent workflow execution
- Database query optimization

## 📈 Coverage Reports

### Viewing Reports
```bash
# Generate coverage
npm run test:coverage

# View HTML report
open coverage/lcov-report/index.html

# View summary
cat coverage/coverage-summary.json
```

### Report Types
- **Text**: Console output summary
- **HTML**: Interactive web interface
- **LCOV**: Machine-readable format
- **JSON**: Programmatic access

## 🔍 Debugging Tests

### Running Individual Tests
```bash
# Specific test file
npm test rss-feed.test.ts

# Specific test case
npm test --testNamePattern="RSS parsing"

# Debug mode
node --inspect-brk node_modules/.bin/jest --runInBand
```

### Common Issues & Solutions

1. **Test Timeouts**
   - Increase Jest timeout values
   - Check async operation handling
   - Verify mock response timing

2. **Mock Failures**
   - Ensure nock interceptors match requests
   - Check HTTP method and URL patterns
   - Verify mock data structure

3. **Environment Issues**
   - Confirm .env.test configuration
   - Check test database connectivity
   - Validate API credentials

## 📝 Writing New Tests

### Test Structure Template
```typescript
describe('Feature Name', () => {
  beforeEach(() => {
    // Setup for each test
  });

  describe('Specific Functionality', () => {
    it('should behave correctly when condition', async () => {
      // Arrange
      const testData = createTestData();
      
      // Act
      const result = await functionUnderTest(testData);
      
      // Assert
      expect(result).toMatchExpectedBehavior();
    });
  });
});
```

### Best Practices
1. **Descriptive Names**: Clear test descriptions
2. **Isolated Tests**: Independent test execution
3. **Comprehensive Coverage**: Happy path + edge cases
4. **Mock External Dependencies**: Avoid real API calls
5. **Cleanup Resources**: Prevent test interference

## 🤝 Contributing

### Adding Tests
1. Create test file in appropriate directory
2. Follow naming conventions (`*.test.ts`)
3. Add comprehensive test cases
4. Update mock data if needed
5. Ensure all tests pass locally
6. Submit pull request with description

### Review Checklist
- [ ] Tests cover new functionality
- [ ] Mock data is realistic and complete
- [ ] Error cases are properly tested
- [ ] Performance impact is considered
- [ ] Documentation is updated

## 📞 Support

### Getting Help
- **Documentation**: Check `/tests/README.md`
- **Issues**: Create GitHub issue with details
- **Logs**: Include test output and configuration
- **Environment**: Verify setup and credentials

### Troubleshooting Steps
1. Check test environment configuration
2. Verify API credentials and connectivity
3. Review mock data and service responses
4. Check for version compatibility issues
5. Clear caches and reinstall dependencies

---

## 🎉 Test Suite Summary

The Marama n8n workflow test suite provides:

✅ **Comprehensive Coverage** - Unit, integration, and end-to-end tests  
✅ **Mock Data** - Realistic test fixtures for all scenarios  
✅ **CI/CD Ready** - Automated testing in GitHub Actions  
✅ **Performance Testing** - Scalability and efficiency validation  
✅ **Error Handling** - Robust failure scenario coverage  
✅ **Documentation** - Complete testing guidelines and examples  

**🌍 Ensuring the reliability of the Marama sustainability platform through rigorous testing practices.** 