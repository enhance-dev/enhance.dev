---
title: Form Validation
---

[Module Index](/enhance-workshop)


# Module 9: CRUDL with Validation

## Outline

* Client/Server Validation
* Handling Validation Problems with Session

The code we have works and for a toy app that might be sufficient. But for a real app we need to validate the data to avoid user error or intentional misuse.

## Data Validator

For a simple form like this we could add validation logic in the handler ad-hoc.
But as the data gets more complex that becomes a challenge.
In the Data Access layer we added a data schema for links.
The schema represents rules for the shape of the object we accept.
But we did not add a way to test new data against that schema.

Let's update `/app/models/links.mjs` to add a validate function:

```javascript
// /app/models/links.mjs
import data from '@begin/data'
import { validator } from '@begin/validator'
import { Link } from './schemas/link.mjs'

const deleteLink = async function (key) {
  await data.destroy({ table: 'links', key })
  return { key }
}

const upsertLink = async function (link) {
  return data.set({ table: 'links', ...link })
}

const getLink = async function (key) {
  return data.get({ table: 'links', key })
}

const getLinks = async function () {
  const databasePageResults = await data.page({
    table: 'links',
    limit: 25
  })

  let links = []
  for await (let databasePageResult of databasePageResults) {
    for (let link of databasePageResult) {
      delete link.table
      links.push(link)
    }
  }

  return links
}

const validate = {
  shared (req) {
    return validator(req, Link)
  },
  async create (req) {
    let { valid, problems, data } = validate.shared(req)
    if (req.body.key) {
      problems['key'] = { errors: '<p>should not be included on a create</p>' }
    }
    // Insert your custom validation here
    return !valid ? { problems, link: data } : { link: data }
  },
  async update (req) {
    let { valid, problems, data } = validate.shared(req)
    // Insert your custom validation here
    return !valid ? { problems, link: data } : { link: data }
  }
}

export {
  deleteLink,
  getLink,
  getLinks,
  upsertLink,
  validate
}
```

The `@begin/validator` combines a few features:
  - It creates a nested object from the flat form key/values pairs.
  - It normalizes the values into numbers, booleans, floats, etc. based on the Schema.
  - It also validates the form against the schema and returns any errors in an object called `problems`.

Let's add it to our project:

```bash
npm i @begin/validator
```

Replace the code in `/app/api/links.mjs` with the code below:

```javascript
// /app/api/links.mjs
import { getLinks, upsertLink, validate } from '../models/links.mjs'
import { checkAuth } from '../lib/check-auth.mjs'

export const get = [checkAuth,listLinks]
export const post = [checkAuth,postLinks]

export async function listLinks (req) {
  const links = await getLinks()
  return {
    json: { links }
  }
}

export async function postLinks (req) {
  let { problems, link } = await validate.create(req)

  await upsertLink(link)
  return {
    location: '/links'
  }
}
```

Now we are running the server-side validation which returns our problems, if there are any.
But what do we do with them?

## Form Problems Loop

To close the loop on server-side validation we will need a way to keep maintain state between requests so that we can pass those problems back and forth and fix them.

This is where we use the session to send those problems back to the front end so that the user has another chance to fix their form.

This is the process we will use for handling problems:
1. User submits form from `/links` that POSTS back to `/links`
2. The post handler runs `validate()` against the form values and gets a list of `problems`.
3. Post handler adds the problems to the session along with the initial values submitted (i.e.`session: {problems, link}`).
4. Post handler redirects back to `/links` by setting `location: '/links'` (with the above session set).
5. After being redirected GET API pulls the problems and link values off the session and sets them on `json` so that the page can display them.
6. HTML page uses the `state.store.problems` and `state.store.link` to restore the form where they left off with the problems highlighted.


Copy and paste (or add this code) to the `/app/api/links.mjs` API route.
The code is annotated with the steps. It might be difficult to follow because the problems loop will pass through this API file several times if validation fails.


