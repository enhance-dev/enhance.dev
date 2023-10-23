---
title: Dynamic Routes
---

Predefined routes are not always sufficient for complex applications. This is where dynamic routes come in.

A dynamic route is a route in which a specific segment of the route (known as a dynamic segment) can be matched by a number of URLs. In Enhance applications, dynamic routes are created using the `$segment` syntax when naming your page or API route.


## Example

Consider an API route stored in your project as `app/api/users/$id.mjs`:

<doc-code filename="app/api/users/$id.mjs">

```javascript
export async function get (req) {
  const { id } = req.params
  const user = getUser(id)
  return {
    json: {
     user
    }
  }
}
```
</doc-code>

In the above example, the `users/$id.mjs` API route will match any URL pointing to `/users/*`.

The dynamic segment of the URL will be made availble to the API handler as a path parameter, named by the key following the `$` in the filename (in this case: `id`). For example:

| API route | Example URL | `req.params` |
| - | - | - |
| `app/api/users/$id.mjs` | `/users/axol` | `{ id: 'axol' }` |
| `app/api/users/$id.mjs` | `/users/42` | `{ id: '42' }` |
| `app/api/frameworks/$name.mjs` | `/frameworks/enhance` | `{ name: 'enhance' }` |

<doc-callout level="info">

Data returned on the API response’s `json` object (such as the `user` object in the example above) will be made available to pages and Enhance Elements that match the API route’s path (e.g. `app/pages/users/$id.html`) via [`state.store`](/docs/elements/state/store).

</doc-callout>

<doc-callout level="tip">

You can also access this data by hitting this API route with a client side network request (providing you include an `Accept: application/json` [header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept) in the request).

</doc-callout>

## Using multiple path parameters

Enhance supports multiple path parameters. For example:

| Route | Example URL | `req.params` |
| - | - | - |
| `app/api/docs/$lang.mjs` | `/docs/en` | `{ lang: 'en' }` |
| `app/api/docs/$lang/$region.mjs` | `/docs/en/us` | `{ lang: 'en', region: 'us' }`

## Route precedence

Static routes take precendence over dynamic routes.

For example, consider a project with the following API routes:

- `app/api/docs/quickstart.mjs`
- `app/api/docs/$slug.mjs`

| Example URL | Handler |
| - | - |
| `/docs/quickstart` | `app/api/docs/quickstart.mjs` |
| `/docs/glossary` | `app/api/docs/$slug.mjs` |

