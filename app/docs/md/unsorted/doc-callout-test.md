---
title: test for doc-callout elem
---

`doc-callout` experiments

## A `<doc-callout>` Custom Element

This 👇 code block is rendered and highlighted on the server with arcdown + hljs.

```html
<doc-callout level="info" mark="🤘">
```

<hr class="block mt3 mb3 border1" />

<doc-callout>

### note (default)

Wouldn’t it be nice if you could author components like HTML pages? Well that’s what you get with Enhance single-file components.

</doc-callout>

<doc-callout level="tip">

### tip

Add functionality to your component by adding a `<script>` tag. You can either author JavaScript directly in this script tag or link to an external source. The `/public` folder in Enhance projects is preconfigured to serve files from `/_public`.

</doc-callout>

<doc-callout level="info">

### info

Enhance API routes support other HTTP verbs such as `PUT`, `PATCH`, and `DESTROY`; these route handlers should return JSON values as browser HTML forms cannot issue these sorts of HTTP requests.

</doc-callout>

<doc-callout level="caution">

### caution

Enhance API Routes are backend JSON routes designed for seamless client-side progressive enhancement. API routes are defined under app/api and follow the same file-based routing conventions as app/pages. JSON response values from API routes are automatically passed to corresponding page routes.

</doc-callout>

<doc-callout level="danger">

### danger

- when to redirect
- working with session
- talking to a third party api
- talking to DynamoDB

</doc-callout>

<doc-callout level="none" mark="👻">

### none

Understanding how to pass and use state is fundamental to building a successful application.
Luckily Enhance sets you up for success by preconfiguring your app to pass state in a reliable way.

</doc-callout>

<hr class="block mt3 mb3 border1" />

Empty "mark", set `mark="none"`.

<doc-callout level="danger" mark="none">

Not all things need emoji. Most things do, but not all.

</doc-callout>

<hr class="block mt3 mb3 border1" />

Callouts can be "thin", too. Add an empty `thin` attribute.

<doc-callout level="info" thin>

This style is good for one-liners

</doc-callout>

<hr class="block mt3 mb3 border1" />

## `<doc-link-callout>` Test

### Source

```html
<doc-link-callout link="/docs/learn/concepts/api-routes" mark="🛣">
  Read about `api` routes
</doc-link-callout>
```

### Tests

<doc-link-callout link="/docs/learn/concepts/api-routes" mark="🛣">

Read about `api` routes

</doc-link-callout>
