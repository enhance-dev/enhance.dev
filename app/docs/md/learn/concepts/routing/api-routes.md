---
title: API Routes
---

Enhance's API routes are backend JSON routes designed for seamless client-side progressive enhancement. API routes are defined under `app/api` and follow the same file-based routing conventions as `app/pages`. JSON response values from API routes are automatically passed to corresponding page routes.

API routes are designed to handle requests made for `text/html`, or `application/json` from a single HTTP request handler. API routes by default should always export `get` and `post` handlers for working with HTML forms. API routes can also optionally export handlers for `put`, `patch`, and `destroy` for use with client-side JavaScript fetch.

## Example

This is an example of a `get` request handler for the index API route.

<doc-code filename="api/index.mjs">

```javascript
export async function get (req) {
  return {
    json: {
      favorties: ['coffee crisp', 'smarties']
    }
  }
}
```
</doc-code>

## Request

API routes always receive a `request` object:

| key     | type     | description
|---------|----------|---
| body    | `object` | `{}` if request has no body
| headers | `object` | Request headers
| method  | `string` | Request method: `GET`, `POST`, `PATCH`, `PUT`, or `DELETE`
| params  | `object` | URL params (e.g. 'cat' in `/app/api/cats/$cat.mjs`)
| path    | `string` | Root-relative path of the request URL
| query   | `object` | Request querystring parameters
| session | `object` | Read of the request cookie

## Response

API routes always return a `response` object:

| key          | type     | description
|--------------|----------|---
| json         | `object` | Plain JS object returned as a JSON response, or initial state for a `text/html` request
| location     | `string` | Redirect path to send client
| statusCode   | `number` | Set the HTTP status code (default: `200`, aliases: `code`, and `status` )
| cacheControl | `string` | Set the `cache-control` header
| headers      | `object` | Set response headers as key/value pairs
| session      | `object` | Writes passed object to the session

## Middleware

API routes have a lightweight middleware concept. Export an array of async function handlers, and they will be run in the order you define.

```javascript
export let get = [one, two]

async function one (req) {
  console.log('hi from one')
  req.first = true
}

async function two (req) {
  console.log('hi from two')
  const second = false
  
  return { json: [req.first, second] }
}
```

<doc-callout level="tip" mark="🎩">

Protip: Exit middleware early by `return`ing a response.

</doc-callout>

## Lifecycle tutorial: incrementing a counter

To demonstrate building out dynamic API routes and then progressively enhancing them we'll build an incrementing counter. First rough in the HTML.

### Part 1: basic HTML form handling

1. Create a new Enhance app `npm create @enhance ./counter-app`. This generates a starter project with `app/pages/index.html`, and static assets in `public/`.
2. Create a form for incrementing at `app/elements/form-counter.mjs`:

<doc-code filename="app/elements/form-counter.mjs" numbered>

```javascript
export default function counter ({ html, state }) {
  return html`
    <form action=/count method=post>
      <button>+1</button>
    </form>
    <pre>${JSON.stringify(state, null, 2)}</pre>
  `
}
```
</doc-code>

<doc-callout level="tip" mark="🔎">

Note the handy `<pre>` debugger on line 6!

</doc-callout>

And add the new custom element to `app/pages/index.html`:

<doc-code filename="app/pages/index.html" numbered>

```html
<form-counter></form-counter>
```
</doc-code>

3. Create an API route to read the current count at `app/api/index.mjs` with the following contents:

<doc-code filename="app/api/index.mjs" numbered>

```javascript
export async function get (req) {
  const count = req.session.count || 0

  return {
    json: { count }
  }
}
```
</doc-code>

4. Create an API route to handle `POST /count` by creating a file `app/api/count.mjs` with the following:

<doc-code filename="app/api/count.mjs" numbered>

```javascript
export async function post (req) {
  let  count = req.session.count || 0
  count += 1
  
  return {
    session: { count },
    location: '/'
  }
}
```
</doc-code>

The function above reads the count from the session or sets a default value, increments `count`, and then writes the session, and redirects to `/`. Always redirect after a form post to prevent double form submission, and proper back-button behavior.

5. Preview the counter by running `npm start`; you'll see the `state` update in the handy `<pre>` tag debugger we created in step 1.

### Part 2: progressive enhancement

The form functions even when client JS isn't available. This is the moment where we can improve the web consumer experience, and augment the form to work without a posting the form, and incurring a server round trip.

1. Add a JSON result to `app/api/count.mjs`

<doc-code highlight="7-add" filename="app/api/count.mjs" numbered>

```javascript
export async function post (req) {
  let count = req.session.count || 0
  count += 1
  
  return {
    session: { count },
    json: { count },
    location: '/'
  }
}
```
</doc-code>

Now anytime `POST /count` receives a request for JSON it will get `{ count }`.

Create a completely vanilla JS upgrade for the custom element:

<doc-code filename="public/form-count.mjs" numbered>

```javascript
export class Counter extends HTMLElement {
  constructor () {
    super()
    this.form = this.querySelector('form')
    this.pre = this.querySelector('pre')
    this.form.addEventListener('submit', this.addOne.bind(this))
  }

  async addOne (e) {
    e.preventDefault()
    
    const res = await fetch('/count', {
      headers: { 'accept': 'application/json' },
      method: 'post'
    })
    
    const json = await res.json()
    
    this.pre.innerHTML = JSON.stringify(json, null, 2)
  }
}

customElements.define('form-counter', Counter)
```
</doc-code>

<doc-callout level="info" mark="🍦">

Any framework or library could be used but this example is to show those are optional; the nice thing about working with the low level code is there are no dependencies and this will work in all browsers forevermore.

</doc-callout>

Add the client script to the custom element, and reload to see the enhanced version.

<doc-code highlight="7-add" filename="app/elements/form-counter.mjs" numbered>

```javascript
export default function counter ({ html, state }) {
  return html`
    <form action=/count method=post>
      <button>+1</button>
    </form>
    <pre>${JSON.stringify(state, null, 2)}</pre>
    <script type=module src=/_public/form-counter.mjs></script>
  `
}
```
</doc-code>
