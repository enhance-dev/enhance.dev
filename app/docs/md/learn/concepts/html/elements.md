---
title: Element expansion
---

Custom element expansion allows you to write [pure functions](https://en.wikipedia.org/wiki/Pure_function) that return the contents of a custom element tag.

## Dependency free

Enhance single file components are designed to be used without needing to import dependencies. Dependency free components means less unplanned work and fewer breaking changes.

## Naming convention

Per the [spec](https://html.spec.whatwg.org/multipage/custom-elements.html#prod-potentialcustomelementname), custom element tag names are two or more words separated by a dash.
In your Enhance project the names of the files in your project's `app/elements` file correspond to the tag name of your custom element. Meaning `my-header.mjs` will be authored as `<my-header></my-header>` in your HTML page.

## Expansion

Write this single file component

```javascript
export default function MyHeader({ html, state }) {
  const { attrs={} } = state
  const heading = attrs?.heading || 'Default'
  return html`
    <header>
      <h1>${heading}</h1>
    </header>
  `
}
```

Author this HTML file

```html
<my-header heading="Welcome"></my-header>
This is my index page
```

Inspect this output

```html
<my-header heading="Welcome">
  <header>
    <h1>Welcome</h1>
  </header>
</my-header>

This is my index page
```

Notice how the custom element is expanded with the output of your pure function. This sets your page up for progressive enhancement.

<doc-callout level="none" mark="🎰">

**[Next read how Enhance expands `<slot>` tags →](/docs/learn/concepts/html/slots)**

</doc-callout>
