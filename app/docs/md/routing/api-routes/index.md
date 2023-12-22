---
title: API Routes
---

Enhance’s API routes are designed for seamless functionality with both server side rendering and client side progressive enhancement. These API routes follow the same [file based routing conventions](/docs/routing) as pages in `app/pages`.

API routes are designed to handle requests made for `text/html`, or `application/json` from a single HTTP request handler. JSON response data is automatically passed to corresponding page routes (and Enhance Elements within them) via [state.store](/docs/elements/state/store) during server side rendering.

When working with HTML forms, API routes should always export both `get` and `post` handlers. API routes can also optionally export handlers for `put`, `patch`, and `destroy` for use with [`fetch`es](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) via client side JavaScript.

<doc-callout level="info">

Request handler functions exported from your API route should always be **async functions**, exported as **named exports**.

</doc-callout>

## Example

This is an example of a `get` request handler for the index API route.

<doc-code filename="api/index.mjs">

```javascript
export async function get (req) {
  return {
    json: {
      favorites: ['coffee crisp', 'smarties']
    }
  }
}
```
</doc-code>

Given a corresponding `app/pages/index.html`, any Enhance Element rendered on that page will have access to the `favorites` array via [`state.store`](/docs/elements/state/store). For example:

```js
export default function MyFavorites ({ html, state }) {
  const { store } = state
  const { favorites } = store

  return html`
    <p>My favorites are: ${favorites.join(', ')}</p>
  `
```

## Request

API routes always receive a `request` object:

| key     | type     | description
|---------|----------|---
| body    | `object` | `{}` if request has no body
| headers | `object` | Request headers
| method  | `string` | Request method: `GET`, `POST`, `PATCH`, `PUT`, or `DELETE`
| params  | `object` | URL params (e.g. 'cat' in `/app/api/cats/$cat.mjs`)
| path    | `string` | Root-relative path of the request URL
| query   | `object` | Request `querystring` parameters
| session | `object` | Read of the request cookie

<doc-callout level="tip">

When making a client side network request, set your request’s `accept` header to `application/json`. This is all you need to do to receive JSON data from your API route on the client!

</doc-callout>

## Response

API routes always return a `response` object:

| key          | type     | description
|--------------|----------|---
| `json`         | `object` | Plain JS object returned as a JSON response, or initial state for a `text/html` request
| `location`     | `string` | Redirect path to send client
| `statusCode`   | `number` | Set the HTTP status code (default: `200`, aliases: `code`, and `status` )
| `cacheControl` | `string` | Set the `cache-control` header
| `headers`      | `object` | Set response headers as key/value pairs
| `session`      | `object` | Writes passed object to the session

## Requesting Data Example

Perhaps you would like to progressively enhances your web component to avoid a full page reload when requesting data from an Enhance backend. Here is an example of using `fetch` in the browser to make that request.

```javascript
const response = await fetch('/', {
  headers: { 'accept': 'application/json' },
  method: 'get'
})

const json = await res.json()
// json: { favorites: ['coffee crisp', 'smarties'] }
```

## Sending Data Example

Conversely, you may want to avoid doing a form post to prevent a full page reload in the browser. In order send data to an Enhance back end you must properly set the `Content-Type` header.

### JSON

```javascript
const response = await fetch('/', {
  headers: {
    'accept': 'application/json'
    'content-type': 'application/json'
  },
  method: 'post',
  body: JSON.stringify({
    favourite: 'crispy crunch'
  })
})
```

### Forms

When sending form data you have a couple of options. The first is using `URLSearchParams` to send data using the mime type `application/x-url-form-encoded`.

```javascript
const form = document.querySelector('form')
const response = await fetch('/', {
  headers: {
    'accept': 'application/json'
    'content-type': 'application/x-url-form-encoded'
  },
  method: 'post',
  body: new URLSearchParams(new FormData(form))
})
```

The second is converting your form data to JSON and sending it along as the mime type of `application/json`.

```javascript
const form = document.querySelector('form')
const response = await fetch('/', {
  headers: {
    'accept': 'application/json'
    'content-type': 'application/json'
  },
  method: 'post',
  body: JSON.stringify(
    Object.fromEntries(
      new FormData(form)
    )
  )
})
```
