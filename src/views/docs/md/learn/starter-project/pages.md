---
title: Pages
---

## Entry point
Pages are the entry point for enhance rendering. They can be written in standard HTML and the output is setup for progressive enhancement with custom elements in the browser. Pages live in the `app/pages/` folder of the enhance starter project.

## File based routing
Pages in the enhance starter project enable file based routing. Meaning that adding a `app/pages/about.html` for instance will make it available at `/about` in your browser.

## HTML by default
Pages are written in HTML and can be composed of many dynamic custom elements. Pages are meant to be rendered once server-side.

## Dynamic if need be
Elements added to a page will be passed  state, but if you decide that you absolutely need to handle state in your page then you have the ability to turn it into a single file component as well.

> 🙌 Read about [single file components here](/docs/learn/concepts/single-file-components)

## That's it
You'll find that working this way will allow you to start with standard HTML then incrementally create custom element components as the need for reuse arises.

