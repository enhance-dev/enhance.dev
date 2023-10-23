---
title: Elements
links: # Further Reading
  - JavaScript.info Custom Elements: https://javascript.info/custom-elements
  - 'MDN: Web Components': https://developer.mozilla.org/en-US/docs/Web/Web_Components
  - "Simon Willison's walk-through": https://til.simonwillison.net/web-components/understanding-single-file-web-component
---

Components are a cornerstore of modern web frameworks. Typically, these components emphasize colocation of concerns (content, styling, and functionality) while also enabling ease of reuse. However, most frameworks require you to learn a non-standard dialect in order to use those components.

Enhance Elements are designed to offer these same benefits without the requirement of learning a new syntax. They can be authored using the HTML, CSS, and JavaScript you already know and love.

Additionally, Enhance Elements are use Server Side Rendering (SSR) out of the box, providing incredible performance for end users, and providing you with a fantastic base for [progressive enhancement](/docs/patterns/progressive-enhancement).

## Define

Enhance Elements are defined with a [pure function](https://en.wikipedia.org/wiki/Pure_function) that returns the HTML, CSS, and JavaScript you wish to encapsulate within that component.

Elements are stored in your project’s `app/elements` directory, with one file per element. The filename you use for each element will determine the custom element tag you’ll use to declare an instance of that element — for example, a file named `my-button.mjs` can be declared by using the `<my-button>` tag.

<doc-code filename="app/elements/my-button.mjs">

```javascript
export default function MyButton({ html, state }) {
  const { attrs } = state
  const { label } = attrs

  return html`
    <button>${label}</button>
  `
}
```

</doc-code>

## Design

Styles can be added to your element by including a standard `<style>` tag containing CSS. These styles are scoped to your element automatically; you can add `scope="global"` to your style tag to hoist those styles to the global scope. Your styles will be deduplicated (if using more than one instance of your component) and hoisted to the document head behind the scenes.

<doc-code filename="app/elements/my-button.mjs">

```javascript
export default function MyButton({ html, state }) {
  const { attrs } = state
  const { label } = attrs

  return html`
    <style>
      button {
        appearance: none;
        background: rebeccapurple;
        color: white;
        cursor: pointer;
        padding-block: var(--space--2);
        padding-inline: var(--space-0);
      }
    </style>
    <button>${label}</button>
  `
}
```

</doc-code>

## Respond

Add client side functionality to your element by including a standard `<script>` tag. You can author JavaScript directly within this tag, or link to an external script. For more advanced cases, you can use this script tag to enhance your element into a full [Web Component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements).

<doc-code filename="app/elements/my-button.mjs">

```javascript
export default function MyButton({ html, state }) {
  const { attrs } = state
  const { label } = attrs

  return html`
    <style>
      button {
        appearance: none;
        background: rebeccapurple;
        color: white;
        cursor: pointer;
        padding-block: var(--space--2);
        padding-inline: var(--space-0);
      }
    </style>
    <button>${label}</button>
    <script>
      const myButton = document.querySelector('my-button')
      myButton.addEventListener('click', () => alert('That tickles!'))
    </script>
  `
}
```

</doc-code>

## Declare

Once your element is to your liking, you can use it anywhere else in your project just like HTML — by declaring its custom element tag (which is dervied from its file name).

<doc-code filename="app/pages/index.html">

```html
<my-button label="Click Me!"></my-button>
```

</doc-code>

## Expand

When Enhance receives a request for a page containing your element, your element (along with the rest of your page) will be rendered on the server and returned as HTML to the end user. This not only delivers exceptional performance for end users — it also sets your element up for [progressive enhancement](/docs/patterns/progressive-enhancement) (should it require it).

Given our `my-button` component above, for example, the following markup would be returned from the server:

```html
<!-- style tag will be rendered in your document’s <head> -->
<style>
  my-button button {
    appearance: none;
    …
  }
</style>

<my-button label="Click Me!">
  <button>
    Click Me!
  </button>
</my-button>

<!-- script tag will be appended to the end of your document’s <body> -->
<script>
  const myButton = document.querySelector('my-button')
  …
</script>
```
