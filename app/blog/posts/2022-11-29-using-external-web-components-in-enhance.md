---
title: "Using External Web Components with Enhance"
image: '/_public/blog/post-assets/vanilla-ice-cream.jpg'
category: uncategorized
description: "We love building web components with Enhance, but we realize that sometimes you may need to pull one off the shelf to include in your app. Follow along to see how to add a Vanilla JS web component to your Enhance app."
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
published: 'November 29, 2022'
---

![A bowl of vanilla ice cream](/_public/blog/post-assets/vanilla-ice-cream.jpg)
<small>Original photo by [Bon Vivant](https://unsplash.com/@bonvivant) on [Unsplash](https://unsplash.com/s/photos/vanilla-ice-cream)</small>

We love building web components with Enhance, but we realize that sometimes you may need to pull one off the shelf to include in your app. Follow along to see how to add a Vanilla JS web component to your Enhance app.

## VanillaWC

[VanillaWC](https://github.com/vanillawc) touts itself as:

> An open-source collection of Web Components implemented in vanilla JavaScript

I like that VanillaWC has no extra layers of abstraction between you and the web components. That means no dependencies and no additional build steps. It's like they are speaking our language. For this blog post, we will focus on [`wc-social-link`](https://github.com/vanillawc/wc-social-link), which enables you to add links to your GitHub, LinkedIn, Twitch, etc., to your page.

## Option 1: CDN

The easiest way to include the social link component on a page is to load it remotely from a CDN at runtime. For example:

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/gh/vanillawc/wc-social-link@1/index.js">
</script>
<wc-social-link
  network="github"
  handle="enhance-dev">
</wc-social-link>
```

That will add a GitHub icon to your page that links to the Enhance organization on GitHub.

Pretty easy, right? However, if you have added a [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP#:~:text=Content%20Security%20Policy%20(CSP)%20is,site%20defacement%2C%20to%20malware%20distribution.) to your app, and you should, then you may not want to add a remote domain to your allow list.

## Option 2: Bundling

Instead of trusting a 3rd party domain, we'll install `wc-social-link` locally by running:

```bash
npm install @vanillawc/wc-social-link
```

The `wc-social-link` project ships with a nice entry point for a bundle. We will bundle and expose `wc-social-link`'s main index file as `wc-social-link` by updating .arc with:

```arc
@bundles
wc-social-link './node_modules/@vanillawc/wc-social-link/src/wc-social-link.js'
```

Then you would load the web component from it's bundled path in your page:

```html
<script type="module" src="/_public/bundles/wc-social-link.mjs"></script>
<wc-social-link
  network="github"
  handle="enhance-dev">
</wc-social-link>
```

## Next Steps

Well, getting a web component written by a 3rd party into your Enhance app wasn't too difficult. The downside is this component only works with client-side rendering. Next week we'll show you how to refactor components like this so they can be server-side rendered and enhanced with client-side JS.

