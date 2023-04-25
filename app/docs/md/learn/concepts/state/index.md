---
title: State
---

Understanding how to pass and use state is fundamental to building a dynamic application.

## State object

Every Enhance element [pure function](https://en.wikipedia.org/wiki/Pure_function) is passed a state object comprising of:

- `attrs` an object containing the attributes and their values from your custom element
- `context` an object that can be mutated to pass contextual data to direct child Custom Elements so as to avoid "prop drilling"
- `instanceID` a unique identifier string to be used for instance specific scoping
- `store` an object containing your application state populated by your [API routes](/docs/learn/starter-project/api)

### Page component

```javascript
export default function MyPage({ html }) {
  return html`
    <my-library
      user="Axol"
      class="
        grid
        gap0
      "
    >
      <unread-books></unread-books>
      <read-books></read-books>
    </my-library>
  `
}
```

### Library component

```javascript
export default function MyLibrary({ html, state }) {
  const { attrs, context, store } = state
  const { books = [] } = store
  const read = books.filter(book => book.read === true)
    .map(b => book(b))
    .join('\n')
  const unread = books.filter(book => book.read === false)
    .map(b => book(b))
    .join('\n')

  // Pass filtered data collections via context instead of passing props multiple levels
  context.read = read
  context.unread = unread

  return html`
    <style>
      :host {
        display: block;
      }
    </style>
    <h1 class="mb1">My Library</h1>
    <slot></slot>
  `
}
```

### Book lists components

```javascript
import ListItem from './li.mjs'

export default function ReadBooks({ html, state }) {
  const { context = {} } = state
  const { read = [] } = context
  const readBookItems = read.map(book => ListItem(book))

  return html`
    <style>
      :host {
        display: block;
      }
    </style>
    <ul class="list-none">
      ${readBookItems}
    </ul>
  `
}
```

```javascript
import ListItem from './li.mjs'

export default function UnreadBooks({ html, state }) {
  const { context = {} } = state
  const { unread = [] } = context
  const unreadBookItems = unread.map(book => ListItem(book))

  return html`
    <style>
      :host {
        display: block;
      }
    </style>
    <ul class="list-none">
      ${unreadBookItems}
    </ul>
  `
}
```

```javascript
export default function li(book) {
  const { author='', title='', isbn='' } = book

  return `
    <h4>${title}</h4>
    <h5>${author}</h5>
    <p>${isbn}</p>
  `
}
```


<doc-callout level="none" mark="🗝">

**[Learn more about `attrs` →](/docs/learn/concepts/state/attributes)**

</doc-callout>

<doc-callout level="none" mark="💾">

**[Learn more about `store` →](/docs/learn/concepts/state/store)**

</doc-callout>
