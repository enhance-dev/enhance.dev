---
title: Element styles
---

Element styles are for specific styles that _can't_ easily be achieved with utility classes.
This approach gives developers the convenience of writing style rules right next to the elements those rules affect.

## Local, Scoped Styling

Adding a `<style>` tag to your single-file element definition's HTML will be scoped to that element when it is automatically hoisted to the document's `<head>`.

<doc-code highlight="4">

```javascript
export default function MyHeader({ html }) { 
  return html`
    <style>
      h1 { color: Crimson; }
    </style>

    <h1>My Web App</h1>
  `
}
```

</doc-code>

Authoring the above `<my-header>` element will result in the following CSS in your document's inline stylesheet:

<doc-code highlight="4">

```html
<head>
  <!-- ... -->
  <style>
    my-header h1 { color: Crimson; }
  </style>
</head>
```

</doc-code>

## Element Pseudo classes

Enhance projects come preconfigured with a styling system that lets you use pseudo classes like `:host` and `::slotted()`.
These pseudo classes give you the ability to style the outer Custom Element tag as well as slotted elements.
This enables you to write scoped styles co-located inside your single-file component.

```html
<style>
  :host {
    display: block;
    background-color: #0071FC;
    transition: background-color 2s;
  }
  :host:hover {
    background-color: #0071FC;
  }

  ::slotted(*) {
    color: #7327CE;
  }
</style>
```

<doc-callout level="none" mark="🦾">

**[Read more about style transforms →](/docs/learn/features/transforms/style-transforms)**

</doc-callout>
