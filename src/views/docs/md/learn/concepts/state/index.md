---
title: State
---

## Use data in your app

Understanding how to pass and use state is fundamental to building a successful application.
Luckily Enhance sets you up for success by preconfiguring your app to pass state in a reliable way.

## State object

Every Enhance element [pure function](https://en.wikipedia.org/wiki/Pure_function) is passed a state object comprising of `attrs`; an object containing the attributes and their values from your custom element, and a `store`; an object containing your application state. You can use them independently or use attributes as keys for looking up nested application data from your store.

```javascript
export default function MyElement({ html, state }) {
  const { attrs, store } = state
  const { message='', bookId='' } = attrs
  const { books={} } = store
  const book = books.bookId
  const bookTitle = book.title || ''

  return html`
    <div>
      <h3>${bookTitle}</h3>
    </div>
  `
}
```

<doc-callout level="none" mark="🗝">

**[Learn more about `attrs` →](/docs/learn/concepts/state/attributes)**

</doc-callout>

<doc-callout level="none" mark="💾">

**[Learn more about `store` →](/docs/learn/concepts/state/store)**

</doc-callout>
