---
title: Rendering
---

Templates are pure functions that return an HTML string. Pure functions mean that given the same input the function will return the same output every time.

## Setup

Enhance passes an object to every template which contains an html render function in order to expand custom elements and a state object that contains the attributes from the element and a data store that you populate with initial state.

> In practice initial state would most likely come from your database, but for demonstration purposes we can hard code some data.

Setup your render function by passing an elements collection and optional initial state.
```javascript
import enhance from '@enhance/ssr'

const html = enhance({
  elements: {
    'my-element': function MyElement({ html, state }) {
      const { store } = state
      const message = store?.message || 'Nothing'
      return html`<h1>${ message }</h1>`
    }
  },
  initialState: { message: '🎶This is how we do it' }
})

const output = html`
<head>
  <title>My Element test</title>
</head>
<my-element></my-element>
`
console.log('OUTPUT: ', output)
```

> 👆 You can supply your own head tag and contents

## Initial render

Templates are rendered on the server and do the tedious parts of setting up your component for the browser.
Enhance will add a `<template>` tag to the resulting HTML document with an id corresponding to your custom element name as well as moving any script tags in your component to the bottom of the document. Enhance will also add a template for any slotted content you author.

Initial render is great for when you only need to render once from the server. Lots of components are not updated dynamically in the browser by your code so enhance adds some special handling of `<slot>` elements that allow you to use slots in any template that only renders on the server not just in a Shadow DOM enabled Web Component.

> ✨[Read more about `slot` handling here](http://localhost:3333/docs/learn/concepts/rendering/slots)

### Enhanced output

Here is what the output of our basic initial render looks like:
```html
<html>
  <head>
    <title>My Element test</title>
  </head>
  <body>
    <my-element>
      <h1>🎶This is how we do it</h1>
    </my-element>
    <template id="my-element-template">
      <h1>🎶This is how we do it</h1>
    </template>
 </body>
</html>
```

## Dynamic render

The initial render output has a `<template>` tag for when you want to add your custom element to the page at runtime with JavaScript. The markup is setup for your custom element script.

```javascript
import enhance from '@enhance/ssr'

const html = enhance({
  elements: {
    'my-element': function MyElement({ html, state }) {
      const { store } = state
      const message = store?.message || 'Nothing'
      return html`
      <h1>${ message }</h1>
      <script type="module">
        class MyElement extends HTMLElement {
          constructor() {
            const template = document.getElementById('my-element-template')
            this.replaceChildren(template.content.cloneNode(true))
          }
        }
        customElements.define('my-element', MyElement)
      </script>
      `
    }
  },
  initialState: { message: '🎶This is how we do it' }
})
const output = html`
<head>
  <title>My Element test</title>
</head>
<my-element></my-element>
`
```

When the output HTML is run in the browser you can open devtools and append `<my-element></my-element>` tags to see them expand with your template contents.
