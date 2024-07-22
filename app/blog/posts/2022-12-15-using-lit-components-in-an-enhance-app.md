---
title: "Using Lit Components in an Enhance App"
image: "/_public/blog/post-assets/lit.jpg"
category: enhance, webdev, webcomponents, lit
description: "Lit is a popular library that can be used to build web components. Lit can play nice with Enhance with a little modification."
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
mastodon: "@macdonst@mastodon.online"
published: "December 15, 2022"
---

![Lit](/_public/blog/post-assets/lit.jpg)
<small>Original photo by [Skye Studios](https://unsplash.com/@skyestudios) on [Unsplash](https://unsplash.com/s/photos/lit)
</small>

Recently, on the [Enhance Discord](https://enhance.dev/discord), there was a question about how to use [Lit](https://lit.dev/) web components in an Enhance application. Since Lit components extend standard web components, adding Lit to your Enhance app is easy.

## Making Lit available in your Enhance application

Lit is a [browser module](https://enhance.dev/docs/learn/practices/browser-modules). We’ll need to bundle in the dependency, so it is available in the browser at run time.

First, we need to install Lit by executing the command:

```bash
npm install lit
```

Then we need to add Lit to our run time bundles by editing our `.arc` file. Under the `@bundles` pragma in your `.arc` file, add the following lines:

```arc
@bundles
lit './node_modules/lit/index.js'
```

Luckily, Lit ships with a good entry point that includes all of the dependencies we will need.

> You don’t need to name your bundle the same as the npm package, but it makes sense to keep the same name in this case.

## Including a Lit component

Next, we’ll create a new file in our project's `public` folder called `my-element.js`. We’ll use the source from a Lit component we found on [lit.dev](https://lit.dev/) as an example.

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

The Lit component can be used *as-is* with a tiny change. We need to modify where we import the Lit package from in our component. Change the import line from:

```javascript
import {LitElement, html, css} from 'lit';
```

To:

```javascript
import {LitElement, html, css} from '/_static/bundles/lit.mjs'
```

## Using a Lit component in a page

Now we can use Lit components just like our Enhance components. For example, let’s create a new page `app/pages/lit.html` and populate it with the following lines:

```html
<script type="module" src="/_static/my-element.js"></script>
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

> If you are using this component on multiple pages, you should look at including the script tag in the [Head](https://enhance.dev/docs/learn/starter-project/head) of your Enhance app.

## What about TypeScript components?

If you prefer to use TypeScript based Lit components the instructions are similar, but they do require a few extra steps.

First we’ll install `typescript` as a dev dependency.

```bash
npm install typescript –save-dev
```

Next, we’ll add `lit` and `lit-decorators` to our run time bundles by editing our `.arc` file. Under the `@bundles` pragma in your `.arc` file, add the following lines:

```arc
@bundles
lit './node_modules/lit/index.js'
lit-decorators './node_modules/@lit/reactive-element/decorators.js'
```

> Incidentally, it’s Lit’s use of experimental decorators which will require us to run `tsc` as `esbuild` doesn't support [decorators](https://github.com/evanw/esbuild/issues/104) yet.

Finally, we’ll need a `tsconfig.json` file to tell `tsc` how to compile our Lit TS web components. In the root of your project create a `tsconfig.json` file and add the following lines:

```json
{
   "compilerOptions": {
       "target": "es2019",
       "module": "es2015",
       "moduleResolution": "node",
       "lib": ["es2019", "dom"],
       "declaration": true,
       "declarationMap": true,
       "experimentalDecorators": true,
       "useDefineForClassFields": false
     },
   "include": ["ts/**/*"]
}
```

## Including a Lit component

Next, we’ll create a `ts` folder in the root of our project. Then we'll add a new file to the `ts` folder called `my-element-ts.js`. We’ll use the source from a Lit component we found on [lit.dev](https://lit.dev/) as an example.


```javascript
// ts/my-element-ts.ts
import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement("my-element-ts")
export class MyElementTS extends LitElement {
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

 @property() greeting = "Hello";
 @property() planet = "World";

 render() {
   return html`
     <span @click=${this.togglePlanet}
       >${this.greeting}
       <span class="planet">${this.planet}</span>
     </span>
   `;
 }

 togglePlanet() {
   this.planet = this.planet === "World" ? "Mars" : "World";
 }
}
```


Then we will need to run `tsc` to compile our TypeScript component into JavaScript.

```bash
tsc
```

This will create the `ts/my-element-ts.js` file. Open this file in your text editor and replace the lines:


```javascript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
```


With:

```javascript
import {LitElement, html, css} from '/_static/bundles/lit.mjs'
import { customElement, property } from  '/_static/bundles/lit-decorators.mjs'
```

Then copy `ts/my-element-ts.js` to  `public/my-element-ts.js`.

## Using a Lit TS component in a page

Now we can use Lit TS components the same way we used a Lit JavaScript component. For example, let’s create a new page `app/pages/lit-ts.html` and populate it with the following lines:

```html
<script type="module" src="/_static/my-element-ts.js"></script>
<style>
 .mars {
   --planet-color: red;
 }
</style>
<my-element-ts></my-element-ts>
<hr />
<my-element-ts class="mars" planet="Mars"></my-element-ts>
```

The above HTML produces a page that looks like this: \

![lit demo](/_public/blog/post-assets/lit-demo.gif)

Which is indistinguishable from the JavaScript version.

## Next Steps

Well, getting Lit to work in an Enhance app wasn’t too bad. The downside is this component only works with client-side rendering. I wonder if we can refactor it to be server-side rendered with Enhance?
