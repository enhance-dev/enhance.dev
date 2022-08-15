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

<doc-callout level="note">

### note

Wouldn’t it be nice if you could author components like HTML pages? Well that’s what you get with enhance single file components.

</doc-callout>

<doc-callout level="tip">

### tip

Add functionality to your component by adding a `<script>` tag. You can either author JavaScript directly in this script tag or link to an external source. The `/public` folder in enhance projects is preconfigured to serve files from `/_static`.

</doc-callout>

<doc-callout level="info">

### info

Enhance API routes support other HTTP verbs such as `PUT`, `PATCH`, and `DESTROY`; these route handlers should return JSON values as browser HTML forms cannot issue these sorts of HTTP requests.

</doc-callout>

<doc-callout level="caution">

### caution

Enhance API Routes are backend JSON routes designed for seamless clientside progressive enhancement. API routes are defined under app/api and follow the same file based routing conventions as app/pages. JSON response values from API routes are automatically passed to coresponding page routes.

</doc-callout>

<doc-callout level="danger">

### danger

- when to redirect
- working with session
- talking to a third party api
- talking to DynamoDB

</doc-callout>
