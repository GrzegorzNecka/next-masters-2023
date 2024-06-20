## vscode - extensions:

- [wzór sklepu](https://storefront.saleor.io/default-channel/products/balance-trail-720?variant=UHJvZHVjdFZhcmlhbnQ6MzQw)
- [cms](https://app-eu-central-1-shared-euc1-02.hygraph.com/8a9ae9ef-a24b-4387-a122-b0510696c0cb/master)
- [platforma kursowa](https://lms.hyperfunctor.com/courses/nextjsmasters/next13-zadania-3)
  /\*\*

- zainstauj: https://ui.shadcn.com/docs/installation
- To learn more about Playwright Test visit:
- https://www.checklyhq.com/docs/browser-checks/playwright-test/
- https://playwright.dev/docs/writing-tests
  \*/
  const { expect, test } = require('@playwright/test')

test('visit page and take screenshot', async ({ page }) => {
// If available, we set the target URL to a preview deployment URL provided by the ENVIRONMENT_URL created by Vercel.
// Otherwise, we use the Production URL.
const targetUrl = process.env.ENVIRONMENT_URL || 'https://next-masters-2023.vercel.app'

// We visit the page. This waits for the "load" event by default.
const response = await page.goto(targetUrl)

// Test that the response did not fail
expect(response.status(),'should respond with correct status code').toBeLessThan(400)

// Take a screenshot
await page.screenshot({ path: 'screenshot.jpg' })
})

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
