---
title: "On the sixth day of Enhancing: Head component"
image: "/_public/blog/post-assets/six-geese.jpg"
category: enhance, webdev, webcomponents
description: "Overriding the head component to provide social links"
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
mastodon: "@macdonst@mastodon.online"
published: "December 31, 2022"
---

![six geese](/_public/blog/post-assets/six-geese.jpg)
<small>Original photo by [Nick Fewings](https://unsplash.com/@jannerboy62) on [Unsplash](https://unsplash.com/photos/xORZNVE6DY0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
</small>

Welcome back. Things are looking much nicer after applying some styles yesterday. Let’s switch gears and add a function to create the `<head>` element for all pages in our project. In an Enhance app, this can be done in the `app/head.mjs` file.

Here’s the baseline functionality that is the default in an Enhance project:

```javascript
import { getStyles }  from '@enhance/arc-plugin-styles'

export default function Head() {
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
  ${ styles }
  <link rel="icon" href="/_public/favicon.svg">
</head>
  `
}
```


We’ll re-use much of this in a custom `app/head.mjs` file as we add more functionality.


```javascript
import { getStyles }  from '@enhance/arc-plugin-styles'

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
  <title>${ title }</title>
  ${ getStyles.styleTag() }
  <link rel="icon" href="/_public/favicon.svg">
</head>
  `
}
```


Here I’ve added the state argument and started destructuring its parts to create the page’s `<title>` from the current path.

We have access to other bits of state like the server’s return status code, any errors, and the entire store object returned from an API route middleware. So we can tailor our document to each request.

Additionally, I’ve opted to inline the style tag from arc-plugin-styles.

> As the logic in this file grows, it is encouraged to break out functionality into their own importable scripts. [See how app/templates/ are used in the Enhance.dev docs](https://enhance.dev/docs/learn/starter-project/head#templates-that-are-not-custom-elements).

While we’re here, let’s apply some global styles by adding a simple `<style>` tag:

```html
<style>
  body {
    margin: 0 auto;
    max-width: 80rem;
  }
</style>
```


Finally, I’ll add [a `<link rel=”me”>` tag](https://indieweb.org/rel-me) to the head for my Mastodon account


```html
<link rel="me" href="https://mastodon.online/@macdonst">
```


This will verify to other sites and services that this mastodon.online account belongs to the same owner of this Enhance project’s domain.

And the full, updated `app/head.mjs` file:

```javascript
import { getStyles } from '@enhance/arc-plugin-styles'

export default function Head({ req }) {
  const { path } = req
  const title = `My app — ${path}`

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  ${getStyles.styleTag()}
  <link rel="me" href="https://mastodon.online/@macdonst">
  <link rel="icon" href="/_public/favicon.svg">
  <style>
    body {
      margin: 0 auto;
      max-width: 80rem;
    }
  </style>
</head>
  `
}
```
