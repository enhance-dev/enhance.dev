---
title: Browser Testing
links:
  - Playwright: https://playwright.dev/
  - arc-plugin-enhance: https://github.com/enhance-dev/arc-plugin-enhance
---

Testing HTML output from Enhance is as [straightforward as comparing strings](/docs/learn/practices/testing).
But as your components grow (and cannot be extracted), or you'd like to specifically test client-side JS, it can be helpful to boot an automated browser testing tool.

**Use this guide when...**

1. Your web components have complex features that can't be tested only based on their SSR output.
1. You want to specifically test user interactions across multiple browsers.
1. You'd like to add end-to-end tests to your Enhance application.

## Playwright + `arc-plugin-enhance`

[Playwright](https://playwright.dev/) is a cross-browser test runner commonly used for end-to-end (E2E) testing.  
It works by steering an automated browser to a web server, executing interactions, and then making assertions.
All without even having to open a browser window (headless).

For this approach we'll use [Architect's local Sandbox tooling](https://arc.codes/docs/en/reference/cli/sandbox) powered up with [the Enhance Arc plugin](https://github.com/enhance-dev/arc-plugin-enhance) to provide a smart HTTP server to send our app's components to Playwright.

<doc-callout level="caution" mark="🛠">

### Work in progress

We're still experimenting with the ideal setup before publishing findings and an example repo.

</doc-callout>
