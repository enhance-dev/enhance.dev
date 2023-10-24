---
title: Catch All Routes
---

A catch all route is a dynamic route in which an arbitrary number of URL segments will be matched by the page or API route.

To create a catch all route, use the `$$` syntax in naming your page or API route.

## Example

Consider an API route stored in your project as `app/api/docs/$$.mjs`:

<doc-code filename="app/api/docs/$$.mjs">

```javascript
export async function get(req) {
  const { proxy } = req.params
  const pathSegments = proxy.split('/')
  return {
    json: { pathSegments },
  }
}
```
</doc-code>

Because catch all routes don’t have explicitly labeled dynamic segments, your request’s path parameters object will contain a `proxy` key whose value is a string containing the matching path segments. For example:

| API route | Example URL | `req.params` |
| - | - | - |
| `app/api/docs/$$.mjs` | `/docs/conventions` | `{ proxy: 'docs/conventions' }`
| `app/api/docs/$$.mjs` | `/docs/conventions/structure` | `{ proxy: 'docs/conventions/structure' }`
| `app/api/docs/$$.mjs` | `/docs/routing/api-routes/middleware` | `{ proxy: 'docs/routing/api-routes/middleware' }`

## Route precedence

Static routes and [dynamic routes](/docs/routing/dynamic-routes) take precedence over catch all routes.

For example, consider a project with the following API routes:

- `app/api/docs/index.mjs`
- `app/api/docs/$slug.mjs`
- `app/api/docs/$$.mjs`

| Example URL | Handler |
| - | - |
| `/docs/index` | `app/api/docs/index.mjs` |
| `/docs/conventions` | `app/api/docs/$slug.mjs` |
| `/docs/routing` | `app/api/docs/$slug.mjs` |
| `/docs/routing/api-routes` | `app/api/docs/$$.mjs` |
