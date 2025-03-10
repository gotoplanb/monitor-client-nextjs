import { test, expect } from '@playwright/test';

test.skip('handle non-existent monitor', async ({ page }) => {
  // Visit a monitor ID that doesn't exist
  await page.goto('/monitor/999999');

  // Wait for error state to appear
  await page.waitForSelector('[data-testid="error-message"]', { timeout: 5000 });

  // Check error message content
  const errorMessage = await page.textContent('[data-testid="error-message"]');
  expect(errorMessage).toContain('not found');

  // Verify there's a way to navigate back to the home page
  const homeLink = page.locator('a[href="/"]');
  await expect(homeLink).toBeVisible();

  // Navigate back to the home page
  await homeLink.click();

  // Verify we're back on the home page
  await expect(page).toHaveURL('/');
});

test.skip('handle API server errors', async ({ page, context }) => {
  // Intercept API requests and return an error
  await context.route('**/api/v1/monitors/statuses/**', route => {
    return route.fulfill({
      status: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    });
  });

  // Visit the home page
  await page.goto('/');

  // Wait for error state to appear
  await page.waitForSelector('[data-testid="error-message"]', { timeout: 5000 });

  // Check error message content
  const errorMessage = await page.textContent('[data-testid="error-message"]');
  expect(errorMessage).toContain('Error');

  // Verify there's a retry button
  const retryButton = page.locator('[data-testid="retry-button"]');
  await expect(retryButton).toBeVisible();
});

test.skip('handle offline state', async ({ page, context }) => {
  // First load the page normally
  await page.goto('/');

  // Wait for monitors to load
  await page.waitForSelector('[data-testid="monitor-card"]', { timeout: 5000 });

  // Simulate offline state
  await context.setOffline(true);

  // Try to navigate to a monitor detail page (should show offline message)
  await page.click('[data-testid="monitor-card"]:first-child');

  // Wait for offline message
  await page.waitForSelector('[data-testid="offline-message"]', { timeout: 5000 });

  // Check offline message content
  const offlineMessage = await page.textContent('[data-testid="offline-message"]');
  expect(offlineMessage).toContain('offline');

  // Set back online
  await context.setOffline(false);
});
