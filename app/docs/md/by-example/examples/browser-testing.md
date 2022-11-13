---
title: Browser Testing
links:
  - Playwright Docs: https://playwright.dev/docs/intro
  - Example Repo: https://github.com/enhance-dev/ # TODO: publish example
read-next:
  label: Read more about testing Enhance output
  mark: 🔬
  path: /docs/learn/practices/testing
  description: Enhance custom elements return strings on the server, making them easy to test for expected output.
docs-pager: false
---

Testing HTML output from Enhance is as [straightforward as comparing strings](/docs/learn/practices/testing).
But as your components grow (and cannot be extracted), or you'd like to specifically test client-side JS, it can be helpful to boot an automated browser testing tool.

<doc-callout level="caution" mark="🛠">

### Work in progress

We're still experimenting with the ideal setup before publishing findings and an example repo.

</doc-callout>

**Use this guide when...**

1. Your web components have complex features that can't be tested only based on their SSR output.
1. You want to specifically test user interactions across multiple browsers.
1. You'd like to add end-to-end tests to your Enhance application.

## Playwright + Enhance

[Playwright](https://playwright.dev/) is a cross-browser test runner commonly used for end-to-end (E2E) testing.  
It works by steering an automated browser to a web server, executing interactions, and then making assertions.
All without even having to open a browser window (headless).

For this approach we'll use [Architect's local Sandbox tooling](https://arc.codes/docs/en/reference/cli/sandbox) powered up with [the Enhance Arc plugin](https://github.com/enhance-dev/arc-plugin-enhance) to provide a smart HTTP server to send our app's components to Playwright.
This will let us test components in isolation and/or in combination without booting the entire application and all of its dependencies -- which is viable, just not the focus here.

### Install Playwright

In an established Enhance app, we'll follow [Playwright's Getting Started guide](https://playwright.dev/docs/intro).

```shell
npm init playwright@latest
```

Walk through the questions; we chose "JavaScript" in a "/tests" directory without a GitHub action, but you can change these later if you'd like.

#### Configuration

The following was added or changed in the default `playwright.config.js`:

<doc-code numbered focus="2:10">

```javascript
const config = {
  webServer: {
    command: 'cd tests/mock && npx sandbox',
    url: 'http://localhost:3333',
  },
  testDir: './tests',
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3333',
  },
};
```

</doc-code>

### Mock Architect App

#### 1. Create a mock app

Inside `./tests` create a new Enhance app:

```shell
cd tests/ &&\
npm create @enhance mock -y
```

_Be sure dependencies are installed in your mock app._

#### 2. Set up element proxies

"Proxy" each element you'd like to test from your main application to your mock app's elements.

For example, if you have a `<my-counter>` element that needs some browser testing and your project structure now looks like this:

<doc-code highlight="4,12">

```shell
.
├── app
│  ├── elements
│  │  └── my-counter.mjs
│  └── pages
├── ...
└── tests
   ├── example.spec.js
   └── mock
      └── app
         ├── elements
         │  └── my-counter.mjs
         └── pages
            └── index.html
```

</doc-code>

You can then mirror your app's `my-counter` by exporting it directly:

<doc-code numbered filename="tests/mock/app/elements/my-counter.mjs">

```javascript
export {default as default} from '../../../../app/elements/my-counter.mjs'
```

</doc-code>

Yep, it's a bit much, but since Enhance apps have a specific project structure, the path isn't likely to change.

#### 3. Make HTML pages

Create an HTML page in mock/app/pages/ for each element combination you'd like to test.

For this example, we'll add pages/counter.html:

<doc-code numbered filename="tests/mock/app/pages/counter.html">

```html
<my-counter></my-counter>
```

</doc-code>

<doc-callout level="caution">

Don't delete tests/mock/app/pages/index.html.
Playwright is configured to check the root of our web server to make sure it has booted before running tests.

</doc-callout>

#### 4. Run the mock app

We can verify our setup by running `npm start` in mock/ and visiting localhost:3333/counter.
In this case, we will see our component rendered once.

### Write a test

Okay, finally we can write a Playwright test against our custom element.
Without seeing the component's source code, you can likely guess what it does.

I've replaced the content of `example.spec.js` with the following script:

<doc-code numbered filename="tests/example.spec.js">

```javascript
const { test, expect } = require('@playwright/test')

test('counter can be incremented', async ({ page }) => {
  await page.goto('/counter')

  const button = page.locator('button')
  const count = page.locator('#count')

  await button.click()
  expect(await count.innerText()).toEqual('2')

  await button.click()
  expect(await count.innerText()).toEqual('3')
});
```

</doc-code>

### Run Playwright

From the project's root:

```shell
npx playwright test
```

🎉 (hopefully)

You can now integrate Playwright into your continuous integration process and continue to write browser tests.
