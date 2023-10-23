---
title: "Tutorial: incrementing a counter"
---

To demonstrate building out dynamic API routes and then progressively enhancing them we'll build an incrementing counter. First rough in the HTML.

### Part 1: basic HTML form handling

1. Create a new Enhance app `npx "@enhance/cli@latest" new ./counter-app`. This generates a starter project with `app/pages/index.html`, and static assets in `public/`.
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
