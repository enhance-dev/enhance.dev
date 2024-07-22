---
title: "Head Toward the Light DOM"
image: "/_public/blog/post-assets/toward-the-light.jpg"
image_alt: "measuring tap"
photographer: "Jayy Torres"
photographer_url: "https://unsplash.com/@jayy_torres7?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
category: enhance, light DOM, shadow DOM
description: "Recently, there has been a spate of articles that talk about using the Light DOM in Web Components. Everyone knows we are extremely pro-Light DOM web components. Today we are announcing some new client-side Light DOM functionality."
author: 'Simon MacDonald'
avatar: 'simon.png'
mastodon: "@macdonst@mastodon.online"
published: "November 10, 2023"
---

Recently, there has been a spate of articles that talk about using the Light DOM in Web Components, including [Blinded By the Light DOM](https://meyerweb.com/eric/thoughts/2023/11/01/blinded-by-the-light-dom/) by [Eric Meyer](https://mastodon.social/@meyerweb), [Step into the light (DOM)](https://aaadaaam.com/notes/step-into-the-light-dom/) by [Adam Stoddard](https://mastodon.social/@aaadaaam), and [Using Web Components on My Icon Galleries Websites](https://blog.jim-nielsen.com/2023/web-components-icon-galleries/) by [Jim Nielsen](https://mastodon.social/@jimniels). Anyone slightly familiar with Begin and [Enhance](https://enhance.dev/) knows we are extremely pro-Light DOM web components as it sidesteps many of the issues with Shadow DOM based web components, including:

1. [Flash of Unstyled Custom Element (FOUCE)](https://www.abeautifulsite.net/posts/flash-of-undefined-custom-elements/)
2. Requiring developers to use the `ElementInternals` and Form Associated Custom Elements APIs to have your web components participate in forms.
3. Issues with style encapsulation as outlined by this [great post](https://www.matuzo.at/blog/2023/pros-and-cons-of-shadow-dom) by [Manuel Matuzović](https://front-end.social/@matuzo).
4. The shadow DOM introduces problems with accessibility. For more info, read this [thoughtful post](https://nolanlawson.com/2022/11/28/shadow-dom-and-accessibility-the-trouble-with-aria/) from Nolan Lawson.

That doesn’t mean you should never use the Shadow DOM. It means you should carefully consider your use case before reaching for the [Shadow DOM by default](https://begin.com/blog/posts/2023-08-18-shadow-dom-not-by-default). We are not the only ones who have this opinion.

> "Where does the shadow DOM come into all of this? It doesn’t. And that’s okay. I’m not saying it should be avoided completely, but it should be a last resort. See how far you can get with the composability of regular HTML first."
>
> [HTML Web Components](https://adactio.com/journal/20618) by [Jeremy Keith](https://adactio.com/about/)

However, we have heard some criticism about Enhance’s approach to expanding custom elements on the server side:

> "Enhance elements are not “real” web components."
>
> "These components are not portable."
>
> "CodePen, or it didn’t happen!"

Respectfully, we disagree with this limited way of looking at web components, but we have heard your feedback, and we’ve responded in the best way we know how, with code.

## @enhance/custom-element

Version 1.2.0 of [@enhance/custom-element](https://github.com/enhance-dev/enhance-custom-element) introduces new client-side functionality that makes your Enhance web components more portable.

1. Light DOM slotting
2. Style scoping

### Light DOM slotting

One of the main reasons folks reach for the Shadow DOM when building web components is the ability to compose larger web components out of smaller ones by using [slots](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot). Until now, it wasn’t possible to use slots with the Light DOM. With the latest release of `@enhance/custom-element` we’ve enabled client-side slotting without the Shadow DOM.

In the spirit of “show, don’t tell,” let’s look at our version of Eric Meyer’s `super-slider` component written with `@enhance/custom-element`.

First, let’s look at the HTML for creating a `super-slider`:

```html
<super-slider unit="em" target=".preview h1">
    <label slot="label" for="title-size">Title font size</label>
    <input slot="input" id="title-size" type="range" min="0.5" max="4" step="0.1" value="2" />
</super-slider>
```

Both the `label` and `input` elements are designated to be slotted into the appropriate spot in our web component.

Before we get to the JavaScript code listings, let’s call out a few things to look at:

1. Our `SuperSlider` class extends the Enhance `CustomElement` class, which in turn extends `HTMLElement` like all other web components.
2. We are using `connectedCallback` to add interactivity to our component. It’s not shown, but our `CustomElement` supports all the additional web component lifecycle methods like `disconnectedCallback`, `adoptedCallback`, and `attributeChangedCallback`.
3. A render method is used to insert the contents of our web component into the Light DOM after our slotting algorithm runs.

```javascript
import CustomElement from 'https://unpkg.com/@enhance/custom-element@1.2.0/dist/index.js?module=true"'

class SuperSlider extends CustomElement {
  connectedCallback() {
    let targetEl = document.querySelector(this.getAttribute("target"))
    let unit = this.getAttribute("unit")
    let slider = this.querySelector('input[type="range"]');
    let label = this.querySelector('label')
    let readout = this.querySelector('span')
    let resetter = this.querySelector('button')

    slider.addEventListener("input", (e) => {
      targetEl.style.setProperty("font-size", slider.value + unit);
      readout.textContent = slider.value + unit;
    });

    let reset = slider.getAttribute("value");
    resetter.setAttribute("title", reset + unit);
    resetter.addEventListener("click", (e) => {
      slider.value = reset;
      slider.dispatchEvent(
        new MouseEvent("input", { view: window, bubbles: false })
      );
    });
    readout.textContent = slider.value + unit
    if (!label.getAttribute("for") && slider.getAttribute("id")) {
      label.setAttribute("for", slider.getAttribute("id"));
    }
    if (label.getAttribute("for") && !slider.getAttribute("id")) {
      slider.setAttribute("id", label.getAttribute("for"));
    }
    if (!label.getAttribute("for") && !slider.getAttribute("id")) {
      let connector = label.textContent.replace(" ", "_");
      label.setAttribute("for", connector);
      slider.setAttribute("id", connector);
    }
  }

  render({ html, state  }) {
    const { attrs={} } = state
    const { unit='' } = attrs
    return html`
        <style>
          :host {
            display: flex;
            align-items: center;
            margin-block: 1em;
          }
          :host input[type="range"] {
            margin-inline: 0.25em 1px;
          }
          :host .readout {
            width: 3em;
            margin-inline: 0.25em;
            padding-inline: 0.5em;
            border: 1px solid #0003;
            background: #EEE;
            font: 1em monospace;
            text-align: center;
          }
        </style>
        <slot name="label"></slot>
        <span class="readout">${unit}</span>
        <slot name="input"></slot>
        <button title="${unit}">↺</button>
      `
  }
}

customElements.define('super-slider', SuperSlider)
```

Here’s a CodePen to show the component in action.

<iframe height="300" style="width: 100%;" scrolling="no" title="SuperSlider" src="https://codepen.io/macdonst/embed/MWLjpqK?default-tab=html%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/macdonst/pen/MWLjpqK">
  SuperSlider</a> by Simon MacDonald (<a href="https://codepen.io/macdonst">@macdonst</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

Light DOM slotting for the win, folks! But what about style encapsulation?

### Style Scoping

Eagle-eyed readers may have noticed that the `render` method included a `style` tag. We perform a style transformation when the `render` method is run. This style transformation does a few important things:

<strong>A.</strong> It removes the `style` tag from the output that is being added to the DOM.

<strong>B.</strong> It rewrites CSS rules from the `style` tag to scope the CSS to this component. Rules like:

```css
:host {
    display: flex;
    align-items: center;
    margin-block: 1em;
}
```

Becomes:

```css
super-slider {
    display: flex;
    align-items: center;
    margin-block: 1em;
}
```

<strong>C.</strong> It [adopts this style sheet](https://developer.mozilla.org/en-US/docs/Web/API/Document/adoptedStyleSheets) so the rules are applied.

Now, we can have the same style encapsulation but without the Shadow DOM.

## @enhance/element

The release of `@enhance/element` version 1.4.0 uses the new `@enhance/custom-element` under the hood, so it gives you the same functionality but with less boilerplate code. Check out our version of `super-slider` using `@enhance/element`.

<iframe height="300" style="width: 100%;" scrolling="no" title="Super slider" src="https://codepen.io/dam/embed/oNmzGxP?default-tab=html%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/dam/pen/oNmzGxP">
  Super slider</a> by ✨ (<a href="https://codepen.io/dam">@dam</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## Frequently Asked Questions

### What about server-side rendering?

Don’t worry, we haven’t abandoned server-side rendering. Components written using the `@enhance/custom-element` package, are server-side renderable by default. When these components are dropped into your Enhance application, the `render` method is used to expand your custom element on the server and the working HTML is sent down the wire to the client. This has the advantage of avoiding that flash of unstyled custom element on the client side.

### Does this mean the render method is run twice? Once on the server and again on the client?

No, when an Enhance component is server-side rendered it is “enhanced” with an attribute to indicate that the slotting algorithm and style transform have already been run. What does that attribute look like, well I’m glad you asked:

```html
<super-slider enhanced=”✨”></super-slider> \
```
The client-side code will look for this attribute and only run if your component hasn’t already been “enhanced”.

### Doesn’t Declarative Shadow DOM (DSD) solve these same problems?

Yes, and no. We remain cautiously optimistic on DSD. It will help solve the problem of server side rendering web components, as the browser will be able to instantiate the shadow root based on the template provided. However, it still runs into many of the same issues that the non-declarative version of the Shadow DOM has including form controls and accessibility. We are also waiting to see the impact of DSD on performance due to the inability to share templates between components of the same type. Once DSD is [supported on all evergreen browsers](https://caniuse.com/?search=declarative%20shadow), we will re-visit our experiments with DSD.


## Next Steps

* Try out the new `@enhance/custom-element` and `@enhance/element` releases and share with us some components you’ve written.
* [Follow](https://fosstodon.org/@enhance_dev) Axol, the Enhance Mascot on Mastodon…
* Join the [Enhance Discord](https://enhance.dev/discord) and share what you’ve built, or ask for help.
