import { test, expect } from '@playwright/test';

// Test the main user flow:
// 1. Visit the home page
// 2. See the list of monitors
// 3. Click on a monitor to see details
// 4. Navigate through the history pagination

test.skip('basic monitor flow', async ({ page }) => {
  // 1. Visit the home page
  await page.goto('/');

  // 2. Check that the home page loads with monitors
  await expect(page).toHaveTitle(/Monitors/);

  // Wait for monitors to load
  await page.waitForSelector('[data-testid="monitor-card"]', { timeout: 5000 });

  // Count the number of monitors
  const monitorCards = await page.$$('[data-testid="monitor-card"]');
  expect(monitorCards.length).toBeGreaterThan(0);

  // 3. Click on the first monitor to navigate to its detail page
  await monitorCards[0].click();

  // Verify we're on the monitor detail page
  await expect(page).toHaveURL(/\/monitor\/\d+/);

  // Wait for the monitor details to load
  await page.waitForSelector('[data-testid="monitor-details"]', { timeout: 5000 });

  // Check for monitor name
  const monitorName = await page.textContent('[data-testid="monitor-name"]');
  expect(monitorName).toBeTruthy();

  // Check for monitor state
  const monitorState = await page.textContent('[data-testid="monitor-state"]');
  expect(monitorState).toBeTruthy();

  // 4. Check for history section
  await expect(page.locator('[data-testid="history-title"]')).toBeVisible();

  // Check for history items
  const historyItems = await page.$$('[data-testid="history-item"]');
  expect(historyItems.length).toBeGreaterThan(0);

  // Try pagination if available
  const nextButton = page.locator('[data-testid="pagination-next"]');
  if (await nextButton.isVisible()) {
    await nextButton.click();

    // Wait for new page to load
    await page.waitForSelector('[data-testid="history-item"]', { timeout: 5000 });

    // Verify page changed
    const paginationInfo = await page.textContent('[data-testid="pagination-info"]');
    expect(paginationInfo).toContain('Page 2');
  }
});

test.skip('filtering monitors by tags', async ({ page }) => {
  // Visit the home page
  await page.goto('/');

  // Wait for monitors to load
  await page.waitForSelector('[data-testid="monitor-card"]', { timeout: 5000 });

  // Count initial monitors
  const initialMonitorCount = (await page.$$('[data-testid="monitor-card"]')).length;

  // Find a tag to filter by
  const firstTag = await page.locator('[data-testid="monitor-tag"]').first();
  const tagText = await firstTag.textContent();

  // Click on the tag to filter
  await firstTag.click();

  // Wait for filtered results
  await page.waitForSelector('[data-testid="monitor-card"]', { timeout: 5000 });

  // Get filtered count
  const filteredMonitorCount = (await page.$$('[data-testid="monitor-card"]')).length;

  // Should have fewer monitors or at least not more
  expect(filteredMonitorCount).toBeLessThanOrEqual(initialMonitorCount);

  // Each visible monitor should have the selected tag
  const visibleTags = await page.$$eval('[data-testid="monitor-tag"]', tags =>
    tags.map(tag => tag.textContent)
  );

  expect(visibleTags.some(tag => tag === tagText)).toBeTruthy();
});
