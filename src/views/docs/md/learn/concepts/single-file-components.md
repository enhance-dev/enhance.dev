---
title: Single File Components
links: # Further Reading
  - JavaScript.info Custom Elements: https://javascript.info/custom-elements
  - 'MDN: Web Components': https://developer.mozilla.org/en-US/docs/Web/Web_Components
---

Component development has gotten a little out of control. Wouldn't it be nice if you could author components like HTML pages?

Well that's what you get with enhance. Single File Components.

Let's say you want to make a reusable "hello world" component where the greeting can be changed.

Something like this:
```html
<hello-world greeting="Hello World"></hello-world>
```

Your server side template could be as simple as this:
```javascript
export default function HelloWorld({ state }) {
  const { attrs } = state
  const { greeting='Hello World' } = attrs
  return `
<h1>${ greeting }</h1>
  `
}

```
Where the greeting attribute you set will be passed to your template function via a state object. Any other attributes you add to your custom element are available in the `attrs` collection.

But what if you want to add some element specific styles? Well if you use the `html` render function passed to your template then enhance will handle that for you.

Just add a style tag like this:
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

OK so you've got some HTML that renders your greeting server side sweet!
But what if you want to add additional `<hello-world>` elements dynamically in the browser.
Your going to need some JavaScript for that, so go ahead and add a `<script>` tag to your component:

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

<script type="module">
  // Custom element class definition
  class HelloWorld extends HTMLElement {
    constructor () {
      super()
      // Template will be added by enhance with the id ${your-element}-template for easy lookup
      const template = document.getElementById('hello-world-template')
      // When you add your custom element dynamically the template contents will be added
      this.replaceChildren(template.content.cloneNode(true))
      // You can write queries that are scoped to your custom element
      this.heading = this.querySelector('h1')
    }

    static get observedAttributes () {
      // Return an Array of attributes your custom element needs to update
      return ['greeting']
    }

    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'greeting') {
        // Use the appropriate DOM manipulation function only update what's necessary
        this.heading.textContent = newValue
      }
    }

    connectedCallback () {
      console.log('Why hello there 👋')
    }
  }

  customElements.define('hello-world', HelloWorld)
</script>
  `
}

```

You get to author components like individual HTML pages with web standard HTML, CSS and JavaScript while enhance delivers a progressively enhanced experience to your users.
