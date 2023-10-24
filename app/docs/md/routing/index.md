---
title: Routing
---

Page and API routes in Enhance applications are built from the file system of your project.

Adding a route is as straightforward as adding a page to `app/pages`, or an API handler to `app/api`. For example:

| File in project | URL in application |
| - | - |
| `app/pages/index.html` | `/index` |
| `app/pages/products.html` | `/products` |
| `app/pages/about/team.html` | `/about/team` |
| `app/api/products.mjs` | `/products` |

In the above example, note that the page route `/products` and the API route `/products` resolve to the same path in your application. This means that any data returned by the `/products` API route will be made available to the `/products` page route (and any Enhance Elements rendered within it).

<doc-callout level="none" mark="🔁">

**[Read more about Enhance’s routing lifecycle](/docs/routing/lifecycle)**

</doc-callout>

## Dynamic routes

A dynamic route is a route in which a specific segment of the route (known as a dynamic segment) can be matched by a number of URLs.

To create a dynamic route, use the `$segment` syntax in naming your page or API route.

| File in project | Example matching URLs |
| - | - |
| `app/pages/users/index.html` | `/users` |
| `app/pages/users/$id.html` | `/users/axol` <br /> `/users/boltzmann` <br /> … |
| `app/api/users/$id.mjs` | `/users/axol` <br /> `/users/boltzmann` <br /> … |

The matched URL segments in the above examples are exposed to your API routes via the `request.pathParameters` object, allowing you to use this dynamic data in constructing your response.

<doc-callout level="none" mark="🍃">

**[Read more about dynamic routes](/docs/routing/dynamic-routes)**

</doc-callout>

## Catch all routes

A catch all route is a dynamic route in which an arbitrary number of URL segments will be matched by the page or API route.

To create a catch all route, use the `$$` syntax in naming your page or API route.

| File in project | Example matching URLs |
| - | - |
| `app/pages/products/index.html` | `/products` |
| `app/pages/products/$$.html` | `/products/featured` <br /> `/products/outerwear/coats` <br /> `/products/sale/accessories/shirts` <br /> … |
| `app/api/products/$$.mjs` | `/products/featured` <br /> `/products/outerwear/coats` <br /> `/products/sale/accessories/shirts` <br /> … |

As with dynamic routes, the matched URL segments in the above examples are exposed to your API routes via the `request.pathParameters` object.

<doc-callout level="none" mark="🌳">

**[Read more about catch all routes](/docs/routing/catch-all-routes)**

</doc-callout>

## API routes

Enhance’s API routes are backend JSON routes designed for seamless client-side progressive enhancement. API routes are defined under `app/api` and follow the same file system routing conventions as `app/pages`.

<doc-code filename="api/index.mjs">

```javascript
export async function get (req) {
  return {
    json: {
      favorites: ['coffee crisp', 'smarties']
    }
  }
}
```
</doc-code>

<doc-callout level="none" mark="🌱">

**[Read more about API routes](/docs/routing/api-routes)**

</doc-callout>
