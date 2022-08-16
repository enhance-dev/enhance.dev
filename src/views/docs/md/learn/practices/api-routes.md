---
title: API Routes
---

Enhance API routes are backend JSON routes designed for seamless clientside progressive enhancement. API routes are defined under `app/api` and follow the same file based routing conventions as `app/pages`. JSON response values from API routes are automatically passed to corresponding page routes.

API routes are designed to simultaneously handle requests made for `text/html` and `application/json`.

## Request 

API routes always receive a `request` object:

| key     | type     | description
|---------|----------|---
| body    | `object` | Automatically parsed if present; `{}` if request has no body
| headers | `object` | Request headers
| method  | `string` | Request method: `GET`, `POST`, `PATCH`, `PUT`, or `DELETE`
| params  | `object` | URL params (e.g. product in `/app/api/shop/$product.mjs`); `{}` if request has no params
| path    | `string` | Root-relative path of the request URL 
| query   | `object` | Request querystring params; `{}` if request has none
| session | `object` | Read of the request cookie; `{}` when empty

## Response

API routes always return a `response` object:

| key          | type     | description
|--------------|----------|---
| json         | `object` | Plain JS object that will returned as a JSON response (or initial state for `text/html` requests)
| location     | `string` | Redirect path to send client
| statusCode   | `number` | Set the HTTP status code (default: `200`, aliases: `code`, and `status` )
| cacheControl | `string` | Set the `cache-control` header
| headers      | `object` | Set response headers as key/value pairs
| session      | `object` | Writes passed object to the session

## Life cycle Tutorial: incrementing a counter

To demonstrate building out dynamic API routes and then progressively enhancing them we'll build an incrementing counter. First rough in the HTML.

### Part 1: basic HTML form handling

1. Create a new Enhance app `npm create @enhance ./counter-app`. This generates a starter project with `app/pages/index.html`, and static assets in `public/`.

2. Create a form for incrementing at `app/elements/form-counter.mjs`: 

```javascript
// app/elements/form-counter.mjs
export default function counter ({ html, state }) {
  return html`<form action=/count method=post>
    <button>+1</button>
  </form>
  <pre>${ JSON.stringify(state, null, 2) }</pre>`
}
```

> Note the handy `<pre>` debugger

And add the new custom element to `app/pages/index.html`:

```html
<!-- app/pages/index.html -->
<form-counter></form-counter>
```

3. Create an API route to read the current count at `app/api/index.mjs` with the following contents:

```javascript
// app/api/index.mjs
export async function get (req) {
  let count = req.session.count || 0
  return {
    json: { count }
  }
}
```

4. Create an API route to handle `POST /count` by creating a file `app/api/count.mjs` with the following:

```javascript
// app/api/count.mjs
export async function post (req) {
  let count = req.session.count || 0
  count += 1
  return {
    session: { count }, 
    location: '/'
  }
}
```

The function above reads the count from the session or sets a default value, increments `count`, and then writes the session, and redirects to `/`. Always redirect after a form post to prevent double form submission, and proper back-button behavior.

5. Preview the counter by running `npm start`; you'll see the `state` update in the handy `<pre>` tag debugger we created in step 1.

### Part 2: progressive enhancement

The form functions even when client JS isn't available. This is the moment where we can improve the web consumer experience, and augment the form to work without a posting the form, and incurring a server round trip.

1. Add a JSON result to `app/api/count.mjs`

```javascript
// app/api/count.mjs
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

Now anytime `POST /count` receives a request for JSON it will get `{ count }`.

Create a completely vanilla client JS file `public/form-counter.mjs`:

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
    let res = await fetch('/count', {
      headers: {
        'accept': 'application/json'
      },
      method: 'post'
    })
    let json = await res.json()
    this.pre.innerHTML = JSON.stringify(json, null, 2)
  }
}

customElements.define('form-counter', Counter)
```

Add `<script type=module src=/_static/form-counter.mjs></script>` to `app/pages/index.html` and reload to see the enhanced version.
