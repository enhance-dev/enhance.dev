---
title: Attributes
---

Attributes are the initial way you pass data to your custom elements.
The Web Component spec uses attributes extensively as a way to know when to update your element.
Enhance passes your Custom Elements attributes as an object of key value pairs to your [pure function](https://en.wikipedia.org/wiki/Pure_function) at render time.

## Author attributes

```html
<my-message message="Howdy!"></my-message>
```

## Access `attrs`

```javascript
export default function MyMessage({ html, state }) {
  const { attrs } = state
  const { message = '' } = attrs

  return html`<p>${message}</p>`
}
```

## Naming Attributes

Generally, HTML attributes are `lowercase`. We recommend following suit for attributes for your custom elements. However, `kebab-case` and `snake_case` are also valid. Unfortunately, `camelCase` is not recommended as the web component lifecycle event `attributeChangedCallback` doesn't fire for `camelCase` attributes.

| case | attribute | JS access | attributeChangedCallback |
|---|---|---|:-:|
| lower | `imagewidth` | `comp.imagewidth` | ✅ |
| kebab | `image-width` | `comp['image-width']` | ✅ |
| snake | `image_width` | `comp.image_width` | ✅ |
| camel | `imageWidth` | `comp.imageWidth` | ❌ |

## Handling Booleans

Boolean attributes are not the most straight forward attributes to use. There are a handful of extremely necessary boolean attributes that you find yourself needing for any app such as `required`, `disabled`, `autofocus` etc.  The spec states that the existence of a boolean attribute means `true` and the lack of the attribute means `false` which is contrary to how most frameworks instruct users to interact with boolean attributes. Remember attributes can only be strings.

Test setting the `disabled` attribute in your browser.

```html
<!-- TRUE -->
<button disabled>Disabled?</button>

<!-- TRUE -->
<button disabled="">Disabled?</button>

<!-- TRUE -->
<button disabled="false">Disabled?</button>

<!-- FALSE -->
<button>Disabled?</button>
```

### Booleans handled correctly

```javascript
export default function MyButton({ html, state }) {
  const { attrs } = state
  const disabled = Object.keys(attrs).includes('disabled')
    ? 'disabled'
    : ''

  return html`<button ${disabled}>Disabled?</button>`
}
```

<doc-callout level="none" mark="🏪">

**[Next Read about how to use the `store` to pass complex types → ](/docs/learn/concepts/state/store)**

</doc-callout>
