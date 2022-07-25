---
title: Rendering
---

Use the enhance `html` function at the page level to render a fully formed HTML document. Start with just HTML then progressively enhance your application with custom elements as the need for reuse arises. Write reusable [single file components](/docs/learn/concepts/single-file-components) that get expanded to custom elements by the render function.

The important parts to understand are:
1. `html` render function
2. `elements` object
3. `initialState` object


## `html`

Call the enhance function to get an initialized `html` render function.

```javascript
import enhance from '@enhance/ssr'
const html = enhance({})
```

## `elements`

Pass an `elements` object to the enhance function so enhance knows which template to [expand your custom elements](/docs/learn/concepts/rendering/element-expansion) with.

```javascript
import enhance from '@enhance/ssr'
const html = enhance({
  elements: {
    'my-page': function MyPage({ html }) {
      return html`<my-greeting greeting="What up!?"></my-greeting>`
    },
    'my-greeting': function MyGreeting({ html, state }) {
      const { attrs } = state
      const greeting = attrs?.greeting || 'Why hello!'
      return html`
        <h1>${ greeting }</h1>
      `
    }
  },
})

const output = html`<my-page></my-page>`
```

>  Enhance adds an `attrs` object to `state` where you can find the attributes authored on your custom element.

In your application you can add an elements object for each page in order to only load the templates needed by each individual page.

## `initialState`

Pass a data object to the enhance function as `initialState` to make data available when your single file component renders.
Data passed as `initialState` is available as `store` from the `state` object passed to your single file component.

```javascript
import enhance from '@enhance/ssr'
const html = enhance({
  elements: {
    'my-page': function MyPage({ html, state }) {
      return html`<my-greeting></my-greeting>`
    },
    'my-greeting': function MyGreeting({ html, state }) {
      const { store } = state
      const greeting = store?.greeting || 'Why hello!'
      return html`
        <h1>${ greeting }</h1>
      `
    }
  },
  initialState: {
    greeting: 'What up!?'
  }
})

const output = html`<my-page></my-page>`
```

In your application `initialState` would be loaded from your database.


## Initial render

Single file components are rendered on the server where enhance does the tedious work of expanding custom elements as well as setting up your document for progressively enhancing components to dynamic render in the browser.

Enhance adds a `<template>` tag to the resulting HTML document with a corresponding id based on your custom element name. Enhance also moves any script tags in your component to the bottom of the document.

Initial render is great for when you only need to render once from the server. Lots of components are not updated dynamically in the browser by your code. Enhance adds special handling of `<slot>` elements to enable you to use slots in any template for initial rendering.

> ✨[Read more about `slot` handling here](http://localhost:3333/docs/learn/concepts/rendering/slots)

## Dynamic render

The initial render output has a `<template>` tag for when you want to progressively enhance your custom element for dynamic runtime usage in the browser. The document markup is prepared to work with a custom element script in the page.

In the below example you add two lines of code in the constructor to be able to dynamically add your custom element `<my-element></my-element>` to the page and have it expanded with it's template contents.

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
  <title>My Element</title>
</head>
<my-element></my-element>
`
```

> You can add your own `<head>` to override the defaults


