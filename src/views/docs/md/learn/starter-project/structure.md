---
title: Structure
---

The enhance starter project is setup to enable you to create dynamic multi-page applications with as little friction as possible. It comes preconfigured with the basic structure needed to work with file based routing and standards based components.

Here is a look at the contents:
```bash
app
├── elements .......... define pure functions that return custom elements
│   ├── footer.mjs
│   └── header.mjs
├── elements.mjs ...... define tag names for custom element definitions
└── pages ............. file based routing
    └── index.html
```

## Pages

The pages folder enables you to add routes to your app by adding files. For instance, adding an `app/pages/about.html` will add the route `/about` to your app.

## Elements

The elements folder is where we keep our [single file components](/docs/learn/concepts/single-file-components). These are custom element templates that get rendered server side and setup your HTML page for progressive enhancement.

Elements are registered with the app in the `app/elements.mjs` file. This file is responsible for registering your desired tag names with the templates used to [expand your custom elements](/docs/learn/concepts/rendering/element-expansion).

