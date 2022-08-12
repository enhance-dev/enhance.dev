---
title: Elements
---

Elements are the reusable building blocks of your enhance application. They are pure functions authored as single file components and can be static or update dynamically to state changes. Elements live in the `app/elements/` folder in the enhance starter project.

> 📄 [Learn about single file components here](/docs/learn/concepts/single-file-components)

## Pure functions
Elements are pure functions meaning given the same input they return the same output every single time.

## html render function
Your element function will be passed an arguments object containing an `html` render function that is used to expand nested custom elements.

```javascript
export default function MyHeader({ html }) {
  return html`
<header>
  <my-link href='/about'></my-link>
</header>
  `
}
```

## state
Your element function is also passed a `state` object in the arguments object.
This `state` object is comprised of `attrs`; an object of key value pairs representing the attributes added to your custom element tag and `store`; an object containing application state.

```javascript
export default function MyHeader({ html, state={} }) {
  const { attrs={}, store={} } = state
  const { heading='Default' } = attrs
  const { href='' } = store?.aboutPath
  return html`
<header>
  <h1>
    ${ heading }
  </h1>
  <my-link href='${ href }'></my-link>
</header>
  `
}
```


