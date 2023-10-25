---
title: HTML
links: #Further Reading
  - Template literals and tag functions: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
---

As discussed in the [Elements Overview](/docs/elements), Enhance Elements are authored as pure functions, which enables us to expand (or render, if you prefer) your elements on the server for incredible performance and as a base for [progressive enhancement](/docs/patterns/progressive-enhancement).

This is powered by the `html` function, which is made available as a required parameter on each Enhance Element function.


## The `html` function

Enhance’s `html` function (which is [a JavaScript tag function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)) is responsible for two critical pieces of functionality: custom element expansion, and style and script transformations.

<doc-callout level="info">

The `html` function runs as part of Enhance’s server side execution. This means custom element expansions, style transforms, and script transforms are performed at request time, leading to improved performance and reducing [flashes of unstyled content (FOUC)](https://en.wikipedia.org/wiki/Flash_of_unstyled_content).

</doc-callout>

### Custom element expansion

Custom element expansion is a term that describes the process in which Enhance takes an HTML page and your custom elements as inputs, and returns a single ‘expanded’ HTML page as output.

To illustrate this via a simple example, consider a custom heading element:

<doc-code filename="app/elements/my-heading.mjs">

```javascript
export default function MyHeading ({ html }) {
  return html`<h1>Hello World!</h1>`
}
```

</doc-code>

If this heading component is used within a requested page, the `html` function will be run, and the expanded content will be returned within the containing HTML page.

This means that this input:

```html
<my-heading></my-heading>
<p>Welcome to my page!</p>
```

Will be returned as this output:

```html
<my-heading>
  <h1>Hello World!</h1>
</my-heading>
<p>Welcome to my page!</p>
```

The content you pass to the `html` function can contain anything you can write in HTML — that is, any HTML element (including other instances of your own Enhance Elements), style tags, script tags, or any interpolated code that returns a string.

The `html` function also performs special handling on `<slot>` elements, allowing for advanced composition patterns.

<doc-callout mark="🎰" level="none">

**[Read more about slots](/docs/elements/html/slots)**

</doc-callout>

### Style transformations

The `html` function handles a few transformations for `<style>` tags and their contents:

- `<style>` tags will be collected from all custom elements, deduplicated when necessary, and placed in the `<head>` of the page.
- `:host` selectors will be rewritten as custom elements selectors to maintain scoped styles.
- Other selectors will be prepended with the name of the custom element, again to maintain scoped styles.

Building off our previous example, let’s add some styles to our custom heading element:

<doc-code filename="app/elements/my-heading.mjs">

```javascript
export default function MyHeading ({ html }) {
  return html`
    <style>
      :host {
        margin: 2rem auto;
      }

      h1 {
        font-weight: 900;
      }
    </style>
    <h1>Hello World!</h1>
  `
}
```

</doc-code>

After the style transformations and element expansion are performed, the following HTML would be returned:

```html
<head>
  <style>
    my-heading {
      margin: 2rem auto;
    }

    my-heading h1 {
      font-weight: 900;
    }
  </style>
</head>
<body>
  <my-heading>
    <h1>
      Hello World!
    </h1>
  </my-heading>
</body>
```

<doc-callout mark="🎨" level="none">

**[Read more about styling](/docs/enhance-styles)**

</doc-callout>

### Script transformations

Any `<script>` tags included in your custom element’s `html` function will be collected and placed at the end of the document `<body>` to reduce page load times.

