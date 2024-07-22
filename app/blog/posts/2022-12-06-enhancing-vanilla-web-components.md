---
title: "Enhancing Vanilla Web Components"
image: '/_public/blog/post-assets/vanilla-ice-cream-cone.jpg'
category: uncategorized
description: "In this post we'll show you how to Enhance a Vanilla web component, so that it arrives fully expanded on the client by avoiding the use of the Shadow DOM."
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
published: 'December 6, 2022'
---

![Vanilla ice cream cone](/_public/blog/post-assets/vanilla-ice-cream-cone.jpg)
<small>Original photo by [Yulia Matvienko](https://unsplash.com/@yuliamatvienko) on [Unsplash](https://unsplash.com/s/photos/vanilla-ice-cream)</small>

In [part one](https://blog.begin.com/posts/2022-11-29-using-external-web-components-in-enhance) of this series we showed you how to include external third party web components into an [Enhance](https://enhance.dev) application. The downside to these external components is that they are not server side rendered so they suffer from the dreaded flash of unstyled custom element (FOUCE) and if something goes wrong with JavaScript they won't be rendered at all!

In this post we will show you how to Enhance another Vanilla web component, [wc-icon-rule](https://github.com/vanillawc/wc-icon-rule), so that it arrives fully expanded on the client by avoiding the use of the Shadow DOM.

> **Editors note:** *Friends don't let friends use the Shadow DOM* is a good idea for a future blog post. 😉

## `wc-icon-rule`

`wc-icon-rule` creates a horizontal rule for you with an image in the center that breaks up the line. The image is provided as a slot to the web component. This component is purely presentation with no client-side interactivity which will make the conversion to an Enhance component fairly simple.

[Source code for `wc-icon-rule`](https://github.com/vanillawc/wc-icon-rule/blob/main/src/wc-icon-rule.js)

## Conversion to an Enhance component

While `wc-icon-rule` is a small web component I'm still going to tackle the conversion as if it was a bigger, more complex, web component to show you how I would attack that challenge.

### Step 1: Create a new Enhance component

First off we will need a new Enhance component to represent `wc-icon-rule`. To do this we need to create a new file named `app/elements/wc-icon-rule.mjs`. The contents of the file, to begin with, are:

```javascript
export default function Element ({ html, state }) {
  return html``
}
```

This is the base of every Enhance component.

### Step 2: Add the current `wc-icon-rule`

Next we'll take the source code for `wc-icon-rule` and wrap it in a `script` tag in our `html` render function.

```javascript
export default function Element ({ html, state }) {
  return html`
  <script type="module">
export class WCIconRule extends HTMLElement {
  constructor () {
    super()
    this.__shadowRoot = this.attachShadow({ mode: 'open' })
    const template = document.createElement('template')
    template.innerHTML = WCIconRule.template()
    this.__shadowRoot.appendChild(template.content.cloneNode(true))
  }

  connectedCallback () {
    this.setAttribute('role', 'presentation')
    for (const child of this.children) {
      child.setAttribute('role', 'none')
    }
  }

  static template () {
    return \`
      <style>
        :host {
          display: block;
          overflow: hidden;
          text-align: center;
        }
        :host:before,
        :host:after {
          content: "";
          display: inline-block;
          vertical-align: middle;
          position: relative;
          width: 50%;
          border-top-style: var(--hr-style, solid);
          border-top-width: var(--hr-width, 1px);
          border-color: var(--hr-color, #000);
        }
        :host:before {
          right: var(--space-around, 1em);
          margin-left: -50%;
        }
        :host:after {
          left: var(--space-around, 1em);
          margin-right: -50%;
        }

        ::slotted(*) {
          display: inline-block;
          width: var(--width, 32px);
          height: var(--height, 32px);
          vertical-align: middle;
        }
      </style>
      <slot></slot>
    \`
  }
}

customElements.define('wc-icon-rule', WCIconRule)
</script>`
}
```

Now we are rendering the component on the server but we are still sending the entire thing down as `script` tag so we haven't fixed the FOUCE issue.

### Step 3: Extract your styles

The `style` tag for the component is rendered in the `template` function. This is perfectly fine but with Enhance's ability to hoist styles to the `head` tag we can extract it from the `script` tag of the component.

So let's move that `style` tag above our `script` tag.

```javascript
export default function Element ({ html, state }) {
  return html`
  <style>
    :host {
      display: block;
      overflow: hidden;
      text-align: center;
    }
    :host:before,
    :host:after {
      content: "";
      display: inline-block;
      vertical-align: middle;
      position: relative;
      width: 50%;
      border-top-style: var(--hr-style, solid);
      border-top-width: var(--hr-width, 1px);
      border-color: var(--hr-color, #000);
    }
    :host:before {
      right: var(--space-around, 1em);
      margin-left: -50%;
    }
    :host:after {
      left: var(--space-around, 1em);
      margin-right: -50%;
    }

    ::slotted(*) {
      display: inline-block;
      width: var(--width, 32px);
      height: var(--height, 32px);
      vertical-align: middle;
    }
  </style>
  <script type="module">
export class WCIconRule extends HTMLElement {
  constructor () {
    super()
    this.__shadowRoot = this.attachShadow({ mode: 'open' })
    const template = document.createElement('template')
    template.innerHTML = WCIconRule.template()
    this.__shadowRoot.appendChild(template.content.cloneNode(true))
  }

  connectedCallback () {
    this.setAttribute('role', 'presentation')
    for (const child of this.children) {
      child.setAttribute('role', 'none')
    }
  }

  static template () {
    return \`
      <slot></slot>
    \`
  }
}

customElements.define('wc-icon-rule', WCIconRule)
</script>`
}
```

If you inspect your page in your browser dev tools, you will notice a `style` tag in the `head` tag of your page. The CSS rules in the `style` tag of the `wc-icon-rule` component have been hoisted to the pages `style` tag. The keen will notice that Enhance slightly re-writes your CSS rules so that `:host` becomes `wc-icon-rule` to properly target all `wc-icon-rule`'s on your page.

### Step 4: Remove the Shadow DOM

As mentioned earlier on in this post you don't need the Shadow DOM for a component like this one. Let's get rid of our dependency on the Shadow DOM.

First, delete the `constructor` function completely. We don't need it. Next, let's move `<slot></slot>` out of our `template` function and include it under the `script` tag. Finally, delete the rest of the `template` function as it is essentially a no-op now.

Your code should look like this:

```javascript
export default function Element ({ html, state }) {
  return html`
  <style>
    :host {
      display: block;
      overflow: hidden;
      text-align: center;
    }
    :host:before,
    :host:after {
      content: "";
      display: inline-block;
      vertical-align: middle;
      position: relative;
      width: 50%;
      border-top-style: var(--hr-style, solid);
      border-top-width: var(--hr-width, 1px);
      border-color: var(--hr-color, #000);
    }
    :host:before {
      right: var(--space-around, 1em);
      margin-left: -50%;
    }
    :host:after {
      left: var(--space-around, 1em);
      margin-right: -50%;
    }

    ::slotted(*) {
      display: inline-block;
      width: var(--width, 32px);
      height: var(--height, 32px);
      vertical-align: middle;
    }
  </style>
  <script type="module">
export class WCIconRule extends HTMLElement {
  connectedCallback () {
    this.setAttribute('role', 'presentation')
    for (const child of this.children) {
      child.setAttribute('role', 'none')
    }
  }
}

customElements.define('wc-icon-rule', WCIconRule)
  </script>
  <slot></slot>`
}
```

We'll still leave the `connectedCallback` function in place. We don't need the Shadow DOM anymore but we can still enhance our server side rendered web components with JavaScript to add interactive functionality.

## Summary

I'm sure you would be able to handle compressing those four steps into a single step but I wanted to explicitly explain why we write components the way we do with Enhance.

While there is nothing inherently wrong with how the Vanilla JS Web Components are written, by modifying how they are delivered to the browser, you can avoid common web component problems like FOUCE - and reduce the overall JavaScript footprint on your page, which is important for performance and accessibility.
