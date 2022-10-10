---
title: Enhance Lifecycle
---

<doc-callout level="info" mark="📍">

The journey of an HTTP request through Enhance isn't complicated, but it's helpful to understand how the final HTML document is assembled from the code you author in `app/`.

</doc-callout>

<doc-enhance-diagram class="block mb2">
</doc-enhance-diagram>

## Routing

When an HTTP request (GET, POST, etc.) is initiated by the browser, Enhance decides how to route it.
First checking for [a matching API function](/docs/learn/starter-project/api) and then [a Page](/docs/learn/starter-project/pages).

```
my-rad-app.net/login → app/api/login.mjs → app/pages/login.html
```

### Error Handling

If an error is encountered, either because no route match was found (`404`) or an internal exception (`500`) occurs, Enhance calls [the corresponding error function](/docs/learn/starter-project/404-errors).

## API Data Function

When a requested route has a matching [`app/api/` file](/docs/learn/starter-project/api), it is passed the request and executed first so that [the Store](/docs/learn/concepts/state/store) can be populated for [the matching Page](/docs/learn/starter-project/pages).

### Return JSON

If there is an API function, but no matching Page **or** the request's headers includes `Accept: application/json`, the result of the API function will be returned directly to the client as JSON with the correct headers.

<doc-callout level="tip" mark="{...}">

This is a great way to add JSON API endpoints to your Enhance app!
Even if those endpoints have an associated Page: requests that set `Accept: application/json` will get plain JSON without a Page render.

</doc-callout>

## App Page

Regardless of a matching API function, the matching [Page](/docs/learn/starter-project/pages) will be used.

```
my-rad-app.net/contact → app/pages/contact.[html|mjs]
```

### Custom Elements

Pages are the main entry point and usually contain one or more of your app's [custom elements](/docs/learn/concepts/single-file-components).  
Enhance will assemble the Page by recursively [expanding custom elements](/docs/learn/concepts/html/elements), using your single-file-components in the `app/elements/` directory.

If there is no custom element definition in `app/elements/`, Enhance will render it as is and move on.

## The Final Document

Enhance starts assembling HTML by running [your (optional) Head function](/docs/learn/starter-project/head) to create the top of the document and then appends all interpreted elements from your Page to the document's body.

### Stylesheet "Rollup"

If your custom element definitions include [`<style>` tags](/docs/learn/concepts/styling/element-styles), Enhance scopes those CSS declarations while combining them with other element styles into a single `<style>` element in the `<head>` tag.

### Client-Side JavaScript

Similar to the stylesheet process, Enhance gathers `<script>` tags from custom element definitions and inserts them just before the document's closing `</body>` tag.

#### Enhancements & Web Components

These `<script>`s are where you write the front end JavaScript to [progressively ***enhance*** your application](/docs/learn/practices/progressive-enhancement).

<doc-callout level="caution" mark="✨">

The yellow areas in the above diagram represent the JavaScript that will be run in a browser.  
To create the best starting point for the browser, in the fastest way possible, the rest of your code is executed on the server.

</doc-callout>

## Not Covered Here

This lifecycle description demonstrates the real-time journey of a request through Enhance's web server.  
It does not include static asset resolution (from `public/` via `_static/`), which has a separate lifecycle for even faster responses for non-dynamic content.
<!-- TODO: create a "Public" doc under "Starter Project" with a diagram and link here 👆 -->

Also, the core development process is not pictured here: [styles configuration](/docs/learn/concepts/styling/utility-classes#customize), the baked-in [`@bundles` feature](/docs/learn/practices/browser-modules), or deployment.
