---
title: Catch All Routes
---

Catch all routes are a special case of dynamic routes where the remainder of the path is matched by the wild card syntax `$$`.

## Example

Consider the following API `app/api/docs/$$.mjs`:

<doc-code filename="app/api/docs/$$.mjs">

```javascript
export async function get(req) {
  const { proxy } = req.pathParameters
  const pathSegments = proxy.split('/')
  return {
    json: { pathSegments },
  }
}
```
</doc-code>

Routes like `/docs/quickstart` or `/docs/learn/routing` will be matched by `app/api/docs/$$.mjs`.

### Precedence

Hard coded routes and dynamic routes take precedence over catch all routes. For example:

```
/docs/quickstart → app/pages/docs/quickstart.mjs
/docs/:filename → /docs/routing → app/pages/docs/$filename.mjs
/docs/:path → /docs/learning/concepts/custom → app/pages/docs/$$.mjs
```

