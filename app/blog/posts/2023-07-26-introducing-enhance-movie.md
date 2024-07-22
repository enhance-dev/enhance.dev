---
title: "Introducing Enhance Movies"
image: "/_public/blog/post-assets/axol-at-the-movies.png"
image_alt: "Axol, the Enhance mascot at the movies"
category: enhance, JavaScript
description: "We are excited to present our non-trivial learning application, Enhance Movies, designed to highlight the exceptional web development experience you get from Enhance. With a strong focus on simplicity, performance, progressive enhancement, and offline local development capabilities, this application is set to transform your understanding of what can be done by focusing on the web platform."
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
mastodon: "@macdonst@mastodon.online"
published: "July 26, 2023"
---

We are excited to present our non-trivial learning application, [Enhance Movies](https://enhance-movies.com/), designed to highlight the exceptional web development experience you get from [Enhance](https://enhance.dev/). Our movies app is built with Enhance and [The Movie Database API](https://www.themoviedb.org/). With a strong focus on simplicity, performance, progressive enhancement, and offline local development capabilities, this application is set to transform your understanding of what can be done by focusing on the web platform.

## Easy-to-Understand HTML Markup

Our sample application boasts easy-to-understand HTML markup, making it accessible to developers of all levels. Whether you're a seasoned pro or just starting your web development journey, our application ensures that you can quickly grasp and extend its functionality effortlessly.

Check out the clean markup via the use of custom elements:

```html
<movie-symbols></movie-symbols>
<movie-header></movie-header>
<movie-layout>
  <movie-feature slot="header"></movie-feature>
  <movie-sidebar slot="left-sidebar"></movie-sidebar>
  <div class="p0" slot="main">
    <movies-index-collection></movies-index-collection>
  </div>
  <movie-footer slot="footer"></movie-footer>
</movie-layout>
<script src='/_public/browser/movie-trailer-modal.mjs'></script>
```

## Performance

Performance is the backbone of any successful web application. We understand the significance of speed and efficiency in delivering a seamless user experience. Our sample application has been meticulously crafted with performance in mind. Say goodbye to sluggish load times and lagging interactions – our application ensures snappy responses and lightning-fast performance across devices and networks.

Don’t believe us, check out our [PageSpeed Insights results](https://pagespeed.web.dev/analysis/https-enhance-movies-com/ukiqxxuoi5?form_factor=mobile).


<blog-image src='/_public/blog/post-assets/enhance-movies-page-speed.png' alt='Enhance Movies Page Speed Results'></blog-image>

## Progressively Enhanced

Building for the web means embracing the diversity of user devices and capabilities. Our application follows a progressive enhancement approach, guaranteeing a fantastic user experience regardless of the user's browser or device. Users with modern browsers will enjoy enhanced features, while those with older setups will still access the core functionality – ensuring inclusivity and wider reach for your projects.

All the functionality for this application is accomplished with HTML, CSS and just 8.6 kb of JavaScript (3.9 kb compressed). What is even more impressive is you can turn JavaScript off completely and the application still works. Go ahead give it a try!

## Local Development

The world doesn't have consistent internet access everywhere, but that shouldn't limit you while developing. Our sample application is designed to work seamlessly even in offline scenarios. Developers can access cached content (I hope you like Transformers: Rise of the Beasts), perform tasks, and run searches, thanks to the power of offline functionality via API response mocking.

## Experience it Yourself

We believe in the power of experience, and thus, we encourage you to try our sample application firsthand. Discover the seamless blend of easy-to-understand HTML markup, performance, progressive enhancement, and local development  – all in one package.

🔗 [Live Demo of Enhance Movies](https://enhance-movies.com/)

With this example, we hope to demonstrate the incredible potential of web development using modern web standards — and to help you embrace the future of web development today!

## Next Steps

* Checkout the source code for the example app at [enhance-movies](https://github.com/enhance-dev/enhance-movies).
* [Follow](https://fosstodon.org/@enhance_dev) Axol, the Enhance Mascot on Mastodon..
* Join the [Enhance Discord](https://enhance.dev/discord) and share what you’ve built, or ask for help.
