---
title: Head
---

## Special purpose

The `<head>` tag is a very important point of customization for your app. You are going to want to add things like a custom title favicons, social open graph meta etc.

<doc-callout level="none" mark="💀">

**[Read more about the `<head>` tag here →](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML)**

</doc-callout>

## Not headless

Enhance projects come with basic default head content to get you started.  
The default head content below is the bare minimum and should be the basis for your own customizations.

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title></title>
  <link rel="stylesheet" href="/_static/styles.css">
  <link rel="icon" href="/_static/favicon.svg">
</head>
```

## Override the default

To supply your own custom head content add a file `/app/head.mjs` to your project.
This head template is not a custom element it is an override of a built in document tag so the format is similar, but a little different.

Your `/app/head.mjs` accepts a `req` object as it's single argument

```javascript
export default function Head(req={}) {
  const { path } = req
  const title = `My app — ${path}`
  return `
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title></title>
      <link rel="stylesheet" href="/_static/styles.css">
      <link rel="icon" href="/_static/favicon.svg">
    </head>
  `
}
```

Since you have access to the entire `req` object you can populate your head with information about app state that it contains.

<doc-callout level="none" mark="🚏">

**[Read more about the `req` object →](/docs/learn/practices/api-routes)**

</doc-callout>
