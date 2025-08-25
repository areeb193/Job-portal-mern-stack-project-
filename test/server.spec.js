// test/server.spec.js
const { test, expect } = require('@playwright/test');

test('local server is running', async ({ page }) => {
  // Visit the local server URL
  await page.goto('http://localhost:8000');

  // Check that the page has some content
  const title = await page.title();
  console.log('Page title:', title);

  // Expect page to have a title (not empty)
  expect(title).not.toBe('');
});
