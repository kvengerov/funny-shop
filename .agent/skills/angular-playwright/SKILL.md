---
name: angular-playwright
description: Guidelines for writing robust, fast, and maintainable E2E and Component tests for Angular 21+ applications using Playwright.
---

## Core Principles
1. **Locators over Selectors**: Always use `page.getByRole()`, `page.getByText()`, or `page.getByTestId()`. Avoid brittle CSS selectors like `.btn-submit` or `div > span`.
2. **Signal Awareness**: Playwright's auto-waiting logic naturally handles Angular Signals. Never use `page.waitForTimeout()`.
3. **Isolation**: Tests must be independent. Use `beforeEach` for setup but avoid shared state between tests.
4. **Zoneless Support**: Since Angular 21 is zoneless, tests must wait for specific UI states or network idleness rather than relying on a "stable zone".

## Stability & Assertions (Zoneless Ready)
- **Visibility Checks**: Use `expect(locator).toBeVisible()` instead of checking for element presence in DOM.
- **Actionability**: Avoid `page.waitForSelector()` — prefer `locator.click()` or `locator.fill()` which have built-in actionability checks.
- **Signal-based state changes**: For elements updated by Signals, always use web-first assertions like `expect(locator).toHaveText()` or `expect(locator).toBeChecked()`. They poll the DOM automatically.

## Best Practices for Angular 21

### 1. TestId Strategy
Always encourage adding `data-testid` to interactive elements in templates for stable testing.
*Example:* `<button [attr.data-testid]="'submit-btn'">Submit</button>`

### 2. Mocking API
Use `page.route()` to mock backend responses. This is preferred over mocking Angular services directly in E2E tests to keep tests as close to real user behavior as possible.

### 3. Component Testing
Ensure the `playwright/index.ts` correctly provides the `ApplicationConfig` including `provideExperimentalZonelessChangeDetection()`.

## Code Examples

### Standard E2E Test (Signal & Zoneless)
```typescript
import { test, expect } from '@playwright/test';

test('should update signal-based counter', async ({ page }) => {
  await page.goto('/counter');
  
  const incrementBtn = page.getByRole('button', { name: /increment/i });
  const display = page.getByTestId('count-value');

  // Playwright waits for actionability automatically
  await incrementBtn.click();
  
  // Auto-retrying assertion: handles Signal async update
  await expect(display).toHaveText('1');
});