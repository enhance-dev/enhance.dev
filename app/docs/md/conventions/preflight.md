---
title: Preflight
---


The purpose of the preflight file is to populate the server-side store with default application state.
The preflight function is passed the request object enabling you to populate the server-side store with customized data per route.

You can use the preflight file as a way to incrementally build your data layer. Start with a static version of your store data to get everything working then progress to using API functions and a database as needed.

Preflight can also work as a global middleware replacement for pages that require data but you may not want to be required to write an API endpoint for. A common pattern that can be solved with preflight is needing authenticated account data on a page that doesn't have an API endpoint.

Enhance looks for the preflight file in the root of your app.

<doc-code filename="app/preflight.mjs">

```bash
app
├── api ............... data routes
│   └── index.mjs ..... override default preflight application state with api data
├── preflight.mjs ..... pre-populate server-side store
└── head.mjs .......... custom <head> component

```
</doc-code>

The preflight function is passed the request object enabling you to customize data per requested route.
API responses are merged with the default state returned from preflight allowing you to override default state with specific API data per request.

### Basic example

<doc-code filename="app/preflight.mjs">

  ```javascript
  export default async function Preflight ({ req }) {
    return { /* ...Your data here */ }
  }
````
</doc-code>


### Setting the page title using preflight

<doc-code filename="app/preflight.mjs">

  ```javascript
  export default async function Preflight ({ req }) {
    return {
      pageTitle: getPageTitle(req.path),
      account: {
        username: 'bobsyouruncle',
        id: '23jk24h24'
      }
    }
  }

  function getPageTitle (path) {
    const titleMap = {
      '/': 'Home',
      '/about': 'About',
      '/account': 'My Account'
    }

    return titleMap[path] || 'My App Name'
  }
````
</doc-code>

### Access the page title from the store

The data object you return from preflight will be available to your elements and the `head.mjs` file via the `state.store`

<doc-code filename="app/head.mjs">

  ```javascript
    export default function Head(state) {
      const { store = {} } = state
      const { pageTitle = 'Enhance Starter Project' } = store
      return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>${pageTitle}</title>
        </head>
        <body class="font-sans">
      `
    }
  ```

</doc-code>


### Overriding default preflight data with an API response

<doc-code filename="app/preflight.mjs">

  ```javascript
  export default async function Preflight ({ req }) {
    return {
      pageTitle: getPageTitle(req.path),
      account: {
        username: 'bobsyouruncle',
        id: '23jk24h24'
      }
    }
  }
````
</doc-code>

<doc-code filename="app/api/index.mjs">

  ```javascript
  export async function get() {
    return {
      json: {
        account: {
          username: 'thisshouldoverride',
          id: '39nr34n2'
        }
      }
    }
  }
````
</doc-code>

The account object will be overridden by the API response.



