---
title: Elements
---

Elements are the reusable building blocks of your Enhance application. They are [pure functions](https://en.wikipedia.org/wiki/Pure_function) authored as single-file components and can be static or update dynamically to state changes. Elements live in the `app/elements/` folder in the Enhance starter project.

## Naming

The file name of your element will be the tag name you author with. Meaning `app/elements/my-message.mjs` will be authored as `<my-message></my-message>` in your HTML page.

```
app/elements/my-message → <my-message></my-message>
app/elements/my-link → <my-link></my-link>
```

When a project grows to include more elements than can comfortably fit in a single folder, they can be divided into sub-directories inside `app/elements/`.
The folder name becomes part of the custom element tag name:

```
app/elements/blog/comment → <blog-comment></blog-comment>
app/elements/blog/comment-form → <blog-comment-form></blog-comment-form>
```

<doc-callout level="none" mark="📄">

**[Learn about single-file components](/docs/learn/concepts/single-file-components)**

</doc-callout>

## html
Elements are pure functions meaning given the same input they return the same output every single time.
Your element function will be passed an arguments object containing an `html` render function that is used to expand nested custom elements.

```javascript
export default function MyHeader({ html }) {
  return html`
    <header>
      <my-link href="/about"></my-link>
    </header>
  `
}
```

## state
Your element function is also passed a `state` object in the arguments object.
This `state` object is comprised of `attrs`; an object of key value pairs representing the attributes added to your custom element tag and `store`; an object containing application state.

```javascript
export default function MyHeader({ html, state }) {
  const { attrs, store } = state
  const { heading = 'Default' } = attrs
  const href = store.aboutPath
  
  return html`
    <header>
      <h1>
        ${heading}
      </h1>
      <my-link href="${href}"></my-link>
    </header>
  `
}
```


