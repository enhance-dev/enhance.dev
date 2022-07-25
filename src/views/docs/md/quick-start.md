---
title: Getting Started
---

To create a project, run:

```bash
npm create @enhance ./myproject -y
```

After setup is complete, run the following commands to install deps, and start the local dev server:

```bash
cd myproject
npm install
npm start
```

## Add routes

We are going to make a new route at `"/about"` URL. Create a new file `app/pages/about.html` with the following HTML markup:

```html
<!-- app/pages/about.html -->
Hello world, I am <i>very</i> <strong>excited</strong> to meet you.
```     

Reload the app, and navigate to `"/about"` to see your new page in action!

## Reuse code with custom elements

The generated project will have `app/elements/header.mjs` defined. Open it up and modify it to be like this:

```javascript
// app/elements/header.mjs
export default function Header ({ html }) {
  return html`
<header>
  <h1>Header</h1>
  <nav>
    <a href=/>home</a>
    <a href=/about>about</a>
  </nav>
</header>`
}
```

The code above defines a pure function that accepts state, and returns an HTML string which will become the template body for a custom element. In our case, the header custom element now has a link to `"/about"`.

Modify `app/pages/about.html` to include the custom element:

```html
<!-- app/pages/about.html -->
<el-header></el-header>
Hello world, I am <i>very</i> <strong>excited</strong> to meet you.
``` 

Reloading your app will show the new header with working navigation to and from `"/about"`.

## Next steps

- Learn more about how routing works.
- Learn how to create your own custom elements.
- Join the community Discord, ask questions, and get help!
