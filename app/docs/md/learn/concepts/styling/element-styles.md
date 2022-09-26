---
title: Element styles
---

Element styles are for specific styles that can't easily be achieved with utility classes.

## Element Pseudo classes

Enhance projects come preconfigured with a styling system that let's you use pseudo classes like `:host` and `::slotted()`.
These pseudo classes give you the ability to style the outer Custom Element tag as well as slotted elements. This enables you to write scoped styles co-located inside your single file component.

```html
<style>
  :host {
    background-color: #0071FC;
    transition: background-color 2s;
  }
  :host:hover {
    background-color: #0071FC;
  }
</style>
```

<doc-callout level="none" mark="🦾">

**[Read more about style transforms →](/docs/learn/features/transforms/style-transforms)**

</doc-callout>
