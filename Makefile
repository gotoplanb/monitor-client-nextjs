.PHONY: setup format format-check lint lint-ci test run build clean test-e2e test-all start

# Project settings
PORT = 3000
NODE_ENV = development

# For production builds
PRODUCTION_PORT = 3000
PRODUCTION_NODE_ENV = production

setup:
	npm install

format: setup
	npx prettier --write "**/*.{js,jsx,ts,tsx,json,md}"

format-check: setup
	npx prettier --check "**/*.{js,jsx,ts,tsx,json,md}"

lint: setup
	npm run lint

lint-ci: setup
	npm run lint -- --max-warnings=0

test: setup
	npm test

test-e2e: setup
	npm run test:e2e

test-all: setup
	npm run test:ci

run: setup
	npm run dev

build: setup
	npm run build

start: build
	npm run start

ci: format-check lint-ci test-all

clean:
	rm -rf .next
	rm -rf node_modules/.cache
	rm -rf coverage
	rm -rf playwright-report
	rm -rf test-results