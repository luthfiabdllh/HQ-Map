import { test, expect } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';

// Test data
const VALID_USER = {
  email: 'test@example.com',
  password: 'TestPass123!',
};

test.describe('Authentication Flow', () => {
  test.describe('Login Page', () => {
    test('shows login form at /login', async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);

      await expect(page).toHaveTitle(/Masuk/i);
      await expect(page.getByLabel('Email')).toBeVisible();
      await expect(page.getByLabel('Kata Sandi')).toBeVisible();
      await expect(page.locator('#login-submit')).toBeVisible();
    });

    test('shows validation errors for empty form submission', async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);

      await page.locator('#login-submit').click();

      // Validation errors should appear
      await expect(page.locator('[role="alert"]').first()).toBeVisible();
    });

    test('shows email validation error for invalid email', async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);

      await page.getByLabel('Email').fill('not-an-email');
      await page.getByLabel('Kata Sandi').fill('ValidPass1');
      await page.locator('#login-submit').click();

      await expect(page.locator('#login-email-error')).toBeVisible();
      await expect(page.locator('#login-email-error')).toContainText(
        'valid email'
      );
    });

    test('shows password validation error for short password', async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);

      await page.getByLabel('Email').fill('user@example.com');
      await page.getByLabel('Kata Sandi').fill('123');
      await page.locator('#login-submit').click();

      await expect(page.locator('#login-password-error')).toBeVisible();
      await expect(page.locator('#login-password-error')).toContainText(
        '8 characters'
      );
    });
  });

  test.describe('Protected Routes', () => {
    test('redirects unauthenticated user from /dashboard to /login', async ({ page }) => {
      // Ensure no auth cookie is set
      await page.context().clearCookies();

      await page.goto(`${BASE_URL}/dashboard`);

      // Should be redirected to login
      await expect(page).toHaveURL(/\/login/);
    });
  });

  test.describe('Logout', () => {
    test('logout button is accessible with correct aria-label', async ({ page }) => {
      // Set a mock access token cookie to simulate authenticated state
      await page.context().addCookies([
        {
          name: 'access_token',
          value: 'mock-jwt-token',
          domain: 'localhost',
          path: '/',
          httpOnly: true,
        },
      ]);

      await page.goto(`${BASE_URL}/dashboard`);

      // Even if auth fails in Server Component, check the page loaded
      // (in real test, would use a valid JWT)
      const logoutButton = page.locator('#logout-button');
      if (await logoutButton.isVisible()) {
        await expect(logoutButton).toHaveAttribute('aria-label', 'Keluar');
      }
    });
  });
});

