---
title: Context
---

The context object enables passing state to child elements without needing to resort to passing attributes down through multiple elements.

## Set parent context

The context object is passed as a key on the state object. Add data to the context object and it will be available to child elements.

[Follow along by checking out the context demo from GitHub →](https://github.com/enhance-dev/context-demo)

Given this markup you can use the context object to pass state directly to a deeply nested child element.

<doc-code filename="app/pages/index.html">

```html
<context-parent>
  <my-container>
    <my-contaier>
      <my-contaier>
        <context-heading></context-heading>
      </my-contaier>
    </my-contaier>
  </my-container>
</context-parent>
```

</doc-code>


Add a heading key to context in the parent element

<doc-code filename="app/pages/index.html">

```javascript
export default function ContextParent({ html, state }) {
  const { context } = state
  context.heading = 'Heading set via context'
  return html`
<style>
 :host {
   display: block;
   height: 100dvh;
   padding-top: 3rem;
   text-align: center;
   font-family: sans-serif;
 }
</style>
<slot></slot>
  `
}
```

</doc-code>

Render the heading passed via context in the deeply nested child element
<doc-code filenam="app/elements/context/heading.mjs">

```javascript
export default function ContextHeading({ html, state }) {
  const { context } = state
  const { heading='Default heading' } = context
  return html`
<style>
  :host > h1 {
    font-size: 1.5rem;
  }
</style>
<h1>${heading}</h1>
  `
}
```

</doc-code>


