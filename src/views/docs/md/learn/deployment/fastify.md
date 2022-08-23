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

```javascript
// index.mjs
import Fastify from 'fastify'
import Enhance from '@enhance/fastify-plugin'

const app = Fastify()

app.register(Enhance)

app.listen({ port: 3000 }, console.log)
```

Create `app/pages/index.html`, and write some HTML!

```html
<!-- app/pages/index.html -->
<my-header></my-header>
<strong>powerful html here</strong>
<my-footer></my-footer>
```

Create some custom elements in a folder named `app/elements`.

```javascript
/** app/elements/header.mjs */
export default function header ({ html }) {
  return html`<header> my cool header</header>`
}
```

```javascript
/** app/elements/footer.mjs */
export default function footer ({ html, state }) {
  return html`
    <footer>
      <p>footer here</p>
      <pre>${JSON.stringify(state, null, 2)}</pre>
    </footer>
  `
}
```

Create `app/elements.mjs` to define custom element tag names.

```javascript
// app/elements.mjs
import header from './elements/header.mjs'
import footer from './elements/footer.mjs'

let elements = {
  'my-header': header,
  'my-footer': footer
}

export default elements
```

Run `npm start`, and preview at `http://localhost:8080`.


## Adding a route as plain basic HTML

Create a new page for `"/about"` by adding `app/pages/about.html`:

```html
<!-- app/pages/about.html -->
<my-header></my-header>
this is the "/about" page
<my-footer></my-footer>
```

## Adding a route as a custom element

Sometimes we need to access `state` to populate a route. Custom elements are a great way to do this.

Add `/fruits` by creating `app/pages/fruits.mjs`:

```javascript
/** app/pages/fruits.mjs */
export default function fruits ({ html, state }) {
  let fruit = f => `<li>${f}</li>`
  let list = state.store.fruits? state.store.fruits.map(fruit).join('') : []
  return html`yummy fruit<ul>${list}</ul>`
}
```

Register the new page element by updating `app/elements.mjs`:

```javascript
// app/elements.mjs
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

Navigating to `/fruits` will show an empty list. Create an API route to populate it at `app/api/fruits.mjs`:

```javascript
// app/api/fruits.mjs
export async function get (req) {
  return {
    json: { fruits }
  }
}
```

Reloading `/fruits` will show the server rendered fruit! API routes can export both `get`, and `post` handlers.
