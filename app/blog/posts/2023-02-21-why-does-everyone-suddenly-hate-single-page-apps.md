---
title: Why does everyone "suddenly" hate Single Page Apps?
image: "/_public/blog/post-assets/packed-closet.jpg"
image_alt: Packed closet
image_site: Unsplash
image_site_url: https://unsplash.com/photos/HXVMKvaPNqg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
photographer: Jamesthethomas5
photographer_url: "https://unsplash.com/@jamesthethomas5?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
category: SPA
description: "My thoughts on the recent backlash against Single Page Applications"
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
mastodon: "@macdonst@mastodon.online"
published: "February 21, 2023"
---

If you’ve been on the internet the past couple of weeks, you may have noticed a sudden spike in articles decrying Single Page Applications (SPA). The inciting incident was when Guillermo Rauch, the creator of Next.js and CEO of Vercel, tweeted:

[![SPAs were a zero interest rate phenomenon](/_public/blog/post-assets/spa-zero-interest-rate.png)
](https://twitter.com/rauchg/status/1619492334961569792?s=20)

As of this writing, that tweet has over 241 thousand views, which led to a firestorm of comments and blog articles.

Then a week later, on February 4th, [Alex Russell](https://mastodon.online/@slightlyoff@toot.cafe) published [The Market for Lemons](https://infrequently.org/2023/02/the-market-for-lemons/), which poured gasoline on the fire. In Alex’s excellent post he points out that the promise of SPAs and the frameworks used to build them have not been delivered. In fact, many folks are worse off due to the complexity that these frameworks opt you into and the staggering amount of JavaScript they require to recreate functionality already available in the browser.

Alex goes a bit too far when he assigns ill intent to the purveyors of these frameworks. He may be making the [fundamental attribution error](https://en.wikipedia.org/wiki/Fundamental_attribution_error) as none of us are immune to cognitive biases.

In response we have seen a plethora of blog posts like:

* [The case for frameworks](https://seldo.com/posts/the_case_for_frameworks) by [Laurie Voss](https://alpaca.gold/@seldo)
* [Why I'm not the biggest fan of Single Page Applications](https://www.matuzo.at/blog/2023/single-page-applications-criticism/) by [Manuel Matuzović](https://front-end.social/@matuzo)
* [Rethinking the Modern Web](https://dev.to/oxharris/rethinking-the-modern-web-5cn1) by [Oxford Harrison](https://dev.to/oxharris)
* [The (extremely) loud minority](https://andy-bell.co.uk/the-extremely-loud-minority/) by [Andy Bell](https://bell.bz/@andy)
* [What to expect from your framework](https://johan.hal.se/wrote/2023/02/17/what-to-expect-from-your-framework/) by [Johan Halse](https://ruby.social/@hejsna)
* And many others…

However, questioning SPAs as the way to build web applications is not a new phenomenon. Almost a year ago, [Nolan Lawson](https://toot.cafe/@nolan) wrote [two](https://nolanlawson.com/2022/05/21/the-balance-has-shifted-away-from-spas/) [posts](https://nolanlawson.com/2022/05/25/more-thoughts-on-spas/) detailing why your next application may not need to be a SPA. Nolan is one of many who have questioned the veracity of building a SPA to solve every problem over the past 10 years.

## Am I stupid for building a SPA?

No, of course not.

You are stupid for that one piece of clothing in the back of your closet that you couldn’t pull off even though you convinced yourself you could. Since you spent way too much money on it, you can’t bear to give it away or donate it. That’s called the [sunk cost fallacy](https://en.wikipedia.org/wiki/Sunk_cost#Fallacy_effect). Just get rid of it — you’ll feel better and have more room in your closet, but hey, I don’t know your life.

![East Bound and Down](/_public/blog/post-assets/east-bound-and-down.webp)

Neither do I know what constraints you are operating under. You might be great at building SPAs, or there are some technology choices at work that you need to live with…for now. Don’t let anyone make you feel bad for doing your best job. It’s exceedingly hard to keep on top of all the new developments in technology and the pace is only accelerating.

## How did SPAs become popular?

A little over a decade ago, I worked on the open-source project [Apache Cordova/Adobe PhoneGap](https://cordova.apache.org/), first at IBM and later at Adobe. Apache Cordova enables you to build mobile applications using HTML, CSS and JavaScript while targeting multiple platforms with one code base. In today’s technology landscape, mobile is dominated by iOS and Android. In the early 2010’s we were awash in mobile platforms from BlackBerry, Microsoft, Firefox, Tizen, etc. Targeting multiple platforms, including the web, from one codebase was a game changer for overworked development teams.

When targeting these mobile platforms, you would package your HTML, CSS and JavaScript into the binary downloaded from the various app stores. Then your application would only request data over the network. Since this hybrid application was running in a web view container on your phone, not a web browser, your files were loaded from disk and not served from a web server.

![Cordova App Architecture](/_public/blog/post-assets/cordovaapparchitecture.png)

This architecture necessitated duplicating functionality provided by your web browser and web server. For example, browsers handle page navigation using anchor tags, while SPAs need a client-side router to hide and show your HTML views and don’t even get me started on back button behavior.

That was the exact best use case for the SPA architecture. The phones of a decade ago are not the multi-core behemoths they are today. Without the SPA architecture, your device would need to load, parse and execute the JavaScript on each page. On low-end Android phones, this led to a terrible user experience. With the SPA architecture, the JavaScript was only loaded once at startup, often behind a startup screen, to get around this performance hit.

The other key point about this approach is that a lot of the browser API’s we enjoy today didn’t exist back then, like geolocation, taking pictures and notifications. Without the hybrid approach, the web would have looked like a second-class citizen next to native applications.

## So should I still build SPAs?

No, probably not, but that’s just my personal opinion.

Today’s modern multi-page applications (MPA) have access to way more capabilities than ever before, reducing the need to build a SPA to give you that native-like application feeling.

* Back/Forward caching makes navigating between pages of your application faster than ever.
* Offline support is possible with service-workers
* Web Components provide a reusable UI component layer

## It’s time to clean out your closet

![Clean closet](/_public/blog/post-assets/clean-closet.jpg)
<small>Photo by <a href="https://unsplash.com/@elcarito?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">elCarito</a> on <a href="https://unsplash.com/photos/fouVDmGXoPI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></small>

Not unlike that embarrassing hoodie, you know the one I’m talking about, it’s the one with all the holes and all those stains. It’s time to re-evaluate the tools and frameworks you use to build web applications. Do you need to use these frameworks that reproduce what the web platform already gives you? Maybe it’s time to transition away from them like that pair of jeans that hasn’t fit you since before COVID?

## Where do we go from here?

Earlier, I mentioned that it is hard to keep on top of everything, and that’s why we’ve decided not to chase JavaScript frameworks anymore and instead focus on the web platform. You can read more about our approach in my post on [Why we Server Side Render Web Components](https://staging.begin.com/blog/posts/2023-02-10-why-we-ssr-web-components).

> Slow is smooth.
> Smooth is fast.
>
> US Navy SEALs

There are so many remarkable new approaches like [Astro](https://astro.build/), [Qwik](https://qwik.builder.io/docs/overview), [11ty](https://www.11ty.dev/) and [Enhance](https://enhance.dev/) built around HTML-first promise that leverages the platform. If you decide to try out Enhance, please let us know what you think, as we’d love the feedback. Follow us on [Mastodon](https://fosstodon.org/@enhance_dev) and join our [Discord](https://enhance.dev/discord).
