---
title: Pages
---

Pages are the entry point for Enhance rendering. They are authored in standard HTML, and the output is setup for progressive enhancement with custom elements in the browser. Pages live in the `app/pages/` folder of Enhance projects.

## File-based routing

Pages in Enhance projects enable file-based routing. Meaning that adding a `app/pages/about.html` for instance will make it available at `/about` in your browser.

```
app/pages/index.html → https://yoursite.com/
app/pages/about.html → https://yoursite.com/about
```

## HTML by default

Pages are written in HTML and can be composed of many dynamic custom elements. Pages are meant to be rendered once, server-side.

## Dynamic if needed

Pages can also be written as single-file components that get passed state, but we recommend handling state in Elements to cut down on unnecessary complexity.

<doc-callout level="none" mark="🙌">

**[Read about Enhance Elements](/docs/elements)**

</doc-callout>

## That's it

You'll find that working this way will allow you to start with standard HTML then incrementally create custom element components as the need for reuse arises.
