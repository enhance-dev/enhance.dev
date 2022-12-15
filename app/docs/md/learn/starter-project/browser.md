---
title: Browser
---

The `app/browser` directory is where JavaScript files for the browser live. These JavaScript files can import other modules from your project as well as any installed packages that can run in the browser. Files in the `app/browser` directory will be bundled to the `/public/pages/` directory in your project and will be exposed the to browser at `/_public/pages/` for loading by script tags.

```javascript
<script type="module" src="/_public/pages/my-file.mjs"></script>
```

## Add a browser bundle

Create a JavaScript file for the browser.

```
app
├── browser ........... browser JavaScript
│   └── index.mjs
└── pages ............. file-based routing
    └── index.html
```

<doc-code filename="app/browser/index.mjs">

```javascript
const message = document.getElementById('message')
message.innerHTML = '👋 Hello from your bundle!'
```

</doc-code>

## Source a bundle in a page

Add a script tag and load it from `/_public/pages/index.mjs`

<doc-code filename="app/pages/index.html">

```html
<main>
  <h1>My awesome page</h1>
  <p id="message"></p>
</main>
<script type="module" src="/_public/pages/index.mjs"></script>
```

</doc-code>

<doc-callout level="info" mark="💭">

The `/_public` endpoint is created for you so that Enhance can do the tedious work of replacing your authored file name with a fingerprinted one to avoid caching issues.

</doc-callout>

## Share elements with the browser

Now that you get the basics of the browser bundle workflow let's look at how you might share your elements with the browser for progressive enhancement.

## Add a my-message element

Add the file `app/elements/my-message.mjs`

```
app
├── browser ........... browser JavaScript
│   └── index.mjs
├── elements .......... custom element pure functions
│   └── my-message.mjs
└── pages ............. file-based routing
    └── index.html
```

## Write a custom element pure function

Write a pure function for returning the HTML markup for the `my-message.mjs` custom element.

<doc-code filename="app/elements/my-message.mjs">

```javascript
export default function MyMessage({ html, state }) {
  const { attrs=[] } = state
  const { message='' } = attrs

  return html`<h1>${ message }</h1>`
}
```

</doc-code>

## Reuse your pure function in the browser

Import the `my-message.mjs` element in the `app/browser/index.mjs` file to reuse your pure function in the browser.

<doc-code filename="app/browser/index.mjs">

```javascript
import MyMessage from '../elements/my-message.mjs'

class MyMessageElement extends HTMLElement {
  constructor() {
    super()
    const templateID = `${this.tagName.toLowerCase()}-template`
    const template = document.getElementById(templateID)
    if (template) {
      this.template = template
    }
    else {
      this.template = document.createElement('template')
      this.template.innerHTML = MyMessage({
         html: this.html,
         state: {}
      })
      this.template.setAttribute('id', templateID)
    }
    this.replaceChildren(this.template.content.cloneNode(true))

    this.heading = this.querySelector('h1')
  }

  html(strings, ...values) {
    const collect = []
    for (let i = 0; i < strings.length - 1; i++) {
      collect.push(strings[i], values[i])
    }
    collect.push(strings[strings.length - 1])
    return collect.join('')
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
customElements.define('my-message', MyMessageElement)
```

</doc-code>


## Using Enhance Element

Same thing as above but with `@enhance/element`

<doc-code filename="app/browser/index.mjs">

```javascript
import enhance from '@enhance/element'
import MyMessage from '../elements/my-message.mjs'

enhance('my-message', {
  attrs: [ 'message' ],
  render: MyMessage
})
```

</doc-code>

## Add the script to your page

All that's left now is to add a script tag to `app/pages/index.html`  that sources your browser bundle.

<doc-code filename="app/pages/index.html">

```html
<my-message message="Howdy!"></my-message>
<script type="module" src="/_public/pages/index.mjs"></script>
```

</doc-code>

<doc-callout level="info" mark="🤯">

Changing the `message` attribute will trigger an update to your Custom Element.
<br>
Try it out in dev-tools.

</doc-callout>

## That's it

Now you can use this built-in pattern for sharing elements with the browser and progressively enhancing your pages with JavaScript.
