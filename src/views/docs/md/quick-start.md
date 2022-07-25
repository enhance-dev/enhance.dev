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

## Your first route

We are going to make a new route at `"/about"` URL. Before we do that, let's link to it.

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

The code above defines a pure function that accepts state and returns the template body for a custom element. In our case, a custom element for the header now has a link to `"/about"`.

Create a new file `app/pages/about.html` with the following HTML markup:

```html
<!-- hello world! -->
<el-header></el-header>
Hello world, I am <i>very</i> <strong>excited</strong> to meet you.
```      

Reload the app, and navigate to `"/about"` to see your new page in action!