```javascript
// /app/api/links.mjs
import { getLinks, upsertLink, validate } from '../models/links.mjs'
import { checkAuth } from '../lib/check-auth.mjs'

export const get = [checkAuth,listLinks]
export const post = [checkAuth,postLinks]


export async function listLinks (req) {
  const links = await getLinks()
  if (req.session.problems) {
  // 5. Back at the form we pull the problems and initial values off the session
    let { problems, link, ...session } = req.session
    return {
      session,
      // 6. The HTML page can get problems and initial values off the store
      json: { problems, links, link }
    }
  }

// 1. First user gets a blank form to fill out
  return {
    json: { links }
  }
}

export async function postLinks (req) {
  const session = req.session
  // 2. Validate form inputs and return problems
  let { problems, link } = await validate.create(req)
  if (problems) {
    return {
    // 3. Problems and initial values added to session
      session: { ...session, problems, link },
      // Used for progressive enhancement next module
      json: { problems, link },
      // 4. Redirects back to the form with the above session
      location: '/links'
    }
  }

  // If validation is successful the problems and old values are removed from the session
  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, link: removed, ...newSession } = session
  try {
    const result = await upsertLink(link)
    return {
      session: newSession,
      json: { link: result },
      location: '/links'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/links'
    }
  }
}
```

## Add Problems to HTML
Now lets update the HTML at `/app/pages/links.mjs` to use the problems if present.

### Client-side Validation
In the HTML forms module we covered client-side validation built to the platform.
The best solution for most forms is to use both.
In this case we know that both a `url` and `text` input are required for the link tree so we will add the `required` attribute to those inputs so the browser will check for that before even submitting.


What we add here are:
1. Problems and initial form values pulled out of the store.
2. Set the Details to open if problems were found
3. Form problem messages at the beginning of the form.
4. Error messages on each input with the custom element `error`
5. Set the `value` attributes with the previous state
6. Add client-side validation attributes to inputs

Copy and past the following to `/app/pages/links.mjs`.

```javascript
// /app/pages/links.mjs

export default function links({ html, state }) {
  const { store } = state
  let links = store.links || []
  // 1. Get Problems and values from the store
  const link = store.link || {}
  const problems = store.problems || {}

  return html`<enhance-page-container>
  <main>
    <h1 class="mb1 font-semibold text3">Links page</h1>
    ${links.map(item => `<article id="${item.key}" class="mb2">
<div class="mb0">
  <p class="pb-2"><strong class="capitalize">text: </strong>${item?.text || ''}</p>
  <p class="pb-2"><strong class="capitalize">url: </strong>${item?.url || ''}</p>
  <p class="pb-2"><strong class="capitalize">published: </strong>${item?.published || ''}</p>
  <p class="pb-2"><strong class="capitalize">key: </strong>${item?.key || ''}</p>
</div>
<p class="mb-1">
  <enhance-link href="/links/${item.key}">Edit this link</enhance-link>
</p>
<form action="/links/${item.key}/delete" method="POST" class="mb-1">
  <enhance-submit-button><span slot="label">Delete this link</span></enhance-submit-button>
</form>
</article>`).join('\n')}
${'' /* 2. Set details to open if problems ocurred */}
<details class="mb0" ${Object.keys(problems).length ? 'open' : ''}>
    <summary>New link</summary>
    <enhance-form
  action="/links/${link.key}"
  method="POST">
${'' /* 3. Overall form error messages */}
  <div class="${problems.form ? 'block' : 'hidden'}">
    <p>Found some problems!</p>
    <ul>${problems.form}</ul>
  </div>
  <enhance-fieldset legend="Link">
${'' /* 4,5,6. Problems, initial values, and validation attributes added */}
  <enhance-text-input label="Text" type="text" id="text" name="text" value="${link?.text}" errors="${problems?.text?.errors}" required minlength=1 ></enhance-text-input>
  <enhance-text-input label="Url" type="url" id="url" name="url" value="${link?.url}" errors="${problems?.url?.errors}" required></enhance-text-input>
  <enhance-checkbox label="Published" type="checkbox" id="published" name="published" ${link?.published ? "checked" : ""} errors="${problems?.published?.errors}"></enhance-checkbox>
  <input type="hidden" id="key" name="key" value="${link?.key}" />
  <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
  </enhance-fieldset>
