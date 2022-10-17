---
title: Quick start
---

### Welcome!

Enhance is a web standards-based HTML framework. It's designed to provide a dependable foundation for building lightweight, flexible, and future-proof web applications. ([Learn more about the Enhance philosophy](/docs/learn/why-enhance).)

## Video Walkthrough

<doc-video playback-id="ADl6wSlpxTpJKym2OhPd2TQsB64nW01x5dygkSEAfNdU" name="Enhance Quick Start">
  <doc-video-next playback-id="uEucxWZZUxE9BAa02DH00w8C6d89viqBYd4nHU02NFFi7c" name="Quick Start pt 2"></doc-video-next>
  <doc-video-next playback-id="ZqjJbownz016Af48YXjrCE02uqdtdGm8HSUulTNAjZyNg" name="Quick Start pt 3"></doc-video-next>
</doc-video>

## Get started

To create a project, ensure you have <a href=https://nodejs.org>Node.js 16.x</a> or higher installed, and run:

```bash
npm create "@enhance" ./myproject -y
```

After setup is complete, run the following commands to install deps, and start the local dev server:

```bash
cd myproject
npm install
npm start
```

## Index route

Once your app starts up, navigate to [http://localhost:3333](http://localhost:3333).
The source for the index page can be found in your app at `app/pages/index.html`.

```
app
└── pages ............. file based routing
    └── index.html
```

## Add a route

Add a new route at the `"/about"` URL by creating a new file called `about.html` in the `pages` folder at `app/pages/about.html`

You can add something like this:

<doc-code filename="app/pages/about.html" >

```html
Hello world, I am <em>very</em> <strong>excited</strong> to meet you.
```

</doc-code>

Reload the app, and navigate to [`http://localhost:3333/about`](http://localhost:3333/about) to see your new page in action!

## Reuse code with custom elements

Add an `"elements"` folder to your app at `app/elements`.

Your project should now look like this:

```
app
├── elements .......... custom element pure functions
└── pages ............. file based routing
    ├── about.html
    └── index.html
```

Add a [pure function](https://en.wikipedia.org/wiki/Pure_function) that returns an html string.
Your function will be passed an object containing an `html` render function for expanding custom elements.

Add a `my-header.mjs` file in the `app/elements/` folder.

The contents of `my-header.mjs` should look like this:

<doc-code filename="app/elements/my-header.mjs" >

```javascript
export default function MyHeader({ html }) {
  return html`
    <header>
      <h1>Header</h1>
      <nav>
        <a href=/>home</a>
        <a href=/about>about</a>
      </nav>
    </header>
  `
}
```

</doc-code>

Your project should now look like this:

```
app
├── elements .......... custom element pure functions
│   └── my-header.mjs
└── pages ............. file based routing
    ├── about.html
    └── index.html
```

Modify `app/pages/about.html` to include your new custom element header:

<doc-code filename="app/pages/about.html" >

```html
<my-header></my-header>
Hello world, I am <em>very</em> <strong>excited</strong> to meet you.
```

</doc-code>

Reloading your app will show the new header with working navigation to and from "`/about`".

## That's it

You are off to a great start! You now know how to add routes, pages, and elements.
