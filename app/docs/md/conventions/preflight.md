---
title: Preflight
---


The purpose of the preflight file is to supply default application state.
It can also be used to customize data based on the request per route.

Enhance looks for the preflight file in the root of your app.

<doc-code filename="app/preflight.mjs">

```bash
app
├── api ............... data routes
│   └── index.mjs ..... override default preflight application state with api data
└── preflight.mjs ..... pre-populate application state

```
</doc-code>

The preflight function is passed the request object enabling you to customize data per requested route.
API responses are merged with the default state returned from preflight allowing you to override default state with specific API data per request.

### Basic example 

<doc-code filename="app/preflight.mjs">

  ```javascript
  export default function Preflight ({ req }) {
    return { /* ...Your data here */ }
  }
````
</doc-code>



### Setting the page title using preflight

<doc-code filename="app/preflight.mjs">

  ```javascript
  export default function Preflight ({ req }) {
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



### Example of overriding default preflight data with an API response

<doc-code filename="app/preflight.mjs">

  ```javascript
  export default function Preflight ({ req }) {
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



