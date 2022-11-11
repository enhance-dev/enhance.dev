---
title: Enhance Routing
---

Enhance uses a file-system based router. When a file is added to the `pages` or `api` directory, it's automatically available as a route.

<doc-callout level="none" mark="🌱">

**[Read more about Enhance routing lifecycle →](/docs/learn/concepts/routing/lifecycle)**

</doc-callout>

## Dynamic Route Segments

To match a dynamic segment, you can use the `$segment` syntax. This allows you to match named parameters.

```
app/pages/docs/$lang.mjs → /docs/:lang → eg. (/docs/en)
app/pages/blog/$slug.mjs → /blog/:slug → eg. (/blog/hello-world)
app/api/users/$id.mjs → /users/:id → eg. (/users/axol)
```

<doc-callout level="none" mark="🍱">

**[Read more about dynamic route segments →](/docs/learn/concepts/routing/dynamic-routes)**

</doc-callout>

## Catch All Routes

To match all routes past a point in a URL, you can use the `$$` syntax.

```
app/pages/docs/$$.mjs → /docs/:path → eg. (/docs/concepts/routing/)
app/pages/docs/$$.mjs → /docs/:path → eg. (/docs/concepts/styling/)
```

<doc-callout level="none" mark="💰">

**[Read more about catch all routes →](/docs/learn/concepts/routing/catch-all-routes)**

</doc-callout>

## API Routes

Enhance API routes are backend JSON routes designed for seamless clientside progressive enhancement. API routes are defined under `app/api` and follow the same file based routing conventions as `app/pages`.

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

<doc-callout level="none" mark="📖">

**[Read more about API routes →](/docs/learn/concepts/routing/api-routes)**

</doc-callout>
