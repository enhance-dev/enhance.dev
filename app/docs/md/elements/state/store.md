---
title: Store
---

The `store` (made available to each Enhance Element function via the `state` parameter) allows you to make use of complex data in your elements’ initial (server side) render.

While (as per the HTML spec) [element attributes can only be used with strings](https://html.spec.whatwg.org/multipage/dom.html#attributes), the Enhance store allows you to use objects, arrays, and any other valid form of data in JavaScript. Enhance Elements can also use attributes as lookup keys for data they may need within the store.

Data is made available to the store via your [API routes](/docs/routing/api-routes).

## Accessing `store`

The `store` is available from the `state` parameter passed to your Enhance Element.

```javascript
export default function MyMessage({ html, state }) {
  const { store } = state
  const { message } = store

  return html`
    <h1>${message}</h1>
  `
}
```

### Using `attrs` as keys

[Attributes](/docs/elements/state/attributes) on Enhance Elements can be used as keys to look up complex data from the `store`. For example:

```javascript
export default function MyElement({ html, state }) {
  const { attrs, store } = state

  // Get the element instance’s `bookId` attribute
  const { bookId } = attrs

  // Get the `books` entry from the `store`
  const { books } = store

  // Use the `bookId` attribute to get the instance’s book from `store.books`
  const book = books[bookId]

  return html`
    <div>
      <h1>${book.title}</h1>
      <p>${book.author}, ${book.year}</p>
      <!-- … -->
    </div>
  `
}
```

</doc-callout>

