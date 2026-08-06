import { test, expect } from '@playwright/test';

test('appointment button navigates correctly', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const bookingButton = page.locator('#home')
    .getByRole('link', { name: 'Book Appointment' });

  await expect(bookingButton).toBeVisible();

  await bookingButton.click();

  await expect(page).toHaveURL(/appointment/);
});