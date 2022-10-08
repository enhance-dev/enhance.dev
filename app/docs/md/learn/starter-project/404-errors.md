---
title: '404 and 500 Error Pages'
---

Errors happen. You can add custom pages to respond to 404 and 500 type errors by adding a `404.html` or `404.mjs`, and `500.html` or `500.mjs` files to the `/pages` directory. If no user-defined pages are found enhance will respond with a basic error message. 

If there is a relevant error message it is added as an attribute passed to the state of the 404.mjs. The function signature is the same as any other component including the `html` function and the initial state as `state`. The `state` property will be undefined.

<doc-code numbered filename="app/pages/404.mjs" >

```javascript
export default function FourOhFour({ html, state }) {
  const { error } = state.attrs

  return html`
    <main>
      <h1>Not Found - 404</h1>
      <h2>Sorry we can't find that.</h2>
      <p>${error && error}</p>
    </main>
  `
}
```

</doc-code>
