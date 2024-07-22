---
title: "Introducing the Enhance Performance Budget Plugin"
image: "/_public/blog/post-assets/measuring-tape.jpg"
image_alt: "measuring tap"
photographer: "charlesdeluvio"
photographer_url: "https://unsplash.com/@charlesdeluvio?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
category: enhance, performance
description: "Taking performance to heart with development time performance budget monitoring."
author: 'Simon MacDonald'
avatar: 'simon.png'
mastodon: "@macdonst@mastodon.online"
published: "October 3, 2023"
---

Over at Begin, we don’t just [talk the talk, we walk the walk](https://dictionary.cambridge.org/dictionary/english/talk-the-talk-walk-the-walk) as well. You may have noticed that we like to be [thoughtful](https://begin.com/blog/posts/2022-03-22-dont-npm-install-your-way-to-success) about how much JavaScript we use on the client side. To that end, we are introducing a new plugin that can be used in your Enhance application to warn you when your application routes are nearing or exceeding the limits you have set.


## What is a performance budget?

MDN defines it as:

> A performance budget is a limit to prevent regressions. It can apply to a file, a file type, all files loaded on a page, a specific metric (e.g. [Time to Interactive](https://developer.chrome.com/en/docs/lighthouse/performance/interactive/)), a custom metric (e.g. [Time to Hero Element](https://support.speedcurve.com/docs/hero-rendering-times)), or a threshold over a period of time.

## When should you set a performance budget?

Ideally, you will decide upon a performance budget before starting a project. This will ensure that every decision you make will consider the impact on site performance. Some items you may want to consider when setting your performance budget are:

* Total number of HTTP requests per page
* Maximum image size
* Maximum page weight
* Limits on JavaScript and CSS

It’s the last point that we will focus on for the first release of the Enhance Performance Budget Plugin.

## How to install the plugin?

First, install the plugin in your Enhance project.

```bash
npm i @enhance/enhance-plugin-performance-budget
```

Then open your `.arc` file and add the following lines.

```arc
@plugins
enhance/enhance-plugin-performance-budget
@performance-budget
payload-size 20000
```

This will enable the plugin and set a total JavaScript payload size to 20 kb.

## What does the plugin measure?

The plugin is active when you are locally developing Enhance applications. At sandbox startup, the plugin loops through each page in your `app/pages` and measures how much JavaScript is included in each page. It doesn’t matter if your script tag is in the head, page or Enhance component.

Then, the plugin reports the JavaScript used in each route in a table.

![Performance Budget](/_public/blog/post-assets/performance-budget.png)

The plugin also watches your project for any changes and re-runs its check. In the example below, I added jQuery to the `/` route, which adds 129 kb of JavaScript, blowing by my 20 kb limit!

![JavaScript Added](/_public/blog/post-assets/js-added.png)

## Next Steps

* Try out the plugin in your project, and let us know if you have any [issues](https://github.com/enhance-dev/enhance-plugin-performance-budget/issues).
* Let us know what metric you want to see next in the plugin. Better yet, send us a PR!
* [Follow](https://fosstodon.org/@enhance_dev) Axol, the Enhance Mascot on Mastodon…
* Join the [Enhance Discord](https://enhance.dev/discord) and share what you’ve built, or ask for help.
