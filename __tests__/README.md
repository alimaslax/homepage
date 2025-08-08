# Test Suite Documentation

This directory contains comprehensive unit tests for the ReactNiceResume project.

## Structure

```
__tests__/
├── components/       # Component tests
├── store/           # State management tests
├── pages/api/       # API route tests
├── utils/           # Utility function tests
└── README.md        # This file
```

## Test Categories

### Component Tests
- **ProfileCard.test.tsx**: Tests the interactive profile card component including animations, image handling, and user interactions
- **Header.test.tsx**: Tests navigation header including mobile/desktop behavior, scroll effects, and link management

### Store Tests
- **useSiteStore.test.ts**: Tests the Zustand store including state management, persistence, and all store actions

### API Tests
- **staticdata.test.ts**: Tests the static data API endpoint including file reading and error handling
- **send.test.ts**: Tests the email sending API including validation, SendInBlue integration, and error handling

## Running Tests

### All Tests
```bash
npm test
```

### Watch Mode (for development)
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

### CI Mode (for continuous integration)
```bash
npm run test:ci
```

## Test Coverage

The test suite aims for high coverage across:
- ✅ Component rendering and props
- ✅ User interactions and events
- ✅ State management and persistence
- ✅ API endpoints and error handling
- ✅ Accessibility features
- ✅ Mobile/desktop responsive behavior
- ✅ Edge cases and error scenarios

## Writing New Tests

When adding new tests, follow these guidelines:

### Component Tests
```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import YourComponent from '../../components/YourComponent'

describe('YourComponent', () => {
  it('should render correctly', () => {
    render(<YourComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### API Tests
```typescript
import { createMocks } from 'node-mocks-http'
import handler from '../../../pages/api/your-endpoint'

describe('/api/your-endpoint', () => {
  it('should handle requests correctly', async () => {
    const { req, res } = createMocks({ method: 'GET' })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
  })
})
```

### Store Tests
```typescript
import { renderHook, act } from '@testing-library/react'
import useYourStore from '../../store/useYourStore'

describe('useYourStore', () => {
  it('should update state correctly', () => {
    const { result } = renderHook(() => useYourStore())
    act(() => {
      result.current.updateState('new value')
    })
    expect(result.current.state).toBe('new value')
  })
})
```

## Mocking Guidelines

### Common Mocks
- Next.js router: `jest.mock('next/router')`
- Next.js Link: `jest.mock('next/link')`
- External APIs: Mock with `jest.fn()`
- File system: Mock `fs` module
- DOM APIs: Mock in `jest.setup.js`

### Environment Setup
- Use `jest.setup.js` for global mocks and configuration
- Use `beforeEach` for test-specific setup
- Always clean up mocks with `jest.clearAllMocks()`

## Test Utilities

The test setup includes:
- **@testing-library/react**: For component testing
- **@testing-library/jest-dom**: For DOM matchers
- **node-mocks-http**: For API testing
- **jest-environment-jsdom**: For browser-like environment

## Troubleshooting

### Common Issues
1. **Module not found**: Check if imports are correct and modules are installed
2. **Test timeout**: Increase timeout for async operations
3. **DOM not available**: Ensure using `jsdom` environment
4. **Mocks not working**: Verify mock placement and implementation

### Debug Tips
- Use `screen.debug()` to inspect rendered components
- Add `console.log` to see test values
- Use `--verbose` flag for detailed test output
- Check coverage report to identify untested code

## Best Practices

1. **Descriptive test names**: Use clear, specific descriptions
2. **Arrange-Act-Assert**: Structure tests clearly
3. **Test behavior, not implementation**: Focus on what users see/do
4. **Isolate tests**: Each test should be independent
5. **Mock external dependencies**: Don't test third-party code
6. **Test edge cases**: Cover error conditions and boundary cases
7. **Keep tests simple**: One assertion per test when possible