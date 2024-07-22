---
title: "Selecting 3rd Party Web Components"
image: "/_public/blog/post-assets/vending-machine.jpg"
category: uncategorized
description: "As more Web Components are published as re-usable modules, it's helpful to have some criteria when selecting third party libraries to incorporate new features."
author: "Taylor Beseda"
avatar: "tbeseda-2022.jpg"
mastodon: "@tbeseda@indieweb.social"
published: "December 12, 2022"
---

![Vending machines](/_public/blog/post-assets/vending-machine.jpg)
<small>Original photo by [Laam](https://unsplash.com/@laam)</small>

As Web Components (WCs) continue to gain traction, it's becoming more common to see elements published as re-usable modules. This awesome trend helps new apps get off the ground and incorporate new features without having to implement complex functionality. Here are a few things to consider when selecting a third party WC for your project — [Enhance](https://enhance.dev) or otherwise.

1. The dependency graph
2. Progressive enhancement-ability
3. Accessibility features
4. Styling interface
5. Component "entrypoint"

## Don't ship a framework for a single component

Before [`npm install`ing your way to success](https://blog.begin.com/posts/2022-03-22-dont-npm-install-your-way-to-success), check what that new WC includes.

There are several lightweight libraries I might expect to see as dependencies (like [Alpine.js](https://alpinejs.dev/) or WC-specific utilities like [Exalt](https://github.com/exalt/exalt) and [slimjs](https://github.com/slimjs/slim.js)). A full front end framework, like React, for a component is wholly unnecessary.

Of course, there are specialized front-end frameworks specifically for Web Components: [Lit](https://lit.dev/), [Stencil.js](https://stenciljs.com/), and [FAST](https://www.fast.design/) to name a few. These can be very beneficial, especially if your app is already making use of one. However, the overhead should be proportional to the surface area of the new component. So if you'd like to use a full design system with several elements and it requires all of FAST, go for it! But if it's just a fancy dark mode toggle that happens to be "built with XYZ", it may not be worth the cost of a framework.

Additionally, many popular front-end frameworks support WCs by trying to export `toWebComponent`, but still require framework overhead — even if it's bundled, it's big.

Large, complex dependency graphs will only lead to upgrade woes and large server payloads for your users.

## The component works without JS (or is the enhancement)

There should be a way to either partially render the WC from the server or use it in a baseline state. The exception would be if the external component library is working to augment an existing feature that has its own baseline.

**Example:** If the objective of the new component is to scroll a marquee of color-changing text, I wouldn't expect it to animate without JavaScript enabled. However, I would expect that my server can still render the text content so that it's readable by the user — even without that nostalgic text effect.

I want my server to transmit (or static file to contain):

```html
<fancy-marquee>Web Components are RAD!</fancy-marquee>
```

I should not have to provide the text content via a JS-only API or as an attribute that won't be immediately rendered by the browser. Especially for such a simple element.

## Accessible out of the box

Accessibility relates to the previous two points: don't transmit bloated, unused code to the browser and provide a baseline experience without JavaScript.

If those requirements are met, then the WC should also be accessible by default. This means that the component should be keyboard navigable and have a focus state. It should also be able to be used with a screen reader. Check to see that the component is using semantic HTML and ARIA roles/attributes where appropriate.

**Example:** As [noted by MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA), if the component implements a progress bar, a native `<progress>` element should be used.
However, if the component can't necessarily be represented as a standard HTML element, then ARIA attributes should be used to provide information to assistive technology:

```html
<fancy-marquee
  role="marquee"
  aria-live="off"
  aria-label="Web Components are RAD!">
  Web Components are RAD!
</fancy-marquee>
```

## The component is style-able (or "headless")

If the added Web Component has an HTML interface, it should not be an exercise in browser dev tools gymnastics.

In many cases it's helpful to have some default CSS applied to custom elements and their children. But if my application requires adjustments to text shadow colors and input border radius, I'm going to benefit from a well thought out styling API.

**Example:** Ideally, well-structured WCs will document CSS variables that can be set within the scope of the custom element:

```css
fancy-marquee { --shadow-color: Crimson; }
fancy-marquee { --container-radius: 0.25rem; }
```

**Example:** Another good approach is to provide a list of class names that can be augmented with custom definitions:

```css
fancy-marquee .headline { text-shadow: 1px 1px 2px Crimson; }
fancy-marquee .container { border-radius: 0.25rem; }
```

Also, be wary of importing CSS into .js files…

## Including the component is straightforward

Your new WC should not require a new build pipeline or several import statements.

Consider how your project includes external code, particularly how your web server sends code to the browser. Does the new component plug-and-play?

In Enhance, any file in your `node_modules` folder can be automatically bundled and server to the browser via the `@bundles` config in the project's `.arc`:

<!-- TODO: Update this example to use rollup plugin via `app/browser` instead of `@bundles` -->

```arc
@bundles
fancy-marquee './node_modules/fancy-marquee/index.js'
```

Any page can now reference this bundle:

```html
<script type="module" src="/_public/bundles/fancy-marquee.mjs">
```

Or from an Enhance element:

```javascript
import FancyMarquee from '/_public/bundles/fancy-marquee.mjs`
```

## Examples and Takeaways

I don't want to call out any specific libraries as "unworthy" because I'm stoked anyone is authoring reusable components with a focus on web standards and native browser features! So here are a few I've used and would recommend:

- [`json-viewer`](https://www.webcomponents.org/element/@alenaksu/json-viewer) - A Web Component to visualize JSON data in a tree view
- [`mux-player`](https://docs.mux.com/guides/video/mux-player) - A drop in component for adding Mux videos into your web application
- [`github-elements`](https://github.com/github/github-elements) - GitHub's Web Component collection
- [`wc-toast`](https://abdmmar.github.io/wc-toast/) - Notifications component for everyone

Not all third party libraries will score an A+ on all of these points. But if you're looking for a new component, consider these factors when evaluating your options and use discretion when adding new dependencies to your project.
