# CLAUDE.md - Monitors Client Guidelines

## Build/Lint/Test Commands

- Dev: `npm run dev` or `make run` - Start dev server
- Build: `npm run build` or `make build` - Build for production
- Lint: `npm run lint` or `make lint` - Run ESLint
- Format: `make format` - Format code with Prettier
- Format Check: `make format-check` - Check formatting without modifying files
- Lint CI: `make lint-ci` - Run ESLint with zero tolerance for warnings
- Test: `npm run test` or `make test` - Run unit tests
- Test E2E: `npm run test:e2e` or `make test-e2e` - Run Playwright tests
- Test All: `npm run test:ci` or `make test-all` - Run all tests
- CI: `make ci` - Run all checks and tests for CI environments
- Clean: `make clean` - Remove build artifacts

## Code Style Guidelines

- ESLint with Next.js core-web-vitals config
- Use TypeScript types where possible
- Use React hooks for state management
- Follow Next.js file-based routing conventions

## Error Handling

- Use try/catch blocks with error state handling
- Implement error boundaries for UI components
- Show user-friendly error messages

## Testing Guidelines

### Unit Tests

- Use Jest and React Testing Library
- Test component rendering and interactions
- Mock API calls using MSW or jest.mock
- Test each component in isolation
- Follow AAA pattern (Arrange, Act, Assert)

### E2E Tests (Playwright)

- Test complete user flows
- Validate critical paths: monitor list → detail → pagination
- Use page object model pattern
- Test both success and error states
