#!/bin/bash

# Marama n8n Workflow Test Runner
# Comprehensive test execution script with environment setup

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
TEST_ENV="test"
TEST_TYPE="all"
COVERAGE=false
WATCH=false
CI_MODE=false

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to show usage
show_usage() {
    cat << EOF
Usage: $0 [OPTIONS]

OPTIONS:
    -t, --type TYPE        Test type: unit, integration, workflow, all (default: all)
    -e, --env ENV          Environment: test, ci (default: test)
    -c, --coverage         Generate coverage report
    -w, --watch            Run tests in watch mode
    -ci, --ci-mode         Run in CI mode (no watch, coverage enabled)
    -h, --help             Show this help message

EXAMPLES:
    $0                     # Run all tests
    $0 -t unit -c          # Run unit tests with coverage
    $0 -t integration -w   # Run integration tests in watch mode
    $0 --ci-mode           # Run in CI mode
EOF
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -t|--type)
            TEST_TYPE="$2"
            shift 2
            ;;
        -e|--env)
            TEST_ENV="$2"
            shift 2
            ;;
        -c|--coverage)
            COVERAGE=true
            shift
            ;;
        -w|--watch)
            WATCH=true
            shift
            ;;
        -ci|--ci-mode)
            CI_MODE=true
            COVERAGE=true
            shift
            ;;
        -h|--help)
            show_usage
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            show_usage
            exit 1
            ;;
    esac
done

# Validate test type
case $TEST_TYPE in
    unit|integration|workflow|all)
        ;;
    *)
        print_error "Invalid test type: $TEST_TYPE"
        print_error "Valid types: unit, integration, workflow, all"
        exit 1
        ;;
esac

print_status "Starting Marama n8n Workflow Tests"
print_status "Test Type: $TEST_TYPE"
print_status "Environment: $TEST_ENV"

# Check if we're in the tests directory
if [[ ! -f "package.json" ]]; then
    print_error "Please run this script from the tests directory"
    exit 1
fi

# Check if node_modules exists
if [[ ! -d "node_modules" ]]; then
    print_status "Installing dependencies..."
    npm install
fi

# Set environment variables
export NODE_ENV=$TEST_ENV

# Load test environment variables
if [[ -f ".env.test" ]]; then
    print_status "Loading test environment variables..."
    set -a
    source .env.test
    set +a
else
    print_warning ".env.test file not found. Using default values."
fi

# Build Jest command
JEST_CMD="npx jest"

# Add test type specific options
case $TEST_TYPE in
    unit)
        JEST_CMD="$JEST_CMD tests/unit"
        ;;
    integration)
        JEST_CMD="$JEST_CMD tests/integration"
        ;;
    workflow)
        JEST_CMD="$JEST_CMD tests/workflow"
        ;;
    all)
        JEST_CMD="$JEST_CMD"
        ;;
esac

# Add coverage option
if [[ $COVERAGE == true ]]; then
    JEST_CMD="$JEST_CMD --coverage"
fi

# Add watch option
if [[ $WATCH == true && $CI_MODE == false ]]; then
    JEST_CMD="$JEST_CMD --watch"
fi

# Add CI mode options
if [[ $CI_MODE == true ]]; then
    JEST_CMD="$JEST_CMD --ci --watchAll=false --verbose"
fi

# Run pre-test checks
print_status "Running pre-test checks..."

# Check TypeScript compilation
print_status "Checking TypeScript compilation..."
if ! npx tsc --noEmit; then
    print_error "TypeScript compilation failed"
    exit 1
fi

# Check linting
print_status "Running ESLint..."
if ! npx eslint . --ext .ts,.js --quiet; then
    print_warning "Linting issues found. Tests will continue..."
fi

# Run the tests
print_status "Running tests with command: $JEST_CMD"
echo "----------------------------------------"

if $JEST_CMD; then
    print_success "All tests passed!"
    
    # Show coverage report location if generated
    if [[ $COVERAGE == true ]]; then
        print_status "Coverage report generated:"
        print_status "  - Text: Displayed above"
        print_status "  - HTML: coverage/lcov-report/index.html"
        print_status "  - LCOV: coverage/lcov.info"
    fi
    
    # Final success message
    echo ""
    print_success "✅ Test execution completed successfully!"
    print_success "✅ All $TEST_TYPE tests passed"
    
    if [[ $COVERAGE == true ]]; then
        print_success "✅ Coverage report generated"
    fi
    
else
    print_error "❌ Tests failed!"
    echo ""
    print_error "Test execution failed. Please check the output above for details."
    exit 1
fi 