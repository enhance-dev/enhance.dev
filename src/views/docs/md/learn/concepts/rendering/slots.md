---
title: Slots
---


## Powerful templating
Slots [as defined in the Web Component standard](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots#adding_flexibility_with_slots), enable flexible templates that allow substitution of internals while maintaining core functionality.

### Server render
Enhance renders `<slot>` elements server side, replacing their contents in a way that aligns with the standard so that they work both with Custom Elements and Shadow DOM if needed.


#### Layouts
Slots are extremely useful when authoring layout elements. You can set up layout constraints then slot in contents making the layout reusable.

#### Example
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
```javascript
<main-layout>
<my-header slot="header">
  <h1 class="font-medium">
    Enhanced!
  </h1>
</my-header>

<!-- unnamed slot content -->
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


#### output


### Example layout
