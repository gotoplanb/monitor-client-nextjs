# Monitors Client (Next.js)

A modern web client for the Monitors API built with Next.js, React, and TypeScript.

## Development

```bash
# Install dependencies
npm install

# Run the development server with Turbopack
npm run dev
```

Or use the Makefile:

```bash
# Install dependencies
make setup

# Run the development server
make run
```

## Testing

```bash
# Run unit and component tests (Jest + React Testing Library)
npm test

# Run tests in watch mode (useful during development)
npm run test:watch

# Generate test coverage report
npm run test:coverage

# Run end-to-end tests (Playwright)
npm run test:e2e

# Run end-to-end tests in debug mode (with browser UI)
npm run test:e2e:debug

# Run all tests for CI environment
npm run test:ci
```

With Makefile:

```bash
# Run unit tests
make test

# Run end-to-end tests
make test-e2e

# Run all tests (unit + e2e)
make test-all
```

## Production

```bash
# Build the application for production
npm run build

# Start the production server
npm run start
```

With Makefile:

```bash
# Build the application
make build

# Start the production server
make start
```

## Code Quality

```bash
# Run ESLint
npm run lint

# Format code with Prettier
npx prettier --write "**/*.{js,jsx,ts,tsx,json,md}"
```

With Makefile:

```bash
# Run linter
make lint

# Format code
make format

# Clean build artifacts
make clean
```

## Makefile Commands

The project includes a Makefile with the following commands:

- `make setup` - Install dependencies
- `make format` - Format code with Prettier
- `make format-check` - Check formatting without modifying files
- `make lint` - Run ESLint
- `make lint-ci` - Run ESLint with zero tolerance for warnings
- `make test` - Run unit tests
- `make test-e2e` - Run end-to-end tests
- `make test-all` - Run all tests
- `make run` - Start development server
- `make build` - Build for production
- `make start` - Start production server
- `make ci` - Run all checks and tests for CI environments
- `make clean` - Remove build artifacts
