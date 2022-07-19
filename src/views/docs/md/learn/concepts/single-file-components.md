---
title: Single File Components
links: # Further Reading
  - JavaScript.info Custom Elements: https://javascript.info/custom-elements
  - 'MDN: Web Components': https://developer.mozilla.org/en-US/docs/Web/Web_Components
  - "Simon Willison's walk-through": https://til.simonwillison.net/web-components/understanding-single-file-web-component
---

Every modern web framework has the concept of a component. Most require you to learn a non-standard dialect in order to use them though. Enhance enables you to write single file components with the same benefits of co-location and ease of reuse while leveraging the skills you already have.

Wouldn't it be nice if you could author components like HTML pages? Well that's what you get with enhance single file components. Let's say you want to make a reusable "hello world" component where the greeting can be changed.

## It's just HTML

Author your component as an HTML custom element.
```html
<hello-world greeting="Hello World"></hello-world>
```

## Template

Define a pure function that returns the HTML markup you want your custom element to encapsulate.

```javascript
export default function HelloWorld({ html, state }) {
  const { attrs } = state
  const { greeting='Hello World' } = attrs
  return html`
<h1>${ greeting }</h1>
  `
}

```
The template function that defines what your custom element should expand to is passed an `html` function and a state object containing attributes.

## Style

Styles are added by inserting a standard `<style>` tag.
```javascript
export default function HelloWorld({ html, state }) {
  const { attrs } = state
  const { greeting='Hello World' } = attrs
  return html`
<style>
  hello-world h1 {
    color: red;
  }
</style>
<h1>${ greeting }</h1>
  `
}

```
Any valid css will work, and any style prefixed with your chosen custom element name will be scoped to only that type of element.

> [Skip ahead to *Style Transforms* if you want to use pseudo selectors like `:host` and `:slotted`](/docs/learn/features/css-transforms)


## Script

Add a `<script>` tag to your component in order to add functionality to your component.
In order to add additional `<hello-world>` elements dynamically while your app is being used you can register your custom element with the browser.

```html
<!-- ...continued -->
<script type="module">
  // Custom element class definition
  class HelloWorld extends HTMLElement {
    constructor () {
      super()
      // Template will be added by enhance with an id ${your-element}-template
      const template = document.getElementById('hello-world-template')
      // When your custom element is inserted the template contents will be expanded
      this.replaceChildren(template.content.cloneNode(true))
      // You can write queries that are scoped to the internals of your custom element
      this.heading = this.querySelector('h1')
    }

    static get observedAttributes () {
      // Return an Array of attributes your custom element needs to update
      return ['greeting']
    }

    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'greeting') {
        // Use the appropriate DOM manipulation function to only update what's necessary
        this.heading.textContent = newValue
      }
    }

    // Lifecycle hooks!
    connectedCallback () {
      console.log('Why hello there 👋')
    }
  }
  // Define your custom element tag name and base class
  customElements.define('hello-world', HelloWorld)
</script>
```

You get to author components as individual HTML pages with web standard HTML, CSS and JavaScript while enhance delivers a progressively enhanced experience to your users.

