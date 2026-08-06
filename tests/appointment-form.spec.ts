import { test, expect } from '@playwright/test';

test('appointment form displays correctly', async ({ page }) => {
  await page.goto('http://localhost:3000/appointment');

  await expect(page).toHaveURL(/appointment/);

  // Check form fields
  await expect(
    page.getByRole('textbox', { name: /name/i })
  ).toBeVisible();

  await expect(
    page.getByRole('textbox', { name: /email/i })
  ).toBeVisible();

  await expect(
    page.getByRole('button', { name: /submit|book|confirm/i })
  ).toBeVisible();
});