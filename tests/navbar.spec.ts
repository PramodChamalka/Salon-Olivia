import { test, expect } from '@playwright/test';

test('navbar navigation works', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const navbar = page.getByRole('navigation');

  await expect(navbar).toBeVisible();

  await navbar.getByRole('link', { name: 'Services' }).click();

  await expect(page).toHaveURL(/services/);
});