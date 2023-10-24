---
title: Type Definitions
links:
  - "@enhance/types": https://github.com/enhance-dev/types
---

Enhance offers [a set of common type definitions](https://github.com/enhance-dev/types) that can be used with [JSDoc](https://jsdoc.app/) comments to annotate critical parts of your Enhance project.
These will help when writing custom elements, API middleware, and other critical pieces of an Enhance project.

Save [@enhance/types](https://github.com/enhance-dev/types) to your development dependencies:

```shell
npm i -D @enhance/types
```

## Usage Examples

If your editor supports auto-complete and error detection (like [VS Code's Intellisense](https://code.visualstudio.com/docs/editor/intellisense)) via commented types, you can indicate that a function adheres to a certain type.

### Custom Element

Use the `EnhanceElemFn` type when defining [custom elements](/docs/conventions/elements) in /app/elements/. This will provide hinting for the argument passed to your function, including the `html` function and `state` object.

<doc-code filename="app/elements/todo-item.mjs" highlight="1:3-add" callout="6-state,11-html">

```javascript
/**
 * @type {import('@enhance/types').EnhanceElemFn}
 */
export default function TodoItem({
  html,
  state: { attrs }
}) {
  const todoId = attrs['todo-id']
  const completed = typeof attrs.completed === 'string'

  return html`
    <div class="flex">
      <input
        type="checkbox"
        name="completed"
        ${completed ? 'checked' : ''}
      />
      <slot></slot>
    </div>
  `
}
```

</doc-code>

### API Handler

In this case, mark this "Todos" [API GET handler](/docs/conventions/api) as the type `EnhanceApiFn` and gain hinting for the `request` and `response` objects:

<doc-code filename="app/api/todos.mjs" highlight="1-add" callout="2-request,14-response">

```javascript
/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get(request) {
  console.log(`Handling ${request.path}...`)

  const todos = [
    { title: 'todo 1'},
    { title: 'todo 2', completed: true },
  ]

  const response = {
    json: { todos }
  }

  return response
}
```

</doc-code>

<doc-callout level="none" mark="🔎" thin>

Note that the JSDoc comment can be a single line, but there cannot be an extra line between the comment and the method declaration.

</doc-callout>

### Head Function

Your app's [Head function](/docs/conventions/head) can also be typed with the `request` argument and a return type of `string` by adding `EnhanceHeadFn`.

<doc-code filename="app/head.mjs" highlight="1-add" callout="2-request">

```javascript
import { getLinkTag } from '@enhance/arc-plugin-styles/get-styles'

/** @type {import('@enhance/types').EnhanceHeadFn} */
export default function Head({ store, status, req, error }) {
  const { path } = req
  const title = `Todos — ${path}`

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      ${getLinkTag()}
    </head>
  `
}
```

</doc-code>
