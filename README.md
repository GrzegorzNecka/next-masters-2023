## vscode - extensions:

- sequential number

# taski

- oglądnij spotkania

# do nadrobienia:

- [i18n](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [next-international](https://next-international.vercel.app/docs/testing)
- (e02 17:25)[https://www.youtube.com/watch?v=18H-LuL0ZDg]
- (checkly)[https://www.checklyhq.com/docs/browser-checks/playwright-test/]

/\*\*

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
