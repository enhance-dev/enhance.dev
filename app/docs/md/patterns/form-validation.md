
---
title: Form Validation
---

HTML forms are very powerful on their own.
It does not take much markup to capture all kinds of data.
But for most applications we need to validate the data sent to avoid user error or intentional misuse.
This section covers validation best practices using Enhance. It includes:

- Client/Server Validation
- Handling Validation Problems with Session

Proper form validation usually includes both server side and client side together.
Client validation is fastest since it is closest to the user and can be done without posting data.
Server validation is most reliable since it cannot be circumvented as easily.

## Server Validation

For a simple form we could add validation logic ad-hoc directly in the handler.
But as the form grows that becomes unmaintainable.
As a best practice we recommend adding a data schema and validating requests against that schema.

## Data Validator

The `@begin/validator` will validate a form response against a given JSON schema.
The example below shows a how to integrate the validator into a data access layer that can be reused in multiple routes.

First we install the validator into the project.
```bash
npm i @begin/validator
```

In the Data Access layer we add a data schema for books (`/app/models/schema/books.mjs`).


```javascript
// /app/models/schema/books.mjs
export const Book = {
  "id": "Book",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "minLength": 1,
    },
    "author": {
      "type": "string",
    },
    "published": {
      "type": "boolean",
    },
    "key": {
      "type": "string"
    }
  }
}
```


The schema represents rules for the shape of the object we accept.

Now we can use the validator to check that the request matches the schema.
Below is data access layer that includes a validate function.

```javascript
// /app/models/books.mjs
import data from '@begin/data'
import { validator } from '@begin/validator'
import { Book } from './schemas/book.mjs'

const deleteBook = async function (key) {
  await data.destroy({ table: 'books', key })
  return { key }
}

const upsertBook = async function (book) {
  return data.set({ table: 'books', ...book })
}

const getBook = async function (key) {
  return data.get({ table: 'books', key })
}

const getBooks = async function () {
  const databasePageResults = await data.page({
    table: 'books',
    limit: 25
  })

  let books = []
  for await (let databasePageResult of databasePageResults) {
    for (let book of databasePageResult) {
      delete book.table
      books.push(book)
    }
  }

  return books
}

const validateBook = {
  shared (req) {
    return validator(req, Book)
  },
  async create (req) {
    let { valid, problems, data } = validate.shared(req)
    if (req.body.key) {
      problems['key'] = { errors: '<p>should not be included on a create</p>' }
    }
    // Insert your custom validation here
    return !valid ? { problems, book: data } : { book: data }
  },
  async update (req) {
    let { valid, problems, data } = validate.shared(req)
    // Insert your custom validation here
    return !valid ? { problems, book: data } : { book: data }
  }
}

export {
  deleteBook,
  getBook,
  getBooks,
  upsertBook,
  validateBook
}
```

The `@begin/validator` combines a few features:
  - It creates a nested object from the flat form key/values pairs.
  - It normalizes the values into numbers, booleans, floats, etc. based on the Schema.
  - It also validates the form against the schema and returns any errors in an object called `problems`.

We can use the data access in a typical route handler as follows:

```javascript
// /app/api/books.mjs
import { upsertBook, validate } from '../models/books.mjs'

export async function postBooks (req) {
  let { problems, book } = await validate.create(req)

  await upsertBook(book)
  return {
    location: '/books'
  }
}
```

The handler above is now running validation which returns any problems in the data.
But what do we do with them?

## Form Problems Loop

To close the loop on server-side validation we will need a way to maintain state between requests so that we can pass those problems back and forth and fix them.

We use the session to send those problems back to the front end so that the user has another chance to fix their inputs.

