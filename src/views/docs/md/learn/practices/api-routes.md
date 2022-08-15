---
title: API Routes
---

Enhance API Routes are backend JSON routes designed for seamless clientside progressive enhancement. API routes are defined under `app/api` and follow the same file based routing conventions as `app/pages`. JSON response values from API routes are automatically passed to coresponding page routes.

API routes are designed to simultaneously handle requests made for `text/html` and `application/json`.

## Request 

API routes always receive a `request` object:

| key     | type     | description
|---------|----------|-------------
| body    | `object` | Automatically parsed if present; `{}` if request has no body
| method  | `string` | HTTP method of the request: `GET`, `POST`, `PATCH`, `PUT`, or `DELETE`
| params  | `object` | URL params (e.g. product in `/app/api/shop/$product.mjs`); `{}` if request has no params
| path    | `string` | Root-relative path of the URL being requested
| query   | `object` | Querystring params present in the client request; `{}` if request has none
| session | `object` | Read the request cookie session; `{}` when empty

## Response

API routes always return a `response` object:

| key          | type     | description
|--------------|----------|-------------
| json         | `object` | Plain JS object that will returned as a JSON response (or initial state for `text/html` requests)
| location     | `string` | Redirect path to send client
| statusCode   | `number` | Sets the HTTP status code (aliases: `code`, and `status` )
| cacheControl | `string` | Sets the `cache-control` header
| headers      | `object` | Explicitly set response headers
| session      | `object` | Write the session

## `GET` Lifecycle

1. Browser requests `GET /foobar`
2. API Route `app/api/foobar.mjs` that exports a `get` handler is invoked
3. The resulting value from the API Route handler is used to initialize component state in `app/pages/foobar.html`

```javascript
// app/api/foobar.mjs
export async function get (request) {
  return {
    json: { message: 'hello world' }
  }
}
```

## `POST` Lifecycle 

1. Browser requests `POST /contact`
2. API Route `app/api/contact.mjs` that exports a `post` handler is invoked
2.1 If the request is `text/html` the API route will respond with a redirect to `/?success=true`
2.2 If the request is `application/json` the API route will respond with JSON

```javascript
// app/api/contact.mjs
export async function post (request) {
  return {
    location: '/?success=true',
    json: { message: 'successfully registered' }
  }
}
```

## Other HTTP Verbs

Enhance API routes support other HTTP verbs such as `PUT`, `PATCH`, and `DESTROY`; these route handlers should return JSON values as browser HTML forms cannot issue these sorts of HTTP requests.

## Advanced API routes

- when to redirect
- working with session
- talking to a third party api
- talking to DynamoDB
