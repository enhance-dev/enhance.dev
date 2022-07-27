---
title: Pages
---

Pages are the entry point for enhance rendering. They can be written in standard HTML and the output is setup for progressive enhancement with custom elements in the browser.

## Registration

Pages follow the custom element naming convention of `page-name` and are required to be registered in the `elements.mjs` file found at `app/elements.mjs`

> 👋 Read more about [elements registration here](/docs/learn/starter-project/elements)

## File based routing

Pages in the enhance starter project enable file based routing, so adding a `app/pages/about.html` for instance will make it available at `/about`in your browser.

## HTML by default

Pages are written in HTML and can be composed of many dynamic custom elements. Pages are meant to be rendered once server-side and contain a layout component for positioning elements.

## Dynamic if need be

If you decide that you absolutely need to pass state to your page element then you have the ability to turn it into a single file component as well.

> 🙌 Read about [single file components here](/docs/learn/concepts/single-file-components)