</enhance-form>
</details>
</main>
</enhance-page-container>
  `
}
```

Next we have to update the other CRUDL routes to with the same problems loop.

Lets save some time and just copy paste the contents for the following routes:

Copy and paste the following into the `/app/api/links/$id.mjs`

```javascript
// /app/api/links/$id.mjs
import { getLink, upsertLink, validate } from '../../models/links.mjs'
import { checkAuth } from '../../lib/check-auth.mjs'

export const get = [checkAuth, listLink]

export async function listLink (req) {
  if (req.session.problems) {
    let { problems, link, ...session } = req.session
    return {
      session,
      json: { problems, link }
    }
  }

  const id = req.pathParameters?.id
  const result = await getLink(id)
  return {
    json: { link: result }
  }
}

export const post = [checkAuth, updateLink]

export async function updateLink (req) {
  const id = req.pathParameters?.id

  const session = req.session
  // Validate
  let { problems, link } = await validate.update(req)
  if (problems) {
    return {
      session: {...session, problems, link },
      json: { problems, link },
      location: `/links/${link.key}`
    }
  }

  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, link: removed, ...newSession } = session
  try {
    const result = await upsertLink({ key: id, ...link })
    return {
      session: newSession,
      json: { link: result },
      location: '/links'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/links'
    }
  }
}
```

Copy and paste the following into `/app/api/links/$id/delete.mjs`.

```javascript
// /app/api/links/$id/delete.mjs
import { deleteLink } from '../../../models/links.mjs'
import { checkAuth } from '../../../lib/check-auth.mjs'

export const post = [checkAuth, removeLink]

export async function removeLink (req) {
  const id = req.pathParameters?.id

  const session = req.session
  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, link: removed, ...newSession } = session
  try {
    let link = await deleteLink(id)
    return {
      session: newSession,
      json: { link },
      location: '/links'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/links'
    }
  }
}
```

Finally lets update the Update HTML page at `/app/pages/links/$id.mjs`

```javascript
// /app/pages/links/$id.mjs
export default function Html ({ html, state }) {
  const { store } = state
  const link = store.link || {}
  const problems = store.problems || {}

  return html`<enhance-page-container>
  <enhance-form
  action="/links/${link.key}"
  method="POST">
  <div class="${problems.form ? 'block' : 'hidden'}">
    <p>Found some problems!</p>
    <ul>${problems.form}</ul>
  </div>
  <enhance-fieldset legend="Link">
  <enhance-text-input label="Text" type="text" id="text" name="text" value="${link?.text}" errors="${problems?.text?.errors}" required minlength=1 ></enhance-text-input>
  <enhance-text-input label="Url" type="url" id="url" name="url" value="${link?.url}" errors="${problems?.url?.errors}" required></enhance-text-input>
  <enhance-checkbox label="Published" type="checkbox" id="published" name="published" ${link?.published ? "checked" : ""} errors="${problems?.published?.errors}"></enhance-checkbox>
  <input type="hidden" id="key" name="key" value="${link?.key}" />
  <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
  </enhance-fieldset>
</enhance-form>
</enhance-page-container>`
}
```

Now we have successfully built a full set of CRUDL routes piece by piece including authentication, client and server side validation. It was a bit of a marathon, but the goal is to understand how every piece of it works. And to see that there is no magic.

Now that we have done that I want to show you a shortcut for the next time.

## Generate CRUDL

Enhance CLI has a generator that will scaffold out these CRUDL routes for us.
Why didn't you tell us that in the first place you might ask?
In almost every app of any consequence most of this code will have to be modified to the unique requirements.
If you don't understand what it is doing you will be scared to touch it.
When that happens many developers look for some package they can `npm install` to meet the needs.
And that is one way dependencies grow exponentially.
It is valuable to understand what is happening.

