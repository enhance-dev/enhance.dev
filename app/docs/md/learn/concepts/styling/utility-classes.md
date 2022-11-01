---
title: Utility classes
links:
  - enhance-styles: https://github.com/enhance-dev/enhance-styles#readme
  - Sample styleguide.json: https://raw.githubusercontent.com/enhance-dev/enhance-styles/main/config.json
---

Utility classes are an optimized way to apply general styling.
They remove large amounts of duplication from your stylesheets and lend visual harmony to your app.

## Styleguide

As a basis of styleguides, utility classes are unparalleled in providing a usable system for developers and a cohesive appearance to your users.

## Ready to go

Enhance comes preconfigured with a [customizable utility class system](https://github.com/enhance-dev/enhance-styles#readme).
During development you can use classes found in `public/styles.css`.

<doc-callout level="caution">

Do not change `public/styles.css`.
Changes will be clobbered in development and when deploying as Enhance Styles rebuilds utility classes based on your configuration.

</doc-callout>

For production you can inline this stylesheet into the head of your document since utility class stylesheets tend to be tiny — around ~30k on disk and 9k over the wire.

## Usage

Apply utility classes to your element markup

```javascript
export default function MyParagraph({ html }) {
  return html`
    <p class="font-serif p1 mb-1">
      <slot></slot>
    </p>
  `
}
```

## Customize

It is possible to completely customize your project's utility classes.
To do so you will need to do two things:

### 1. JSON config file

Add a `styleguide.json` (or choose another name) file to the root of your project.

<doc-link-callout link="https://raw.githubusercontent.com/enhance-dev/enhance-styles/main/config.json" mark="📄">
  Copy this one to get started
</doc-link-callout>

### 2. Update `.arc`

Edit your project's `.arc` file to tell it where to grab the config.
Add these lines at the bottom of your `.arc` file in the root of your project.

```arc
@enhance-styles
config styleguide.json
```

<doc-link-callout link="https://github.com/enhance-dev/enhance-styles#readme" mark="💅🏽">
  Read more about the available styleguide customizations
</doc-link-callout>
