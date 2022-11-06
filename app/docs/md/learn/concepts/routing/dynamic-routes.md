---
title: Dynamic Routes
---

Predefined paths are not always enough for complex applications. In Enhance you can add `$` to a `page` or `api` filename to create a dynamic route.

## Example

Consider the following api `app/api/users/$id.mjs`:

<doc-code filename="app/api/users/$id.mjs">

```javascript
export async function get (req) {
  const { id } = req.pathParameters
  const user = getUser(id)
  return {
    json: {
     user
    }
  }
}
```
</doc-code>

Routes like `/users/axol` or `/users/admin` will be matched by `app/api/users/$id.mjs`. The `user` JSON object will be returned to the caller if the request's headers include `Accept: application/json` otherwise the route will call `app/pages/users/$id.mjs` if the file exists.

### Multiple Path Parameters

Enhance supports multiple path parameters. The page `app/pages/docs/$lang/$region.mjs` would match the following urls `/docs/en/us`, `/docs/fr/ca` and `/docs/fr/fr`.

```
app/pages/docs/$lang.mjs → /docs/:lang → eg. (/docs/en)
app/pages/docs/$lang/$region.mjs → /docs/:lang/:region → eg. (/docs/en/us/)
```

### Precedence

Hard coded routes take precedence over dynamic routes. For example:

```
/docs/quickstart → app/pages/docs/quickstart.mjs
/docs/routing → app/pages/docs/$slug.mjs
```
