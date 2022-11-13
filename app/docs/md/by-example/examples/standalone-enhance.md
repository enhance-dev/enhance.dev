---
title: Standalone Enhance SSR
links:
  - enhance-ssr: https://github.com/enhance-dev/enhance-ssr
docs-pager: false
---

The core of an Enhance application is the `enhance-ssr` module that enables features like custom element expansion, state management, style transforms, etc.
This power-core can be leveraged without a full Enhance Starter Project setup; some assembly required 🔧

<doc-callout level="info" mark="🧐">

This approach to using Enhance is essentially string munging (albeit very sophisticated munging) to create Enhanced HTML. You will need to bring your own HTTP router, session handling, database, etc.

</doc-callout>

## Single file example

In this guide we'll create a single-file module that exports a handler function leveraging `enhance-ssr` to compose an HTML document with a component where state is carried from the request to the custom element.
We'll use the familiar method signature of `(request, <reply>)` to handle incoming requests.

### Set up the basics

<doc-code filename="get-index.js" numbered>

```javascript
export default async function handler(request, reply) {
  const name = request.query?.name
  reply.statusCode = 200
  return `Hello, ${name || 'world'}.`
}
```

</doc-code>

### Add a component

At the end of the file, write a simple custom element to replace our "Hello, world" response string.

<doc-code filename="get-index.js" initial-line-number="6" numbered>

```javascript
function HelloWorld({ html, state }) {
  const name = state.attrs?.name || 'world'
  
  return html`
    <style>
      h1 { color: SteelBlue }
    </style>
    <h1>Hello, ${name}</h1>
    <slot name="greeting"></slot>
  `
}
```

</doc-code>

### Wire up Enhance

Let's import `enhance-ssr` and register our `HelloWorld` component.

<doc-code filename="get-index.js" focus="1:5" numbered>

```javascript
import enhance from 'enhance-ssr'

const html = enhance({
  elements: { 'hello-world': HelloWorld }
})

export default async function handler(request, reply) { }

function HelloWorld({ html, state }) { }
```

</doc-code>

### Return Enhance-rendered HTML

Putting it all together, our handler method can respond with an HTML document that includes our custom element.

<doc-code filename="get-index.js" numbered>

```javascript
import enhance from 'enhance-ssr'

const html = enhance({
  elements: { 'hello-world': HelloWorld }
})

export default async function handler(request, reply) {
  const name = request.query?.name
  reply.statusCode = 200

  return html`
    <hello-world name="${name}">
      <p slot="greeting">We're happy you're here.</p>
    </hello-world>
  `
}

function HelloWorld({ html, state }) {
  const name = state.attrs?.name || 'world'
  
  return html`
    <style>
      h1 { color: SteelBlue }
    </style>
    <h1>Hello, ${name}</h1>
    <slot name="greeting"></slot>
  `
}
```

</doc-code>

In this case, Enhance will provide the bare minimum doctype and `<html>` tags to create a valid document.
So you may want to add a layout wrapper function that can be used like:

```javascript
const body = layout(
  <hello-world name="${name}">
    <p slot="greeting">We're happy you're here.</p>
  </hello-world>
)

return html`${body}`
```

<doc-callout level="note" mark="📜">

Obviously, this single-file approach won't scale, but you can use the conventions of your chosen HTTP router framework to better organize a project powered by `enhance-ssr`.

</doc-callout>

Tada 🎉
