import { test, expect } from '@playwright/test';

test('services page loads correctly', async ({ page }) => {
  await page.goto('http://localhost:3000/services');

  // Check URL
  await expect(page).toHaveURL(/services/);

  // Check page content
  await expect(
    page.getByRole('heading', { name: /services/i }).first()
  ).toBeVisible();
});