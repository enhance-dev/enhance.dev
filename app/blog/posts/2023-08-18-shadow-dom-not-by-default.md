---
title: "Shadow DOM: Not by Default"
image: "/_public/blog/post-assets/woman-shadow.jpg"
image_alt: "woman walking with shadow"
photographer: "Martino Pietropoli"
photographer_url: "https://unsplash.com/@martino_pietropoli?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
category: enhance, CSS
description: "Why doesn't Enhance advocate for diving straight into the shadow DOM and how could you even write web components without using the shadow DOM?"
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
mastodon: "@macdonst@mastodon.online"
published: "August 18, 2023"
---

Photo by <a href="https://unsplash.com/@martino_pietropoli?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Martino Pietropoli</a> on <a href="https://unsplash.com/photos/pirWeToS2mA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

Yesterday, I briefly interacted with [Manuel Matuzović](https://front-end.social/@matuzo) after reading his Mastodon post on his growing doubts over _the shadow DOM in general_.

> After almost a year working with web components I'm starting to doubt the usefulness of style encapsulation and shadow DOM in general.
>
> Styling and some accessibility stuff is so much easier without…
>
> [Manuel Matuzović](https://front-end.social/@matuzo), [August 17th 2023](https://front-end.social/@matuzo/110904820573072435)

> @matuzo That's how all of us enhance.dev folks feel. The shadow DOM is a tool that should be reached for only when needed. It shouldn't be the default when it comes to working with custom elements/web components.
>
> [Simon MacDonald](https://mastodon.online/@macdonst), [August 17th 2023](https://mastodon.online/@macdonst/110905389455407088)

> @macdonst interesting! That's the exact opposite of what e.g. the lit docs say. Do you have your or your team's thoughts on shadow don written down somewhere?
>
> [Manuel Matuzović](https://front-end.social/@matuzo), [August 17th 2023](https://front-end.social/@matuzo/110906023414558748)

> @matuzo  let me find something or better yet this gives me the excuse to blog about thoughts that have been running through my head for a bit.
>
> [Simon MacDonald](https://mastodon.online/@macdonst), [August 17th 2023](hhttps://mastodon.online/@macdonst/110906209348625170)


This made me realize we haven’t done the best job of explaining why we don’t default to using the shadow DOM and how Enhance works. So let’s dig in!

## Why not just use the shadow DOM from the start?

In many cases, you ain’t gonna need it (YAGNI). The light DOM has served the web well for many years, and we can get quite far with it. To enumerate some of the reasons why we don’t immediately reach for the shadow DOM, they would be:

1. HTML-first: To keep our page weight down, we defer adding JavaScript until it is absolutely required. For many of our custom elements, we can get by with only HTML and CSS.
2. Server-side Rendering: While we are excited about Declarative Shadow DOM it has yet to land in all evergreen browsers (come on FireFox). Until such time it becomes ubiquitous, we’ll stick with our approach.
3. Flash of Unstyled Custom Element (FOUCE): as described below, waiting for the `customElements.define()` method to be called before your web component is displayed can negatively affect users’ impression of your application.
4. [Form participation](https://kinsta.com/blog/web-components/#ignored-inputs): by default, elements in the shadow DOM inside a form do not inherit the default behaviors of form elements. For example, a submit button in the shadow DOM will not automatically submit your form when the `Enter` key is hit. There is a spec called Form Associated Custom Elements (FACE) that gives you the APIs to build web components that participate in forms. However, fixing a problem created by JavaScript by writing more JavaScript is like handing a drowning man a glass of water, IMHO.
5. Styling: I confess that I am CSS challenged, but the shadow DOM introduces a new way of styling components for the sake of style encapsulation. Plus, we have other (easier) ways of ensuring style encapsulation.
6. Accessibility: the shadow DOM introduces problems with accessibility. For more info, read this [thoughtful post](https://nolanlawson.com/2022/11/28/shadow-dom-and-accessibility-the-trouble-with-aria/) from Nolan Lawson.

## What is Enhance?

Enhance is an HTML-first full-stack web framework that gives you everything you need to build standards-based multi-page web apps that perform and scale.

## Right, but what does that mean?

It means that Enhance is a one-stop solution for building web applications. You write your application using web standards like HTML, CSS and JavaScript. Enhance allows you to server-side render (SSR) your custom elements while providing a path for them to be “enhanced” to full web components.

## Okay, that sounds good, but how does it work?

Let’s show instead of tell by building a simple message component from the ground up using Enhance. Let’s create our Enhance single file component “app/elements/my-message.mjs”.

```javascript
export default function MyMessage({ html, state }) {
  const { attrs } = state
  const { message = '' } = attrs

  return html`
    <h1>${message}</h1>
  `
}
```


This is a very simple custom element that will take the string from the attribute `message` and wrap it in a `h1` tag. To use it in our HTML page, we’d just write:

```html
<my-message message="Hello World"></my-message>
```

Which produces:

<h1 class="text5">Hello World</h1>

When viewed in the browser.

Great, now we have the basis of our single file component by writing the HTML-first, but now I want to do some styling, so let’s add a `style` tag to our component.

```javascript
export default function MyMessage({ html, state }) {
  const { attrs } = state
  const { message = '' } = attrs

  return html`
    <style>
      h1 { color: Crimson; }
    </style>
    <h1>${message}</h1>
  `
}
```

Refreshing our browser, we now see hello world in crimson.

<h1 class="text5" style="color: Crimson;">Hello World</h1>

But wait, wouldn’t that `style` tag screw up the style of all the `h1` tags on my page? Don’t we need to use the shadow DOM here to encapsulate our component styles away from the rest of the page?

Well, you could do that, and you wouldn’t be wrong, but one of the philosophies behind Enhance is to delay using the shadow DOM until you absolutely need it instead of immediately reaching for it.

## Style Transforms

The way Enhance prevents your component styles from interfering with other elements on your page is by running a style transform on the server before sending your HTML to the client. In our above example, it will take the `style` tag:

```html
<style>
  h1 { color: Crimson; }
</style>
```

And hoist it to the `head` of your document, where it will look like this:

```html
<style>
  my-message h1 { color: Crimson; }
</style>
```
> If you have more than one `my-message` element on your page, the style transform will also deduplicate the CSS so the directives only appear once.

This provides the added benefit of avoiding the dreaded [Flash of Unstyled Custom Element (FOUCE)](https://www.abeautifulsite.net/posts/flash-of-undefined-custom-elements/) when dealing with web components. This way, you can avoid using the:

```css
:not(:defined) {
  visibility: hidden;
}
```

trick to hide web components until they are defined by a call to `customElements.define()`.

## But this isn’t a web component?

True. I’d say what we have built so far is a server-side rendered custom element, and it doesn’t become a real web component until we enhance it (see what I did there) by calling `customElements.define()`. So let’s go ahead and round out our single file component by adding in some JavaScript.

```javascript
export default function MyMessage({ html, state }) {
  const { attrs } = state
  const { message = '' } = attrs

  return html`
  <style>
    h1 { color: Crimson; }
  </style>
  <h1>${message}</h1>
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

Ah, now we have a _real_ web component. If you update the `message` attribute of the `my-message` tag, the component will re-render itself.

In our example, we still aren’t using the shadow DOM, and I don’t see any reason why we would need to at this point, but if you really wanted to, you could change the script tag to use the shadow DOM approach.

```javascript
export default function MyMessage({ html, state }) {
  const { attrs } = state
  const { message = '' } = attrs

  return html`
    <h1>${message}</h1>
    <script type="module">
    const template = document.createElement('template')
    template.innerHTML = "<style>h1 { color: Crimson; }</style><h1></h1>"

    class MyMessage extends HTMLElement {
        constructor() {
          super();
          const shadow = this.attachShadow({ mode: 'open' });
          shadow.appendChild(template.content.cloneNode(true));
        }

        static get observedAttributes() {
          return [ 'message' ]
        }

        attributeChangedCallback(name, oldValue, newValue) {
          if (oldValue !== newValue) {
            if (name === 'message') {
              this.shadowRoot.querySelector('h1').innerText = newValue
            }
          }
        }
      }

      customElements.define('my-message', MyMessage)
    </script>
    `
}
```

This doesn't mean you are required to write vanilla JavaScript web components either. If you are familiar with using [Fast](https://www.fast.design/) or [Lit](https://lit.dev/) to write web components you can include those libraries in you Enhance application. However, with the introduction of Enhance base classes for the [light](https://github.com/enhance-dev/enhance-custom-element) and [shadow](https://github.com/enhance-dev/enhance-shadow-element) DOM you can get the same DX improvements where you write less boilerplate web component code while enabling the sharing of a render method between the SSR and CSR rendering.

## Next Steps

* If you disagree with this article, maybe try out [Enhance](https://enhance.dev/) in anger and let us know what you think.
* [Follow](https://fosstodon.org/@enhance_dev) Axol, the Enhance Mascot on Mastodon…
* Join the [Enhance Discord](https://enhance.dev/discord) and share what you’ve built, or ask for help.