This is the process we will use for handling problems:
1. User submits form from `/books` that POSTS back to `/books`
2. The post handler runs `validate()` against the form values and gets a list of `problems`.
3. Post handler adds the problems to the session along with the initial values submitted (i.e.`session: {problems, book}`).
4. Post handler redirects back to `/books` by setting `location: '/books'` (with the above session set).
5. After being redirected GET API pulls the problems and book values off the session and sets them on `json` so that the page can display them.
6. HTML page uses the `state.store.problems` and `state.store.book` to restore the form where they left off with the problems highlighted.


The example below shows the full round trip of server validation.
The code is annotated with the steps.
It can be difficult to follow because the problems loop will pass through this API file several times if validation fails.


```javascript
// /app/api/books.mjs
import { upsertBook, validate } from '../models/books.mjs'

export async function get (req) {
  if (req.session.problems) {
  // 5. Back at the form we pull the problems and initial values off the session
    let { problems, book, ...session } = req.session
    return {
      session,
      // 6. The HTML page can get problems and initial values off the store
      json: { problems, book }
    }
  }

// 1. First user gets a blank form to fill out
//  return { }
}

export async function post(req) {
  const session = req.session
  // 2. Validate form inputs and return problems
  let { problems, book } = await validate.create(req)
  if (problems) {
    return {
    // 3. Problems and initial values added to session
      session: { ...session, problems, book },
      // Used for progressive enhancement next module
      json: { problems, book },
      // 4. Redirects back to the form with the above session
      location: '/books'
    }
  }

  // If validation is successful the problems and old values are removed from the session
  // eslint-disable-next-line no-unused-vars
  let { problems: removedProblems, book: removed, ...newSession } = session
  try {
    const result = await upsertBook(book)
    return {
      session: newSession,
      json: { book: result },
      location: '/books'
    }
  }
  catch (err) {
    return {
      session: { ...newSession, error: err.message },
      json: { error: err.message },
      location: '/books'
    }
  }
}
```

## Add Problems to HTML
To surface the problems in the frontend so that users can make adjustments we add the problems to the HTML page.

### Client-side Validation
As mentioned previously client side validation is the best way to intercept errors before they are ever sent to the server so we will setup the client side validation at the same time.
For this example both a `url` and `text` input are required for the book tree so we will add the `required` attribute to those inputs so the browser will check for that before even submitting.

Let's add the server side validation and client side validation to the page as follows:
1. Problems and initial form values pulled out of the store.
2. If the form is hidden by default (i.e. in summary/details) set it to open to show problems.
3. Form problem messages at the beginning of the form.
4. Error messages on each input with the custom element `error`
5. Set the `value` attributes with the previous state
6. Add client-side validation attributes to inputs


Here is the example code annotated with these changes.

```javascript
// /app/pages/books.mjs

export default function books({ html, state }) {
  const { store } = state
  // 1. Get Problems and values from the store
  const book = store.book || {}
  const problems = store.problems || {}

  return html`<enhance-page-container>
  <main>
    <h1>New book</h1>
    <enhance-form
  action="/books/${book.key}"
  method="POST">
${'' /* 3. Overall form error messages */}
  <div class="${problems.form ? 'block' : 'hidden'}">
    <p>Found some problems!</p>
    <ul>${problems.form}</ul>
  </div>
  <enhance-fieldset legend="Book">
${'' /* 4,5,6. Problems, initial values, and validation attributes added */}
  <enhance-text-input label="Title" type="text" id="title" name="title" value="${book?.title}" errors="${problems?.title?.errors}" required minlength=1 ></enhance-text-input>
  <enhance-text-input label="Author" type="text" id="author" name="author" value="${book?.author}" errors="${problems?.author?.errors}" required></enhance-text-input>
  <enhance-checkbox label="Published" type="checkbox" id="published" name="published" ${book?.published ? "checked" : ""} errors="${problems?.published?.errors}"></enhance-checkbox>
  <input type="hidden" id="key" name="key" value="${book?.key}" />
  <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
  </enhance-fieldset>
</enhance-form>
</main>
</enhance-page-container>
  `
}
```

