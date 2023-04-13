---
title: State
---

Understanding how to pass and use state is fundamental to building a dynamic application.

## State object

Every Enhance element [pure function](https://en.wikipedia.org/wiki/Pure_function) is passed a state object comprising of `attrs`; an object containing the attributes and their values from your custom element, a `store`; an object containing your application state. You can use them independently or use attributes as keys for looking up nested application data from your store, `context`; an object that can be mutated to pass contextual data to direct child elements and an `instanceID`; a unique identifier string to be used for instance specific scoping.

```javascript
export default function MyElement({ html, state }) {
  const { attrs,store } = state
  const { message = '', bookId = '' } = attrs
  const { books = {} } = store
  const book = books.find(book => book.id === bookId)
  const bookTitle = book.title || ''

  return html`
    <div>
      <h3>${bookTitle}</h3>
    </div>
  `
}
```


```javascript
export default function MyInstanceID({ html, state }) {
  const { instanceID='' } = state
  return html`
<p>${instanceID}</p>
  `
}

```

```javascript
export default function MyContextParent({ html, state }) {
  const { attrs, context } = state
  const { message } = attrs
  context.message = message

  return html`
    <slot></slot>
  `
}


export default function MyContextChild({ html, state }) {
  const { context } = state
  const { message } = context
  return html`
    <span>${ message }</span>
  `
}

```

<doc-callout level="none" mark="🗝">

**[Learn more about `attrs` →](/docs/learn/concepts/state/attributes)**

</doc-callout>

<doc-callout level="none" mark="💾">

**[Learn more about `store` →](/docs/learn/concepts/state/store)**

</doc-callout>
