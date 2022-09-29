---
title: With Alpine.js
links:
  - Alpine.js: https://alpinejs.dev
docs-pager: false
---

Since Enhance renders "just" HTML, you can use other tools that work with vanilla HTML.  
[Alpine.js](https://alpinejs.dev) is a minimal, but powerful, framework for adding interactivity to your application without writing much actual JavaScript.

<doc-callout level="info">

This approach can be used to leverage similar libraries, like [htmx](https://htmx.org/).
Though, you may find that your project doesn't need them once you've learned all of Enhance's features.

</doc-callout>

## Simple collapse example

Here's a modified version of Alpine's "dropdown" example from [the Alpine "Start here" doc](https://alpinejs.dev/start-here#building-a-dropdown).
We've wrapped it in [an Enhance component](/docs/learn/concepts/single-file-components), added [an unnamed `<slot>`](/docs/learn/concepts/html/slots#unnamed-slots), and included the CDN version of Alpine.js.

<doc-code filename="app/elements/section-collapse.mjs" focus="5:14" callout="12-slot" numbered>

```javascript
export default function SectionCollapse ({ html }) {
  return html`
<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>

<div x-data="{ open: false }">
  <button @click="open = !open">
    <span x-show="!open">👉</span>
    <span x-show="open">👇</span>
  </button>

  <div x-show="open" @click.outside="open = false">
    <slot></slot>
  </div>
</div>
  `
}
```

</doc-code>

<doc-callout level="tip" mark="🔌">

Eventually, you may want to bundle Alpine.js into your application.
Try out [Enhance's `@bundles` feature](/docs/learn/practices/browser-modules#exporting-bundles).

</doc-callout>

This component can now be used from any HTML page in your Enhance application.

<doc-code filename="app/pages/my-page.html" focus="4:7" numbered>

```html
<main>
  <h1>Alpine.js Test</h1>

  <section-collapse>
    <!-- This will be rendered to the component <slot> -->
    <p>Hey, check that out!</p>
  </section-collapse>
</main>

```

</doc-code>
  
![alpine.js collapse example animation](img/gif/example-alpinejs-collapse.gif)
