---
title: With tailwindcss
links:
  - tailwindcss.com: https://tailwindcss.com/
  - arc-plugin-tailwindcss: https://github.com/andybee/arc-plugin-tailwindcss
docs-pager: false
---

Use [tailwindcss](https://tailwindcss.com/) in an Enhance Start Project.

<doc-callout level="tip" mark="📣" thin>

Shout out to [@andybee](https://github.com/andybee) for writing the Arc community plugin for tailwind.

</doc-callout>

## Install [Arc tailwind plugin](https://github.com/andybee/arc-plugin-tailwindcss)

```
npm i -D arc-plugin-tailwindcss
```

## Configuration

### Modify .arc

We'll need to have Architect (powers our local development environment) load the tailwindcss plugin so we can build CSS to our public directory in real time.

<doc-code filename="/.arc" highlight="6-add,8:9-add">

```arc
@app
enhance-with-tailwind

@plugins
enhance/arc-plugin-enhance
arc-plugin-tailwindcss      # enable the plugin

@tailwindcss                # tailwind plugin options
build public/tailwind.css   # compiled tailwindcss output
```

</doc-code>

### tailwind.config.js

The Arc tailwind plugin will check for a tailwind config file. Let's set ours up to look at files in our app/ folder for utility classes:

<doc-code filename="/tailwind.config.js" highlight="3">

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{html,mjs}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

</doc-code>

## Use tailwind

### Create tailwind entry

Tailwind needs an input file to start with.
The Arc tailwind plugin will look in src/styles/tailwind.css, so we'll use that with the default content:

<doc-code filename="src/styles/tailwind.css">

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

</doc-code>

### Add to \<head\>

Enhance provides a simple `<head>` element without configuration, but to include our generated tailwind.css, we'll need to override with our own [Head function](/docs/learn/starter-project/head):

<doc-code filename="app/head.mjs" highlight="9">

```javascript
export default function Head() {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>My Enhance Project</title>
      <link rel="stylesheet" href="/_public/tailwind.css">
      <link rel="icon" href="/_public/favicon.svg">
    </head>
  `
}
```

</doc-code>

### Add tailwind classes

Now it's time to make use of tailwind classes in our HTML and custom elements. The tailwind compiler and watcher will pick them up for us.

```javascript
export default function MyCounter({ html }) {
  return html`
    <button class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
      Counter Button
    </button>
  `
}

```

### Build stuff!

When the development server is fired up tailwind will build a stylesheet based on classes used in our app/ files. In addition, the tailwind watcher will run alongside our server and rebuild with each change we make.

```
npm start
```

### Project structure

Upon running our development server (or when deploying), our project now looks like...

```bash
.
├── .arc
├── app
│   ├── elements/
│   ├── head.mjs            # override default head
│   └── pages/
├── package.json
├── public
│   └── tailwind.css        # created by arc-plugin-tailwindcss
├── src
│   └── styles
│       └── tailwind.css    # tailwind entry
└── tailwind.config.js
```
