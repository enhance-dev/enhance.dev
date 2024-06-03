---
title: Components
---

When building UI elements for Enhance applications, we recommend starting with [Elements](/docs/elements). Elements are the perfect solution for starting with server side rendering and, optionally, iteratively upgrading to client side interaction. We find that most applications are composed with a majority of strictly presentational components, and authoring that code with client side JavaScript can be counterproductive.

Components, meanwhile, provide several shortcuts to client side interactivity while maintaining server side rendering. They wrap your HTML, CSS and JavaScript in a portable web component. They are ‘portable’ because these components can render themselves client side outside of Enhance applications. However, when they are used in an Enhance application, they gain the super power of being rendered on the server and then hydrating themselves on the client. Components live in the `app/components/` folder in Enhance projects.

## Lifecycle

Let's look at the lifecycle of a component we'll call `DeleteButton`. This component will act like a normal submit button when JavaScript is not available but will override the default behavior of the submit button when JavaScript is available.

1. Client requests a page including a `<delete-button></delete-button>` tag.
2. Enhance SSR finds the component in `app/components/delete-button.mjs`.
3. Enhance SSR runs the `render` method of the `DeleteButton` class on the server.
4. The entire page is returned to the client as HTML and CSS.
5. The client encounters a `script` tag and downloads it from the server.
6. This `script` tag includes the code for `DeleteButton` so it is evaluated and executed. When executed the `customElements.define('delete-button', DeleteButton)` method will be called, thus registering your web component with the browser.

This progressively enhances your presentational element into an interactive client side web component.

## Naming

The tag name of your component is determined by its file name. Meaning `app/components/my-card.mjs` will be authored as `<my-card></my-card>` in your HTML page. Enhance components are HTML custom elements, so they [require two or more words separated by a dash](/docs/elements).

```
app/components/my-message → <my-message></my-message>
app/components/my-link → <my-link></my-link>
```

When a project grows to include more components than can comfortably fit in a single folder, they can be divided into sub-directories inside `app/components/`.
The folder name becomes part of the custom element tag name:

```
app/components/blog/comment → <blog-comment></blog-comment>
app/components/blog/comment-form → <blog-comment-form></blog-comment-form>
```

<!-- doc-callout level="none" mark="📄">

**[Learn about Enhance Elements](/docs/elements)**

</doc-callout -->

