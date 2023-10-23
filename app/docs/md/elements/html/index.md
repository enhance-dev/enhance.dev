---
title: HTML
links: #Further Reading
  - Template literals and tag functions: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
---

As discussed in the [Elements Overview](/docs/elements), Enhance Elements are authored as pure functions, which enables us to expand (or render, if you prefer) your elements on the server for incredible performance and as a base for progressive enhancement.

This is powered by the `html` function, which is made available as a required parameter on each Enhance Element function. Your element function must return a call to the `html` function in order to render your content.

<doc-code filename="my-heading.mjs">

```javascript
export default function MyHeading ({ html }) {
  return html`
    <!-- your content here -->
  `
}
```

</doc-code>

<doc-callout level="tip">

The `html` function is a special kind of JavaScript function, referred to as a ‘tag function’. If you’re unfamiliar with these, [check out MDN’s docs on template literals and tag functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

</doc-callout>

The content you pass to the `html` function can contain anything you can write in HTML, including any HTML element (including other instances of your own Enhance Elements), style tags, and script tags. Enhance will automatically append style tags to the document head, and script tags to the document body.

The `html` function also performs special handling on `<slot>` elements, allowing for advanced composition patterns.

<doc-callout mark="🎰" level="none">

**[Next: read more about slots](/docs/elements/html/slots)**

</doc-callout>
