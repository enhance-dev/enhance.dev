---
title: Progressive enhancement
---

## Prototype to production
The enhance ethos is to build your app incrementally. Start with working HTML, break out Custom Elements as the need for reuse arises, create apis that return hard-coded data, add database storage and retrieval to your apis, then layer on user interactions in the browser. Progressively enhancing your application from a working prototype to a production-ready product with the same codebase.

## Solid foundation
Custom Elements are a solid foundation for progressive enhancement. Knowing you have correct, accessible, semantic markup with working forms before adding on the user interactions that require JavaScript means your application will work everywhere the web does **forever**. The benefit being your users will be able to use your site even when unforeseen circumstances like a rouge third-party script or a bad connection interfere.

## Just what's needed
Progressively enhancing Custom Elements ensures that you only add the JavaScript necessary for your user interactions. There is no need to back every element with JavaScript, just what you need to update based on user interactions and data changes.

## Dependency free
The platform supplies everything you need to enhance a Custom Element progressively; it's all built into the browser. You no longer need to load megabytes of JavaScript to render one button. It is possible to make an entire app with just what ships in the browser.Here is what it would take to progressively enhance a `my-message` element.

Author this HTML
```html
<my-message message="Progressive"></my-message>
```

Create this single file component

<doc-code filename="app/elements/my-message.mjs" numbered>

```javascript
export default function MyMessage({ html, state }) {
  const { attrs } = state
  const { message='' } = attrs
  return html`
<h1>${ message }</h1>

<script type="module">
class MyMessage extends HTMLElement {
  constructor() {
    super()
    this.heading = this.querySelector('h1')
  }

  static get observedAttributes() {
    return [ 'message' ]
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'message') {
        this.heading.textContent = newValue
      }
    }
  }
}
customElements.define('my-message', MyMessage)
</script>
`
}
```

</doc-code>

With scoped DOM queries and low level DOM apis you can perform optimal surgical updates to your element.

<small>†You would need to add template support to this class if you wanted to add `<my-message>` tags to your page with JavaScript in the browser at runtime. [See this version →](https://gist.github.com/kristoferjoseph/dd5d22018a0f7feedd4ee18f25a040a8)</small>

## Externalize scripts
If your script outgrows your single file component you can link to it. Another way you can incrementally progress your elements to support your needs.

Move your script to the `/public` folder

Create this single file component

<doc-code mark-line=6 filename="app/elements/my-message.mjs" numbered>

```javascript
export default function MyMessage({ html, state }) {
  const { attrs } = state
  const { message='' } = attrs
  return html`
<h1>${ message }</h1>
<script type="module" src="/_static/my-message.mjs"></script>
`
}
```

</doc-code>


## Just a spoonful
Adding minimal syntactical sugar makes this look more familiar to users from other non-standards-based front-end frameworks. The trade-off is losing the power of optimized DOM updates, but you can always start with what you are comfortable with and drop down to the platform if the need for optimal performance arises.

Here is an example of an enhance base class that hides some of the Custom Element boilerplate code and adds support for DOM diffing.

```javascript
import enhance from '@enhance/enhance'
enhance(
  'my-message',
  {
    attrs: [ 'message' ],
    init(el) {
      el.heading = el.querySelector('h1')
    },
    render({ html, state }) {
      const { attrs } = state
      const { message } = attrs
      return html`
      <h1>${ message }</h1>
      `
    }
  }
)
```

## Many choices
Starting with working HTML doesn't limit how you add user interactions to your front-end. You could progressively enhance your elements in many ways. Working with the platform gives you many paths to success.
