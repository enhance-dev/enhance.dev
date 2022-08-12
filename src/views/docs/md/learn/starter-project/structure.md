---
title: Structure
---

The enhance starter project is setup to enable you to create dynamic multi-page applications with as little friction as possible. It comes preconfigured with everything you need to work with file based routing and standards based components.

```bash
app
├── api .......... data routes
│   └── index.mjs
├── elements .......... custom element pure functions
│   └── my-header.mjs
└── pages ............. file based routing
    └── index.html
```

## Pages

The pages folder enables file based routing. To add a route just add an HTML file. The name of the file will be the URL you view it at. Meaning `app/pages/about.html` will be viewed at `/about`.

## Elements

The elements folder is where you keep your [single file components](/docs/learn/concepts/single-file-components). These are custom element templates that get rendered server side and setup your HTML page for progressive enhancement.

Elements must be named with one or more words separated by a dash `my-header.mjs` which corresponds to the tag name you author in your html pages `<my-header></my-header>`.

## Api

