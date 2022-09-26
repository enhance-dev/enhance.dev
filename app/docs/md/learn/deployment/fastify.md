---
title: Fastify
---

Fastify is a very fast, beautifully designed, and well maintained app server for Node. `@enhance/fastify-plugin` gives you the ability to build your frontend completely in HTML, and pure custom elements. 

Fastify can be deployed to any cloud vendor that supports deploying a Node web server; the most popular choices are [AWS](https://aws.amazon.com/getting-started/hands-on/deploy-nodejs-web-app/), [Azure](https://docs.microsoft.com/en-us/azure/app-service/quickstart-nodejs?tabs=linux&pivots=development-environment-vscode), and [GCP](https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service).

## Quickstart

Create a project.

```bash
mkdir -p myproject 
cd myproject
npm init -y
npm install fastify @enhance/fastify-plugin
touch index.mjs
```

Add some handy shortcuts to `scripts` in `package.json`.

```json
{
  "scripts": {
    "start": "node index.mjs"
  }
}
```

Add the following to `index.mjs`:

<doc-code filename="index.mjs" numbered>

```javascript
import Fastify from 'fastify'
import Enhance from '@enhance/fastify-plugin'

const app = Fastify()

app.register(Enhance)

app.listen({ port: 3000 }, console.log)
```

</doc-code>

Create `app/pages/index.html`, and write some HTML!

<doc-code filename="app/pages/index.html" numbered>

```html
<my-header></my-header>
<strong>powerful html here</strong>
<my-footer></my-footer>
```

</doc-code>

Create some custom elements in a folder named `app/elements`.

<doc-code filename="app/elements/header.mjs" numbered>

```javascript
export default function header ({ html }) {
  return html`<header> my cool header</header>`
}
```

</doc-code>

<doc-code filename="app/elements/footer.mjs" numbered>

```javascript
export default function footer ({ html, state }) {
  return html`
    <footer>
      <p>footer here</p>
      <pre>${JSON.stringify(state, null, 2)}</pre>
    </footer>
  `
}
```

</doc-code>

Create `app/elements.mjs` to define custom element tag names.

<doc-code filename="app/elements.mjs" numbered>

```javascript
import header from './elements/header.mjs'
import footer from './elements/footer.mjs'

let elements = {
  'my-header': header,
  'my-footer': footer
}

export default elements
```

</doc-code>

Run `npm start`, and preview at `http://localhost:8080`.

## Adding a route as plain basic HTML

Create a new page for `"/about"` by adding `app/pages/about.html`:

<doc-code filename="app/pages/about.html" numbered>

```html
<my-header></my-header>
this is the "/about" page
<my-footer></my-footer>
```

</doc-code>

## Adding a route as a custom element

Sometimes we need to access `state` to populate a route. Custom elements are a great way to do this.

Add `/fruits` by creating `app/pages/fruits.mjs`:

<doc-code filename="app/pages/fruits.mjs" numbered>

```javascript
export default function fruits ({ html, state }) {
  let fruit = f => `<li>${f}</li>`
  let list = state.store.fruits
    ? state.store.fruits.map(fruit).join('') 
    : []
  
  return html`
    <h1>yummy fruit</h1>
    <ul>${list}</ul>
  `
}
```

</doc-code>

Register the new page element by updating `app/elements.mjs`:

<doc-code filename="app/elements.mjs" highlight="3-add,8-add" numbered>

```javascript
import header from './elements/header.mjs'
import footer from './elements/footer.mjs'
import fruits from './pages/fruits.mjs'

let elements = {
  'my-header': header,
  'my-footer': footer,
  'page-fruits': fruits
}

export default elements
```

</doc-code>

Navigating to `/fruits` will show an empty list. Create an API route to populate it at `app/api/fruits.mjs`:

<doc-code filename="app/api/fruits.mjs" numbered>

```javascript
export async function get (req) {
  return {
    json: { fruits }
  }
}
```

</doc-code>

Reloading `/fruits` will show the server rendered fruit! API routes can export both `get`, and `post` handlers.
