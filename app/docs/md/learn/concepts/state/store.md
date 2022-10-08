---
title: Store
---

The Enhance store is a single source of truth and how you get access to complex data types such as `Array` and `Object` inside your Custom Element [pure functions](https://en.wikipedia.org/wiki/Pure_function). This is needed because attributes can only be of type string. Enhance projects are also preconfigured to pass initial state from [api routes](/docs/learn/starter-project/api). This single source of truth is how you pass application data to your Custom Element pure functions.

## Access `store`

The `store` is available from the `state` argument passed to your Custom Element pure function.

```javascript
export default function MyMessage({ html, state }) {
  const { store } = state
  const { message } = store

  return html`
    <h1>${message}</h1>
  `
}
```

## Use `attrs` as keys

One powerful technique is to use your element's attributes as keys to access complex data from your `store`

```javascript
export default function MyElement({ html, state }) {
  const { attrs, store } = state
  const { message = '', bookId = '' } = attrs
  const { books = {} } = store
  const book = books[bookId]
  const bookTitle = book.title || ''

  return html`
    <div>
      <h3>${bookTitle}</h3>
    </div>
  `
}
```

## That's it

You now know how to pass application data to your elements to be used in pages. Read more about Enhance projects `api` and `api` routes to learn how to incorporate data.

<doc-callout level="none" mark="🚏">

**[Read about Enhance projects `api` →](/docs/learn/starter-project/api)**

</doc-callout>

<doc-callout level="none" mark="🛣">

**[Read about `api` routes →](/docs/learn/concepts/api-routes)**

</doc-callout>
