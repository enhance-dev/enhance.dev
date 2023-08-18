---
title: Utility Classes
links:
  - enhance-styles: https://github.com/enhance-dev/enhance-styles#readme
  - Sample styleguide.json: https://raw.githubusercontent.com/enhance-dev/enhance-styles/main/config.json
---

Utility classes (also known as ‘atomic CSS’ or ‘functional CSS’) are an optimized way to apply general styling.
They remove large amounts of duplication from your stylesheets and lend visual harmony to your app.
Utility class stylesheets tend to be tiny — around ~30k on disk and 9k over the wire.

For a deep dive on why we use utility classes, [check out this article on the Begin blog](https://begin.com/blog/posts/2023-01-10-past-informs-the-present-our-approach-to-css).

## Styleguide

As a basis of styleguides, utility classes are unparalleled in providing a usable system for developers and a cohesive appearance to your users.

## Ready to go

Enhance comes preconfigured with a [customizable utility class system](https://github.com/enhance-dev/enhance-styles#readme).
These styles are [customizable](/docs/learn/concepts/styling/customization), and are included by default in your document's `<head>` section.

<doc-callout level="caution">

If you use a [custom Head function](/docs/learn/starter-project/head), `enhance-styles.css` will **not** be included by default.
To add Enhance Styles utility classes with a custom `head.mjs`, we recommend using the helper function [described below](#getstyles).

</doc-callout>

## Usage

Apply utility classes to your element markup

```javascript
export default function MyParagraph({ html }) {
  return html`
    <!-- Paragraph set in serif type, with padding on all sides and a margin on the block-end dimension -->
    <p class="font-serif p0 mbe0">
      <slot></slot>
    </p>
  `
}
```

## Local stylesheet

During local development, Enhance Styles stores a copy of the generated stylesheet at `/.enhance/generated.css`.
This file can be used as a helpful reference for class names available to your HTML.

We're working on providing a dynamic, project-specific styleguide that will contain this reference. Stay tuned 📡

<doc-callout slim mark="😶‍🌫️">

This `/.enhance` directory should be ignored from your project's version control.

</doc-callout>

## `getStyles`

By default, Enhance Styles is automatically included in HTML documents rendered by Enhance.
However, you may want to include these utility classes elsewhere or in a [custom Head function](/docs/learn/starter-project/head).

A utility function is provided to access your generated stylesheet.

```javascript
import { getStyles } from '@enhance/arc-plugin-styles'

const styles = getStyles.all()

styles.link    // a <link rel="stylesheet"> tag
styles.style   // a <style> tag for inline styles
styles.path    // root-relative path to the .css file
```

Furthermore, individual methods can be imported:

```javascript
import { getStyles } from '@enhance/arc-plugin-styles'

getStyles.linkTag()   // a <link rel="stylesheet"> tag
getStyles.styleTag()  // a <style> tag for inline styles
getStyles.path()      // root-relative path to the .css file
```

<doc-callout level="info">

Though `@enhance/arc-plugin-styles` is already a dependency of Enhance, you may want to declare it as a direct dependency of your project:

<div class="mt-1">

```bash
npm i @enhance/arc-plugin-styles
```

</div>

</doc-callout>

## Cribsheet

Every Enhance app ships with a preconfigured, dynamic cribsheet to help you find the right class for the job.

Just start your project (`npm start`) and navigate to `/_styleguide/cribsheet`. Here you'll be able to search through all the utility clases and custom properties available to your app. Any customizations you make to your styleguide will automatically be reflected in your cribsheet.
