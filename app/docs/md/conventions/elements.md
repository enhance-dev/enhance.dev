---
title: Elements
---

Elements are the reusable building blocks of your Enhance application. They are [pure functions](https://en.wikipedia.org/wiki/Pure_function) authored as single-file components. They’re also server-side rendered out of the box, offering incredible performance and a seamless path for progressive enhancement.

Elements live in the `app/elements/` folder in the Enhance starter project.

## Naming

The file name of your element will be the tag name you author with. Meaning `app/elements/my-message.mjs` will be authored as `<my-message></my-message>` in your HTML page. Enhance elements are HTML custom elements, so they [require two or more words separated by a dash](/docs/elements).

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

**[Learn about Enhance Elements](/docs/elements)**

</doc-callout>

## `html`
Elements are pure functions — meaning: given the same input, they return the same output every single time.
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

<doc-callout level="none" mark="✨">

**[Learn about the HTML render function](/docs/elements/html)**

</doc-callout>

## state
Your element function is also passed a `state` object in the arguments object.
This `state` object is comprised of [`attrs`](/docs/elements/state/attributes): an object of key value pairs representing the attributes added to your custom element tag, and [`store`](/docs/elements/state/store): an object containing application state.

In this example you create an element with a default description then use an API route to populate the store description data. This allows you to supply a different description per page.

<doc-code filename="app/element/my-header.mjs">

```javascript
export default function MyHeader({ html, state }) {
  const { attrs, store } = state
  const { heading = 'Default' } = attrs
  const { description = 'A default description' } = store

  return html`
      <header>
        <h1>
          ${heading}
        </h1>
        <p>
          ${description}
        </p>
      </header>
    `
}
```

</doc-code>

Your index API route could return a JSON payload to update the description in the `<my-header>` element on the index page.

<doc-code filename="app/api/index.mjs">

```javascript
export async function get() {
  return {
    json: {
      description: 'Welcome to the index page'
    }
  }
}
```

</doc-code>

<doc-callout level="none" mark="🎛️">

**[Learn about state](/docs/elements/state)**

</doc-callout>
