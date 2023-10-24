---
title: Slots
---

Slots [as defined in the Web Component standard](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots#adding_flexibility_with_slots) enable flexible templates that allow substitution of internals while maintaining core functionality.

## Server render

Enhance renders `<slot>` elements server side, replacing their contents in a way that aligns with the standard so that they work both with Custom Elements and Shadow DOM if needed. The `slot` standard defines two use cases: named slots and unnamed slots. Enhance supports both as the spec outlines.

## Named slots

Named slots are `slot` elements with a `name` attribute — for example:

<doc-code filename="app/elements/my-layout.mjs">

```javascript
export default function MyLayout({ html }) {
  return html`
    <main>
      <slot name="header"></slot>
      <!-- More content… -->
    </main>
  `
}
```

</doc-code>

To place content into a named slot, declare a custom element with a matching `slot` attribute as a direct descendant of that element, like so:

<doc-code filename="app/pages/index.html">

```html
<my-layout>
  <header slot="header">
    <h1>I'm in the header slot</h1>
  </header>
</my-layout>
```

</doc-code>

## Unnamed slots

Unnamed slots are a catchall container that collects **all** child nodes without a `slot` attribute. These allow your custom elements to accept child content just like native browser elements. For example, for a button:

<doc-code filename="app/elements/my-button.mjs">

```javascript
export default function MyButton({ html }) {
  return html`
    <button class="my-fancy-button">
      <slot></slot>
    </button>
  `
}
```

</doc-code>

Place your child content directly within the opening and closing tags of your custom element:

<doc-code filename="app/pages/index.html">

```html
<my-button>
  Click Me!
</my-button>
```

</doc-code>

## Layouts

Slots are extremely useful when authoring layout elements. You can set up layout constraints, then slot in content to make the layout reusable across pages. For example, here’s a layout that uses both named and unnamed slots:

<doc-code filename="app/elements/my-layout.mjs">

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

</doc-code>

You can then use this layout in each of your app’s pages:

<doc-code filename="app/pages/index.html">

```html
<my-layout>
  <my-header slot="header">
    <h1 class="font-medium">
      Enhanced!
    </h1>
  </my-header>

  <!-- This content is not targeting a named slot. -->
  <!-- Therefore, it will be collected and placed into the layout’s unnamed slot. -->
  <section class="p1">
    Main content
  </section>

  <my-footer slot="footer">
    <p>
      Copyright &copy; ${new Date().getFullYear()}
    </p>
  </my-footer>
</my-layout>
```

</doc-code>

## Special handling

As they’re defined in the web components spec, slots are only available when using the shadow DOM. However, Enhance enables the same behavior without the shadow DOM by expanding your elements on the server and emitting the resultant markup. That means your pages will deliver fully compliant HTML, allowing you to decide how you want to progressively enhance that HTML in the browser.

In order to not litter your HTML with `<slot>` tags, Enhance will convert any unused slots into `<span>` tags which have the same characteristics as a `<slot>` tag.

### `as` attribute

One feature Enhance adds to slots is you can use an `as` attribute to specify what type of element you would like Enhance to replace the unused slot with.

To use the `as` attribute, supply the attribute with a valid element name:

```javascript
export default function MyUnusedSlot({ html }) {
  return html`<slot name="lonely" as="div"></slot>`
}
```

In the case that the slot is not used, the output will reflect your `as` attribute so you can progressively enhance it how you like.

```html
<div slot="lonely"></div>
```

## That's it

Go forth and make some reusable elements with slots!

