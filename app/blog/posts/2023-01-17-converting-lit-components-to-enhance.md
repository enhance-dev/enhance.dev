---
title: "Converting Lit Components to Enhance"
image: "/_public/blog/post-assets/lit.jpg"
category: enhance, webdev, webcomponents, lit
description: "Lit is a fine framework for building web components, but there are a few reasons you may want to convert a Lit component into an Enhance component. Read on to find out how to avoid some common web component pitfalls."
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
mastodon: "@macdonst@mastodon.online"
published: "January 17, 2023"
---

![Lit](/_public/blog/post-assets/lit.jpg)
<small>Original photo by [Skye Studios](https://unsplash.com/@skyestudios) on [Unsplash](https://unsplash.com/s/photos/lit)
</small>

[Last month](https://blog.begin.com/posts/2022-12-15-using-lit-components-in-an-enhance-app) we talked about using a Lit Component in an Enhance app. In this post, we’ll show you how to convert a Lit component into an Enhance component.

## Why convert from Lit to Enhance?

Lit is a fine framework for building web components, but there are a few reasons you may want to convert a Lit component into an Enhance component.

1. Flash of unregistered custom element (FOUCE). Since we have to wait until the custom element is registered you may see a brief flash of unstyled HTML as you page loads.
1. Since web components are written in JavaScript, it’s very difficult to do progressive enhancement.
1. Reduce client-side dependencies
1. Remove TypeScript build step.

## Our Lit Component

We’ll re-use the Lit component from the last post. Here’s the source as a reminder.

```javascript
// public/my-element.js
import {LitElement, html, css} from 'lit';
export class MyElement extends LitElement {
 static properties = {
   greeting: {},
   planet: {},
 };
 static styles = css`
  :host {
    display: inline-block;
    padding: 10px;
    background: lightgray;
  }
  .planet {
    color: var(--planet-color, blue);
  }
`;

 constructor() {
   super();
   this.greeting = 'Hello';
   this.planet = 'World';
 }

 render() {
   return html`
    <span @click=${this.togglePlanet}
      >${this.greeting}
      <span class="planet">${this.planet}</span>
    </span>
  `;
 }

 togglePlanet() {
   this.planet = this.planet === 'World' ? 'Mars' : 'World';
 }
}
customElements.define('my-element', MyElement);
```

Now, we can use Lit components just like our Enhance components. For example, let’s create a new page `app/pages/lit.html` and populate it with the following lines:

```html
<script type="module" src="/_public/my-element.js"></script>
<style>
 .mars {
   --planet-color: red;
 }
</style>
<my-element></my-element>
<hr />
<my-element class="mars" planet="Mars"></my-element>
```

The above HTML produces a page that looks like this:

![lit demo](/_public/blog/post-assets/lit-demo.gif)

## Solving the FOUCE problem

To make sure we don’t run into the FOUCE issue we’ll server-side render our component. This way, as soon as the page is rendered, our web component will be rendered with default content. Our Enhance version of the Lit component will look like this:

```javascript
// app/elements/my-element.mjs
export default function Element ({ html, state }) {
 const { attrs } = state
 const { greeting = "Hello", planet = 'World'} = attrs
 return html`
<style>
:host {
 display: inline-block;
 background: lightgray;
}
.planet {
 color: var(--planet-color, blue);
}
</style>
<span>
 ${greeting}
 <span class="planet">${planet}</span>
</span>`
}
```

Then we can remove the script tag that points to our Lit version of the component.

```html
<style>
 .mars {
   --planet-color: red;
 }
</style>
<my-element></my-element>
<hr />
<my-element class="mars" planet="Mars"></my-element>
```

Now when the page is loaded their is no FOUCE as our component styles have been hoisted to the `head` and we’ve sent our default content down the wire for the browser to render.

![lit demo non-interactive](/_public/blog/post-assets/lit-demo-non-interactive.png)

The only problem is we have no interactivity. When you click on either of the messages, the `togglePlanet` method is not fired as it doesn’t currently exist. However, we can fix this in the next step as Enhance excels at progressive enhancement.

## Progressive Enhancement

Now that we have a server-side rendered version of our component that solves FOUCE and is displayed with or without JavaScript let’s get started adding interactivity to this component via progressive enhancement.

We’ll add a script tag to our single file component, which will load if and when JavaScript is available, adding interactivity to our component.

```html
<script type="module">
 class MyElement extends HTMLElement {
   constructor() {
     super()
     this.planetSpan = this.querySelector('.planet')
     this.planetSpan.addEventListener('click', this.togglePlanet.bind(this))
   }

   static get observedAttributes() {
     return [ 'planet' ]
   }

   attributeChangedCallback(name, oldValue, newValue) {
     if (oldValue !== newValue) {
       if (name === 'planet') {
         this.planetSpan.textContent = newValue
       }
     }
   }

   togglePlanet() {
     let planet = this.getAttribute('planet') || 'World'
     this.planet = planet === 'World' ? 'Mars' : 'World';
   }

   set planet(value) {
     this.setAttribute('planet', value);
   }
 }

 customElements.define('my-element', MyElement)
</script>
```

Now, anytime you click on the component, the planet name will be toggled:

![lit demo](/_public/blog/post-assets/lit-demo.gif)

Since we have implemented a plain vanilla web component, you can remove the Lit dependency. Lit has a relatively small bundle size, just [16.5 kb minified according to Bundlephobia](https://bundlephobia.com/package/lit@2.5.0), but every byte of JavaScript you remove from the client side helps with performance.

Also, you don’t need TypeScript, so you can remove that transpilation step in your build process to convert TypeScript into JavaScript.

## Syntactical Sugar

But what if you really like the syntactical sugar that TypeScript or Lit Element give you? Well, you are in luck, as you can use the [@enhance/element](https://github.com/enhance-dev/enhance-element) package to rid yourself of some boilerplate code.

The first step is to remove that script tag from your `app/elements/my-element.mjs` file so that it looks like this:

```javascript
export default function Element ({ html, state }) {
 const { attrs } = state
 const { greeting = "Hello", planet = 'World'} = attrs
 return html`
<style>
:host {
 display: inline-block;
 background: lightgray;
}
.planet {
 color: var(--planet-color, blue);
}
</style>
<span>
 ${greeting}
 <span class="planet">${planet}</span>
</span>`
}
```

Effectively we are back to where we started when we first server-side rendered our component. The component in this state is not interactive.

We’ll need to add a new dependency to our project so run:

```bash
npm install @enhance/element
```

Now create a new file `app/browser/my-element.mjs` where we will contain our client-side code.

```javascript
// app/browser/my-element.mjs
import enhance from '@enhance/element'

enhance('my-element, {
 attrs: [ 'planet' ],
 init(el) {
   this.planetSpan = el.querySelector('.planet')
   this.planetSpan.addEventListener('click', this.togglePlanet.bind(this))
 },
 render({ html, state }) {
   const { attrs={} } = state
   const { greeting='Hello', planet='World' } = attrs
   return html`
       <span>
         ${greeting}
         <span class="planet">${planet}</span>
       </span>
       `
 },
 togglePlanet() {
   let planet = this.getAttribute('planet') || 'World'
   this.setAttribute('planet', planet === 'World' ? 'Mars' : 'World')
 }
})
```

Finally, you’ll need to add a `script` tag to any HTML page you use `my-element` in.

```html
<script type="module" src="/_public/pages/my-element.mjs"></script>
```

You’ll notice with this syntactical sugar version that we don’t need to add boilerplate code for `observedAttributes`, `attributeChangedCallback` and attribute setters as @enhance/element handles this for you.

However, you may have noticed that the `render` function in your client-side code mirror your server-side code. It seems wasteful for two reasons:

1. You are re-rendering the entire element
1. You are duplicating the render method in two spaces

Your first concern is invalid as Enhance Element does DOM diffing for you and only updates the parts of the DOM that have been changed, but how would you know that if I didn’t tell you?

The second point is more than valid so let’s remove that duplication.

## Remove Duplication

We’ll update our`app/browser/my-element.mjs`file with the following contents:

```javascript
import enhance from '@enhance/element'
import Element from '../elements/my-element-sugar.mjs'

enhance('my-element, {
 attrs: [ 'planet' ],
 init(el) {
   this.planetSpan = el.querySelector('.planet')
   this.planetSpan.addEventListener('click', this.togglePlanet.bind(this))
 },
 render: Element,
 togglePlanet() {
   let planet = this.getAttribute('planet') || 'World'
   this.setAttribute('planet', planet === 'World' ? 'Mars' : 'World')
 }
})
```

The `render` function of our new file will be our previously created pure function for server-side rendering our web component. Enhance will make this file available under `public/pages/my-element.mjs`.

## In conclusion

With a bit of extra work you can avoid common web component issues like FOUCE, while retaining interactivity. You can also reduce the complexity of your application by removing unnecessary builds steps.