## @enhance/custom-element
Components are web components — meaning: they extend `HTMLElement` like vanilla web components and provide you all the [lifecycle methods](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#using_the_lifecycle_callbacks) you would expect (`connectedCallback`, `disconnectedCallback`, `adoptedCallback`, and `attributeChangedCallback`).

When you write an Enhance component you will extend the `CustomElement` class from the `@enhance/custom-element` package. These single file components allow you to take advantage of slotting and style scoping in the [light DOM](https://en.wikipedia.org/wiki/Document_Object_Model) while avoiding [some of the issues](https://begin.com/blog/posts/2023-11-10-head-toward-the-light-dom) the [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM) creates.

<doc-callout level="info" mark="🔧">

Don't forget to install the `@enhance/custom-element` dependency.

```bash
npm install @enhance/custom-element
```

</doc-callout>

<doc-code filename="app/components/my-card.mjs">

```javascript
import CustomElement from '@enhance/custom-element'

export default class MyCard extends CustomElement {
  connectedCallback() {
    this.heading = this.querySelector('h5')
  }

  render({ html, state }) {
    const { attrs={} } = state
    const { title='default' } = attrs
    return html`
      <style>
        :host {
            position: relative;
            display: flex;
            flex-direction: column;
            min-width: 0;
            word-wrap: break-word;
            color: black;
            background-color: #fff;
            background-clip: border-box;
            border: 1px solid rgba(0,0,0,.125);
            border-radius: 0.25rem;
        }
        .card-img {
            width: 100%;
            border-top-left-radius: calc(0.25rem - 1px);
            border-top-right-radius: calc(0.25rem - 1px);
        }
        .card-body {
            flex: 1 1 auto;
            padding: 1.25rem;
        }
        .card-title {
            margin-bottom: 0.75rem;
            font-size: 1.25rem;
            font-weight: 500;
        }
      </style>
      <slot name="image"></slot>
      <div class="card-body font-sans">
        <h5 class="card-title">${title}</h5>
        <slot></slot>
      </div>
    `
  }

  static get observedAttributes() {
    return [ 'title' ]
  }

  titleChanged(value) {
    this.heading.textContent = value
  }
}

customElements.define('my-card', MyCard)
```

</doc-code>

You may be thinking that the `render` function looks familiar and you would be right. These `render` functions are Enhance Elements. This enables us to share rendering logic between the client side and server side so any Enhance Component will be server side renderable.

When an Enhance component is server-side rendered it is "enhanced" with an attribute to indicate that the slotting algorithm and style transform have already been run. The attribute look like this:

```html
<my-card enhanced=”✨”></my-card>
```

The client-side code will look for this attribute and only run if your component hasn’t already been "enhanced". Thus avoiding an unnecessary render pass.

If you have an existing Enhance Element you can always import it into your Component and use it as your `render` function.

<doc-callout level="none" mark="✨">

**[Learn about the HTML render function](/docs/elements/html)**

</doc-callout>

### A note about attribute changed handlers

`@enhance/custom-element` provides syntactical sugar for reacting to attribute changes. Instead of having to implement your own `attributeChangedCallback` function `@enhance/custom-element` will check to see if the attribute changed is one of your observed attributes and whether or not the new value is different than previous value. If these conditions are met, `@enhance/custom-element` will call your `[attribute name]Changed` function if it exists.

| case | attribute | changed function |
|---|---|---|
| lower | `imagewidth` | `imagewidthChanged` |
| kebab<sup>1</sup> | `image-width` | `imageWidthChanged` |
| snake | `image_width` | `image_widthChanged` |
| camel<sup>2</sup> | `imageWidth` | ❌ |

<sup>1</sup>kebab cased attribute names are converted to camel case.

<sup>2</sup>camel cased attribute do not trigger change listeners.

**[Learn more about attribute names](/docs/elements/state/attributes#attribute-names)**

### Making Components available in the browser

Now that we have written a client side component, we need to register it with the browser at runtime. To do this, we will create a new file: `app/browser/index.mjs`. This file will be used to import our Components at runtime in order to make them available to the browser. Using our `MyCard` component as an example our `app/browser/index.mjs` would look like this:

```javascript
// app/browser/index.mjs
import MyCard from "../components/my-card.mjs"
export { MyCard }
```

This will create a new client side bundle, available at `public/browser/index.mjs`. You can use this file as a `script` tag’s source on any pages in which you want to use the `MyCard` component. For example:

```html
<script type="module" src="/_public/browser/index.mjs"></script>
```

<doc-callout level="info" mark="ℹ️">

You may wonder why Enhance doesn’t automatically make all components available to the browser at run-time. This is because we believe application authors should have complete control over which components are available on every page. This way, you can customize each route with a `script` tag that only includes the components required by an individual page. This reduces the amount of JavaScript needed for each route.

</doc-callout>


## UI Updates
Updates to Enhance Components are triggered by attribute changes. Any change to an attribute listed in the `observedAttributes` will trigger a `<attribute name>Changed` method. For example if you are observing the `title` attribute of our `my-card` component any time that attribute value is updated the `titleChanged` method will be executed. This enables you to write surgical DOM updates which will always be the most performant way to update your page.

## DOM Diffing
Other frameworks supply a DOM diffing solution, and Enhance Components are no different. However, we believe DOM diffing should be enabled on an opt-in basis. To enable DOM diffing in our `my-card` component, we will add the `MorphdomMixin` class from `@enhance/morphdom-mixin`.

<doc-callout level="info" mark="🔧">

Don't forget to install the `@enhance/morphdom-mixin` dependency.

```bash
npm install @enhance/morphdom-mixin
```

</doc-callout>

<doc-code filename="app/components/my-card.mjs">

```javascript
import CustomElement from '@enhance/custom-element'
import MorphdomMixin from '@enhance/morphdom-mixin'

export default class MyCard extends MorphdomMixin(CustomElement) {
  render({ html, state }) {
    const { attrs={} } = state
    const { title='default' } = attrs
    return html`
      <style>
        :host {
            position: relative;
            display: flex;
            flex-direction: column;
            min-width: 0;
            word-wrap: break-word;
            color: black;
            background-color: #fff;
            background-clip: border-box;
            border: 1px solid rgba(0,0,0,.125);
            border-radius: 0.25rem;
        }
        .card-img {
            width: 100%;
            border-top-left-radius: calc(0.25rem - 1px);
            border-top-right-radius: calc(0.25rem - 1px);
        }
        .card-body {
            flex: 1 1 auto;
            padding: 1.25rem;
        }
        .card-title {
            margin-bottom: 0.75rem;
            font-size: 1.25rem;
            font-weight: 500;
        }
      </style>
      <slot name="image"></slot>
      <div class="card-body font-sans">
        <h5 class="card-title">${title}</h5>
        <slot></slot>
      </div>
    `
  }

  static get observedAttributes() {
    return [ 'title' ]
  }
}

customElements.define('my-card', MyCard)
```

</doc-code>

Once added the `MorphdomMixin` will handle updating the DOM whenever an `observedAttributes` is modified. The `<attribute name>Changed` methods are no longer necessary. Instead on an attribute change the `render` method will be re-run and the output will be compared against the current DOM. Only the modified DOM nodes will be updated.

<doc-callout level="info" mark="ℹ️">

`morphdom` does string based diffing on the actual HTML element and not a virtual DOM diff so every element you want compared needs to have a string change or unique id.

</doc-callout>

<doc-callout level="caution" mark="⚠️">

### Lists

When working with lists of data in the DOM it is highly advisable to add a unique `id` attribute to the list item. [The `state` object passed to an element's render function has a unique `instanceID` property available for this purpose](/docs/elements/state/instance-id). This will assist `morphdom` in determining what items have changed in the list.

</doc-callout>

## Reducing Boilerplate
Many other web components provide a way of reducing the amount of boilerplate code one needs to write. Enhance provides the `@enhance/element` package which builds upon the `CustomElement` and `MorphdomMixin` classes while providing a more succinct way of writing Enhance Components.

Revisiting our `my-card` component we get:

<doc-code filename="app/components/my-card.mjs">

```javascript
import enhance from '@enhance/element'

const MyCard = {
  attrs: [ 'title' ],
  init(element) {
    console.log('My Card: ', element)
  },
  render({ html, state }) {
    const { attrs={} } = state
    const { title='default' } = attrs
    return html`
      <style>
        :host {
            position: relative;
            display: flex;
            flex-direction: column;
            min-width: 0;
            word-wrap: break-word;
            color: black;
            background-color: #fff;
            background-clip: border-box;
            border: 1px solid rgba(0,0,0,.125);
            border-radius: 0.25rem;
        }
        .card-img {
            width: 100%;
            border-top-left-radius: calc(0.25rem - 1px);
            border-top-right-radius: calc(0.25rem - 1px);
        }
        .card-body {
            flex: 1 1 auto;
            padding: 1.25rem;
        }
        .card-title {
            margin-bottom: 0.75rem;
            font-size: 1.25rem;
            font-weight: 500;
        }
      </style>
      <slot name="image"></slot>
      <div class="card-body font-sans">
        <h5 class="card-title">${title}</h5>
        <slot></slot>
      </div>
    `
  },
  connected() {
    console.log('CONNECTED')
  },
  disconnected() {
    console.log('DISCONNECTED')
  }
}

enhance("my-card", MyCard);
export default MyCard
```

</doc-code>

<doc-callout level="info" mark="🔧">

Don't forget to install the `@enhance/element` dependency.

```bash
npm install @enhance/element
```

</doc-callout>
