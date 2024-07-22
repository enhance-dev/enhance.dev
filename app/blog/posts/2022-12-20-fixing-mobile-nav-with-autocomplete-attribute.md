---
title: "Fixing mobile nav state with 'autocomplete=off': Obscure HTML attributes FTW"
image: "/_public/blog/post-assets/wrench.jpg"
category: uncategorized
description: "Mobile nav menu with a checkbox control has a problem when using the back button to navigate. We fix this using only HTML attributes."
author: "Ryan Bethel"
avatar: "ryanbethel.png"
mastodon: "@ryanbethel@indieweb.social"
published: "December 20, 2022"
---

![wrench](/_public/blog/post-assets/wrench.jpg)

<small>

Photo by [Tekton](https://unsplash.com/@tekton_tools?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/wrench?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

</small>

**Updated**:  February 08, 2023 to include the affects of `bfcache` (back/forward cache) on this solution.

I am a big believer in the power of HTML first development.
It is simpler, faster to build, and easier to maintain.
JavaScript has its place (mainly as a progressive enhancement), but it is not the first tool you should reach for.
We built the Enhance framework to make this way of building apps easier.

Building the [enhance.dev](https://enhance.dev) site, we used a checkbox for the mobile nav control.
This technique is not new and has been written about in lots of other places (i.e. [here](https://css-tricks.com/three-css-alternatives-to-javascript-navigation/#aa-alternative-3-the-css-only-hamburger-menu)).
But one edge case caused an annoying navigation problem.
If you open the mobile nav and follow a link, and then use the back button to return to the previous page, the mobile menu will be open.
This is because of the way form elements work in browsers.

![animation of broken nav menu](/_public/blog/post-assets/mobile-nav-broken.gif)

The input check box was checked when you navigated away, so the browser tries to help you when you return by restoring the state of that input.
This would usually be the desired behavior if this were a normal form.
It would allow the user to start where they left off.
But as a control for a mobile nav menu, this is very unexpected behavior.

My initial instinct was to fix this with JavaScript.
It is a simple problem that a few lines of code could fix.
But because I learned to think HTML first, I did some investigation to find a non-JavaScript solution.
There is a way! HTML inputs have an `autocomplete` attribute that has many useful settings.
We can set the value to `autocomplete=”off”` to solve this problem.
This tells the browser not to try to restore the checkbox state even when the back button is pressed.
Problem solved!

> **Note**: The `bfcache` (back/forward cache) in some browsers can interfere with this `autocomplete` setting. This fix works for Enhance/Begin/Architect projects because they set the `Cache-Control:no-store` header for HTML content which blocks the `bfcache`.



```html
<input
  id="burger-control"
  class="absolute opacity-0 z-1"
  type="checkbox"
  name="open-burger"
  autocomplete="off"
  aria-label="Open navigation" />
```

![fixed mobile nav menu](/_public/blog/post-assets/mobile-nav-fixed.gif)

Ok, so the `autocomplete` attribute is not that obscure but using it to fix this edge case was not easy to google for,
so I am putting it out here for anyone trying to do the same (also for future me).
The other lesson here that was reinforced for me is never to count HTML and CSS out.
MDN Docs are your friend.
Whenever I think I need to reach for JavaScript to solve a problem, I question that assumption and spend just a few minutes looking for another solution.
It doesn’t always work, but when it does, your app will be better for it.
Better how you ask:

* Faster - No JavaScript means no waiting until JavaScript loads.
* More robust - No fragile code connecting by ids or `querySelector`.
* Simpler - An attribute directly on the HTML is collocated and with the thing it controls.
