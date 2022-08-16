---
title: Single File Components
links: # Further Reading
  - JavaScript.info Custom Elements: https://javascript.info/custom-elements
  - 'MDN: Web Components': https://developer.mozilla.org/en-US/docs/Web/Web_Components
  - "Simon Willison's walk-through": https://til.simonwillison.net/web-components/understanding-single-file-web-component
---

Every modern web framework has the concept of a component. Most require you to learn a non-standard dialect in order to use them though. Enhance enables you to write single file components with the same benefits of co-location and ease of reuse while leveraging the skills you already have.

Wouldn't it be nice if you could author components like HTML pages? Well that's what you get with enhance single file components.

## It's just HTML

Author your component as an HTML custom element.
```html
<hello-world greeting="Hello World"></hello-world>
```

## Pure function

Define a pure function that returns the HTML markup you want your custom element to encapsulate.

```javascript
export default function HelloWorld({ html, state }) {
  const { attrs } = state
  const { greeting='Hello World' } = attrs
  return html`
<h1>${ greeting }</h1>
  `
}

```

## Style

Styles are added by inserting a standard `<style>` tag.
Styles are scoped to your custom element by default or you can add `scope="global"` to it's attributes to give it global scope.
```javascript
export default function HelloWorld({ html, state }) {
  const { attrs } = state
  const { greeting='Hello World' } = attrs
  return html`
<style scope="global">
  body {
    color: #222;
  }
</style>
<style>
  hello-world h1 {
    color: red;
  }
</style>
<h1>${ greeting }</h1>
  `
}

```
Any valid css will work.

> Skip ahead to [Style Transforms](/docs/learn/features/transforms/style-transforms) to see how it works. You can also use pseudo selectors like `:host` and `:slotted`


## Script

Add functionality to your component by adding a `<script>` tag.
You can either author JavaScript directly in this script tag or link to an external source.
The `/public` folder in enhance projects is preconfigured to serve files from `/_static`.

```html
<script src="/_static/my-script.mjs"></script>
```

## That's it
You get to author components as individual HTML pages with web standard HTML, CSS and JavaScript while enhance delivers a progressively enhanced experience to your users.

