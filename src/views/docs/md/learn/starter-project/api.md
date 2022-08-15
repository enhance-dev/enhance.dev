---
title: API
---

## Data routes
The `app/api` folder in your project is for adding data routes to your app.
To pass data to a page create a file with the same name as an existing file in your project's pages folder. Meaning `app/api/index.mjs` will supply data to `app/pages/index.html`

## Create an `api` route
Create an `api` route that passes data to your `index.html` page.
```bash
app
├── api .......... data routes
│   └── index.mjs
└── pages ............. file based routing
    └── index.html
```

## Return some data
Return hard-coded data from `app/api/index.mjs` to get started
```javascript
export async function get(req) {
  return {
    json: {
      message: 'Hello from your api route!'
    }
  }
}
```

## Create a display element
Create `app/elements/my-message.mjs` to display your hard-coded data
```bash
app
├── api .......... data routes
│   └── index.mjs
├── elements .......... custom element pure functions
│   └── my-message.mjs
└── pages ............. file based routing
    └── index.html
```

## Show store data
Access your data from the state store
```javascript
export default function MyMessage({ html, state={} }) {
  const { store={} } = state
  const { message='' } = store
  return html`
<p>${ message }</p>
  `
}
```

## Add your element
Add your `<my-message></my-message>` element to your `app/pages/index.html`
```html
<my-message></my-message>
```

Refresh your [index page](http://localhost:3333/) in your browser to see your message displayed

## That's it
You now know how to pass data to your pages. You can start with hard-coded data to get going then progress to storing and retrieving data from your apps database when the need arises.

> 💾  [ Read more about using data with your app → ](/docs/learn/practices/api-routes)



