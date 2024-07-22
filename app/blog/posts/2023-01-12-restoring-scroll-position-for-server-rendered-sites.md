---
title: "Maintain scroll position across page loads without an SPA"
image: "/_public/blog/post-assets/scroll-restore/scroll.jpg"
category: uncategorized
description: "This post shows how to fix the problem of preserving scroll position across page reloads without the need to buy into a messy Single Page App (SPA) architecture."
author: "Ryan Bethel"
avatar: "ryanbethel.png"
mastodon: "@ryanbethel@indieweb.social"
published: "January 12, 2023"
---

![Ancient scroll in display case](/_public/blog/post-assets/scroll-restore/scroll.jpg)
Photo by [Taylor Flowe](https://unsplash.com/@taypaigey?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/scroll?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

### Get the SPA features you want with the ease of a server-rendered MPA

This post shows how to fix the problem of preserving scroll position across page reloads without the need to buy into a messy Single Page App (SPA) architecture.
If you want the TL;DR, skip to the solution at the end of this post.

Server-rendered apps, multi-page apps (MPA), and Server Side Rendering (SSR) have seen renewed interest lately.
All these jargon terms used to be just how the web worked. But as the web evolved, developers wanted their websites to feel more like native apps.
It just wasn’t cool anymore to have your whole page reload just because you clicked on an item in the sidebar.

For these reasons, the SPA was born.
If we treat the entire site as one page and load a ton of JavaScript to handle all interactions right inside that page, everything would surely be awesome.

> **Narrator:** *“It was not awesome”*.

![dangersome](/_public/blog/post-assets/scroll-restore/dangersome.gif)

The problem is we had to throw out lots of good things and start from scratch.
Out with `<a>`s and URLs in favor of client-side routers and a URL that does not reflect the actual state.
Out with battle-tested HTML `<form>`s in favor of DIY forms backed by complicated state management libraries.
These SPA architectures caused more problems than they solved with their increased complexity, required JavaScript, and resulting fragility.

I want to show that we can have some of those nice things that were the goal of SPAs, without having all the downsides.
One of those nice things is maintaining the scroll position.


![Mr. T with a scroll](/_public/blog/post-assets/scroll-restore/lets-scroll.webp)

## The Jumping Scroll Problem

Picture a content site with a sidebar to navigate the content.
As you scroll down the sidebar and click a link, it is nice to have the content show up but have the location in the sidebar not jump back to the top of the menu.
With an SPA you get this because you are likely only changing the center content.
But with a server-rendered app, the whole page is loading so by default your sidebar will jump up to the top again.
Bummer right?

![scroll bar jumps on reload](/_public/blog/post-assets/scroll-restore/scroll-jumping.gif)

This is a perfect opportunity for progressive enhancement.
Up to now, we could have built this content site with no JavaScript, making it fast, simple to build, and resilient.
And even with the jumping scroll problem, annoying as it is, the site works.
But with just a little bit of JavaScript, we can solve this problem.


## The Solution

To solve the scroll jumping we can monitor the `scrollTop` setting for the sidebar and restore that location if we reload the page.
[Enhance.dev](https://enhance.dev/) uses custom elements to build reusable components.
The `<docs-layout>` is one of those components.
One of the benefits of custom elements is that we can easily attach JavaScript progressive enhancement behavior in a script tag defining that element.


```html
<script type="module">
      class Layout extends HTMLElement {
        constructor() {
          super()
          let sidebar = this.querySelector('#sidebar')
          let top = sessionStorage.getItem('docs-sidebar-scroll')
          if (top !== null) {
            sidebar.scrollTop = parseInt(top, 10)
          }
          window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('docs-sidebar-scroll', sidebar.scrollTop)
          })
        }
      }
      customElements.define('docs-layout', Layout)
    </script>
```


When the JavaScript initializes it checks to see if a location was previously stored for the scroll.
If so it restores that location.
An event listener is set on the window using the `beforeunload` event trigger.
This event will fire just prior to navigating away from the page.
It stores the current location of the scroll using the `sessionStorage`.
Session storage works similarly to local storage except that it is only attached to that session (or tab in most browsers).
This means if you have multiple tabs open your scroll will be maintained independently in each tab.

![scroll bar restored on reload](/_public/blog/post-assets/scroll-restore/scroll-no-jump.gif)

With only 15 lines of code, we have fixed this scroll problem without buying into the whole SPA architecture with its many downsides.
Granted, this is only one of the reasons people choose SPAs.
But many of those reasons have similarly easy solutions, which we will explore in future blog posts.

[![You don't have to accept the broken ideas that your next project should be an SPA. It probably shouldn't. - Alex Russell, Twitter](/_public/blog/post-assets/scroll-restore/alex-russell-tweet.png)](https://twitter.com/slightlylate/status/1560020054971822080)


If this approach appeals to you give [enhance.dev](https://enhance.dev) a try. It is the easiest and best way to build functional web apps.
