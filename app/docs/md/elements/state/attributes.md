---
title: Attributes
links: #Further Reading
  - Attributes overview on MDN: https://developer.mozilla.org/en-US/docs/Glossary/Attribute
  - Boolean attributes in the HTML spec: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes
  - Keyword and enumerated attributes in the HTML spec: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#keywords-and-enumerated-attributes
---

[Attributes](https://developer.mozilla.org/en-US/docs/Glossary/Attribute) allow developers to configure the behaviour of HTML elements. This is also true for Enhance Elements (and [for HTML custom elements in general](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#responding_to_attribute_changes)). Attributes can be used to pass basic units of data, which you can then leverage and respond to within your element.

## Author attributes

To author an attribute on your Enhance Element, give it a name, and optionally a value, separated by an equals sign. An attribute without a value assigned to it becomes a boolean attribute ([see below](#handling-booleans)).

**Note that, [as per the HTML spec](https://html.spec.whatwg.org/multipage/dom.html#attributes), attributes can only accept strings as values.**

```html
<my-message message="Howdy!"></my-message>
```

## Access `attrs`

Attributes can be read via the `attrs` property of the `state` object.

```javascript
export default function MyMessage({ html, state }) {
  const { attrs } = state
  const { message } = attrs

  return html`<p>${message}</p>`
}
```

## Attribute names

HTML attributes are written in all lowercase characters. Because [all attribute names on HTML elements get lowercased](https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes:~:text=All%20attribute%20names%20on%20HTML%20elements%20in%20HTML%20documents%20get%20ASCII%2Dlowercased%20automatically) by the HTML parser, we recommend **not** using casing methods such as `camelCase` or `PascalCase` when naming your attributes.

Of particular concern here is that [the `attributeChangedCallback` function](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#responding_to_attribute_changes) will not fire for attributes with uppercase characters (because of the aforementioned parser behaviour). Therefore, attributes named with multiple words should be delimited using `kebab-casing` or `snake_casing` (or not delimited at all).

| case | attribute | JS access | `attributeChangedCallback` |
|---|---|---|:-:|
| lower | `imagewidth` | `attrs.imagewidth` | ✅ |
| kebab | `image-width` | `attrs['image-width']` | ✅ |
| snake | `image_width` | `attrs.image_width` | ✅ |
| camel | `imageWidth` | `attrs.imageWidth` | ❌ |

## Handling booleans

Boolean attributes in HTML are a little different from what you may be used to if you’re coming to Enhance from a JavaScript centric framework. This is because, as per the HTML spec, [a boolean attribute evaluates to `true` when it’s present, and false when it’s absent](https://developer.mozilla.org/en-US/docs/Glossary/Boolean/HTML).

For example, let’s take a look at the `disabled` attribute, and when it evaluates to `true` and `false`:

```html
<!-- TRUE -->
<button disabled>Disabled?</button>

<!-- TRUE -->
<button disabled="disabled">Disabled?</button>

<!-- TRUE -->
<button disabled="">Disabled?</button>

<!-- TRUE -->
<button disabled="false">Disabled?</button>

<!-- FALSE -->
<button>Disabled?</button>
```

In order to correctly check for (and conditionally apply) a boolean attribute on an Enhance Element, we recommend checking for the presence of that attribute on the element’s `attrs` field, like so:

```javascript
export default function MyButton({ html, state }) {
  const { attrs } = state
  const disabled = Object.keys(attrs).includes('disabled')
    ? 'disabled'
    : ''

  return html`<button ${disabled}>Disabled?</button>`
}
```

<doc-callout level="none" mark="🎛️">

**[Next: Read work with complex state using the `store`](/docs/elements/state/store)**

</doc-callout>

