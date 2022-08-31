---
title: Slots
---

Slots [as defined in the Web Component standard](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots#adding_flexibility_with_slots), enable flexible templates that allow substitution of internals while maintaining core functionality.

### Server render

Enhance renders `<slot>` elements server side, replacing their contents in a way that aligns with the standard so that they work both with Custom Elements and Shadow DOM if needed. The `slot` standard defines two use cases; named slots and unnamed ones. Enhance supports both as the spec outlines.

### Named slots

The way to use named slots is to define a `slot` element with a `name` attribute.

```javascript
export default function MyLayout({ html }) {
  return html`<slot name="header"></slot>`
}
```

Then author an element with a matching `slot` attribute as a direct descendent.

```html
<my-layout>
  <header slot="header">
    <h1>
      I'm in the header slot
    </h1>
  </header>
</my-layout>
```

### Unnamed slots
Unnamed slots are a catchall container that collects **all** child nodes without a `slot` attribute. These make your Custom Elements behave like native browser elements. For instance, imagine your Custom Element having the same slotting behavior as a heading tag `<h1>Axol</h1>`.

```javascript
export default function MyButton({ html }) {
  return html`
    <button class="my-fancy-button">
      <slot></slot>
    </button>
  `
}
```

### Layouts

Slots are extremely useful when authoring layout elements. You can set up layout constraints then slot in contents making the layout reusable across pages.

Create this template
```javascript
export default function MyLayout({ html }) {
  return html`
    <style>
      :host {
        min-height: 100vh;
        display: block;
      }

      ::slotted([slot="header"]) {
        position: sticky;
        top: 0;
      }
    </style>
    <slot name="header"></slot>
    <main>
      <slot></slot>
    </main>
    <slot name="footer"></slot>
  `
}
```

Author your contents

```html
<main-layout>
  <my-header slot="header">
    <h1 class="font-medium">
      Enhanced!
    </h1>
  </my-header>

  <section class="p1">
    Main content
  </section>

  <my-footer slot="footer">
    <p>
      Copyright &copy; ${new Date().getFullYear()}
    </p>
  </my-footer>
</main-layout>
```

### Special handling

Per the spec slots are only available when using Web Components in conjunction with Shadow DOM, but Enhance enables the same behavior by expanding your elements server side. You get compatible markup that you can decide how you want to progressively enhance in the browser. In order to not litter your output with `<slot>` tags, Enhance will convert any unused slots into `<span>` tags which have the same characteristics as a `<slot>` tag.

## `as` attribute

One feature Enhance adds to slots is you can use an `as` attribute to specify what type of element you would like Enhance to replace the unused slot with.

The way to use the `as` attribute is to supply a valid element name.

```javascript
export default function MyUnusedSlot({ html }) {
  return html`<slot name="lonely" as="div"></slot>`
}
```

In the case that the slot is not used the output will reflect your as attribute so you can progressively enhance it how you like.

```html
<div slot="lonely"></div>
```

## That's it

Go forth and make some reusable templates with slots!
