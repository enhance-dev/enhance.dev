---
title: Utility classes
links:
  - enhance-styles: https://github.com/enhance-dev/enhance-styles#readme
  - Sample styleguide.json: https://raw.githubusercontent.com/enhance-dev/enhance-styles/main/config.json
---

Utility classes are an optimized way to apply general styling.
They remove large amounts of duplication from your stylesheets and lend visual harmony to your app.  
Utility class stylesheets tend to be tiny — around ~30k on disk and 9k over the wire.

## Styleguide

As a basis of styleguides, utility classes are unparalleled in providing a usable system for developers and a cohesive appearance to your users.

## Ready to go

Enhance comes preconfigured with a [customizable utility class system](https://github.com/enhance-dev/enhance-styles#readme).
During development a stylesheet is generated and served via `/enhance-styles.css` and automatically included in your document's `<head>` section.

<doc-callout level="caution">

If you use a [custom Head function](/docs/learn/starter-project/head), `enhance-styles.css` will **not** be included by default.  
To add Enhance Styles utility classes with a custom headm.mjs, it is recommended to use the helper function [described below](#getstyles) to include Enhance Styles.

</doc-callout>

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

## `generated.css`

Enhance Styles stores a copy of generated styles at the root `/tmp/generated.css`.
This file can be used as a helpful reference for class names available to your HTML.

This `/tmp` directory should be ignored from your project's version control.

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

## `getStyles`

By default Enhance Styles is automatically included in HTML documents rendered by Enhance.
However, you may want to include these utility classes elsewhere or in a [custom Head function](/docs/learn/starter-project/head).

A utility function is provided to access your generated stylesheet.

```javascript
import getStyles from '@enhance/arc-plugin-styles/get-styles'

const styles = getStyles()

styles.link    // a <link rel="stylesheet"> tag
styles.style   // a <style> tag for inline styles
styles.path    // root-relative path to the .css file
```

Furthermore, individual methods can be imported:

```javascript
import {
  getLinkTag,
  getStyleTag,
  getPath,
} from '@enhance/arc-plugin-styles/get-styles'

getLinkTag()   // a <link rel="stylesheet"> tag
getStyleTag()  // a <style> tag for inline styles
getPath()      // root-relative path to the .css file
```

<doc-callout level="info">

Though `@enhance/arc-plugin-styles` is already a dependency of Enhance, you may want to declare it as a direct dependency of you project:

<div class="mt-1">

```bash
npm i @enhance/arc-plugin-styles
```

</div>

</doc-callout>
