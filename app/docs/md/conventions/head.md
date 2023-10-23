---
title: Head
---

The `<head>` tag is a very important point of customization for your app, allowing you to add things like a page titles, favicons, social/Open Graph metadata, etc.

However, the `<head>` tag *is not a Custom Element*. Furthermore, it cannot contain Custom Elements. This is because — as defined by the HTML spec — only a subset of existing HTML tags are permitted in the `<head>` tag. As Custom Elements are elements which are defined by HTML authors, they are not included in this subset of permitted tags.

<doc-callout level="none" mark="💀">

**[Read more about the `<head>` tag on MDN →](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML)**

</doc-callout>

## Default Head component

Enhance projects come with a default Head component to get you started, but we expect you’ll need to make changes to it. By default, we include [a meta tag for character encoding](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-charset), [a viewport meta tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag), an empty [document title element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title), a default favicon, and the [Enhance Styles utility class system](/docs/enhance-styles).

### Override the default

You can customize the contents of the Head component by editing the included `app/head.mjs` file in your project. We recommend the following content at a minimum (though you may choose not to include [Enhance Styles’ `getStyles` function](/docs/enhance-styles/utility-classes#getstyles) if you prefer to use a different set of styles):

<doc-code filename='app/head.mjs'>

```js
import { getStyles }  from '@enhance/arc-plugin-styles'

const { linkTag } = getStyles

export default function Head () {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title></title>
      ${linkTag()}
      <link rel="icon" href="/_public/favicon.svg">
    </head>
`
}
```

</doc-code>

Since the `<head>` tag *is not a Custom Element, nor can it be,* the arguments passed to `head.mjs` are not the same as Elements in your Enhance project.

Since the `html` function passed to Elements is used to expand Custom Elements, which are not allowed inside the `<head>` tag, the Head component does not take the `html` function as an argument. Instead, your `head.mjs` template will be passed a `state` object containing:
- store: [The API data mapped to the current page](/docs/elements/state/store)
- req: [A standard request Object](/docs/routing/api-routes#request)
- error: An error message if an error has occurred so you can message your site's users
- status: A status code to enable you to do the correct handling

The example below demonstrates using some of these properties:

<doc-code filename='app/head.mjs'>

```javascript
import { getLinkTag } from '@enhance/arc-plugin-styles/get-styles'

export default function Head(state) {
  const { store, status, req, error } = state
  const { path } = req
  const title = `My app — ${path}`
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${title}</title>
      ${getLinkTag()}
      <link rel="icon" href="/_public/favicon.svg">
    </head>
  `
}
```

</doc-code>

<doc-callout level="none" mark="🚏">

**[Read more about the `req` request object →](/docs/routing/api-routes/#request)**

</doc-callout>

## Automatic handling of `body` and `html` tags

The Head component automatically handles creating an opening `body` tag if one is not declared in the template string it returns. However, if you would like to declare your own opening `body` tag (for example, to include a CSS class on every page of your app), the Head component will accommodate this too! For example:

<doc-code filename='app/head.mjs'>

```javascript
export default function Head(state) {
  /* … */
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <!-- … -->
    </head>
    <body class="font-sans leading3">
  `
}
```

</doc-code>

Additionally, Enhance will automatically render a closing `html` tag on every page, so there’s no need to include this in any of your own code.

## Templates that are not Custom Elements

You are not limited to using Custom Elements when rendering your document server-side. You can define a template for pre-defined HTML tags as follows:

<doc-code filename="/app/templates/twitter-meta.mjs">

```javascript
export default function TwitterMeta(state) {
  const { title, description, image, card } = state
  return `
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${image}">
    <meta name="twitter:card" content="${card}">
  `
}
```

</doc-code>

You can then use this meta content template in your `head.mjs` like so:

<doc-code filename="/app/head.mjs">

```javascript
import { getLinkTag } from '@enhance/arc-plugin-styles/get-styles'
import TwitterMeta from './templates/twitter-meta.mjs'

export default function Head(state) {
  const { store, status, req, error } = state
  const { path } = req
  const title = `My app — ${path}`
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${TwitterMeta(store)}
      <title>${title}</title>
      ${getLinkTag()}
      <link rel="icon" href="/_public/favicon.svg">
    </head>
  `
}
```
</doc-code>
