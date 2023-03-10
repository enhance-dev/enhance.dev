---
title: Head
---

The `<head>` tag is a very important point of customization for your app. You are going to want to add things like a custom title, favicons, social open graph meta, etc.

However, the `<head>` tag *is not a Custom Element*. Furthermore it cannot contain Custom Elements. There are only a subset of existing pre-defined HTML tags that can be included in the `<head>` tag.

As Custom Elements are elements that you the user define they are not included in this pre-defined set of HTML tags.

<doc-callout level="none" mark="💀">

**[Read more about the `<head>` tag here →](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML)**

</doc-callout>

## Default Head component

Enhance projects come with a default Head component to get you started, but we expect you’ll need to make changes to it. By default, we include [a meta tag for character encoding](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-charset), [a viewport meta tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag), an empty [document title element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title), a default favicon, and the [Enhance Styles utility class system](/docs/learn/concepts/styling).

### Override the default

You can customize the contents of the Head component by editing the included `app/head.mjs` file in your project. We recommend the following content at a minimum (though you may choose not to include [Enhance Styles’ `getStyles` function](/docs/learn/concepts/styling/utility-classes#getstyles) if you prefer to use a different set of styles):

<doc-code filename='app/head.mjs'>

```js
import { getStyles }  from '@enhance/arc-plugin-styles'

export default function Head () {
  const styles = process.env.ARC_LOCAL
    ? getStyles.linkTag()
    : getStyles.styleTag()

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title></title>
      ${styles}
      <link rel="icon" href="/_public/favicon.svg">
    </head>
  `
}
```

</doc-code>

Since the `<head>` tag *is not a Custom Element, nor can it be,* the arguments passed to `head.mjs` are not the same as Elements in your Enhance project.

Since the `html` function passed to Elements is used to expand Custom Elements, which are not allowed inside the `<head>` tag, there is no reason to pass it as an argument. Instead your `head.mjs` template will be passed a `state` object containing:
- store: [The API data mapped to the current page](/docs/learn/concepts/routing/api-routes)
- req: [A standard request Object](/docs/learn/concepts/routing/api-routes#request)
- error: An error message if an error has occurred so you can message your site's users
- status: A status code to enable you to do the correct handling

The example below demonstrates using some of these properties:

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

<doc-callout level="none" mark="🚏">

**[Read more about the `req` request object →](/docs/learn/concepts/routing/api-routes#request)**

</doc-callout>

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
