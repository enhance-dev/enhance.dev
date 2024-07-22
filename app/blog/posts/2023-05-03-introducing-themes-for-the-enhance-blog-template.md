---
title: Introducing Themes for the Enhance Blog Template
image: "/_public/blog/post-assets/cole-blog-template-themes/cover.jpg"
image_alt: "Two layered screenshots showing the original blog template theme and the new minimal theme"
category: enhance
description: "Today, we’re shipping a small but exciting update to our Enhance blog template, in the form of a new starter theme and the ability to quickly switch between themes via a single line of code."
author: 'Cole Peters'
avatar: 'cole.jpg'
mastodon: "@colepeters@mastodon.online"
published: "May 3, 2023"
---

Today, we’re shipping a small but exciting update to our [Enhance blog template](https://github.com/enhance-dev/enhance-blog-template), in the form of a new starter theme and the ability to quickly switch between themes via a single line of code.

We’ve been thinking about the idea of themeable Enhance apps for a while now, and this is our first step in that direction. Starting today, the Enhance blog template comes preloaded with two different themes — the original theme the template was first released with, and a new minimal theme. Both handle dark mode out of the box.

<figure>
  <blog-image src='/_public/blog/post-assets/cole-blog-template-themes/theme-minimal.jpg' alt='The new "minimal" blog theme, featuring sans serif typography in light and dark variants'></blog-image>
  <figcaption>The new minimal theme</figcaption>
</figure>

<figure>
  <blog-image src='/_public/blog/post-assets/cole-blog-template-themes/theme-elegant.jpg' alt='The previous default theme, now called "elegant", featuring a mix of sans serif and serify typography in light and dark variants'></blog-image>
  <figcaption>The original theme</figcaption>
</figure>

Our new minimal theme (which is active by default) uses a similar layout to our original theme, but features more neutral colors and typography. If you prefer the original theme, however, switching between themes is as easy as changing one line of code in your project’s `.arc` file. Under the `@enhance-styles` pragma, point the `config` option at `theme-elegant.json`:

```
@enhance-styles
config theme-elegant.json
```

These two themes vary primarily in color palette and typefaces. However, we’re planning to explore affordances for much deeper theming in the future, which will allow you to tweak many different aspects of a theme with ease. We hope these themes give you a great starting point for your own customizations and styling.

## Further Reading

- Read [the release announcement](/blog/posts/2023-03-17-introducing-the-enhance-blog-template) for our blog template
- [Learn how to style](/blog/posts/2023-04-06-customizing-the-enhance-blog-template) the blog template
- Grab [a domain name](https://begin.com/blog/posts/2023-04-03-begin-domains)
- Get set up with [webmentions](/blog/posts/2023-04-19-webmention-support-in-enhance-blog-template)
- [Syndicate your blog](/blog/posts/2023-04-28-supporting-publish-own-site-syndicate-elsewhere) with POSSE

## Next Steps

- Join [the Enhance Discord](https://enhance.dev/discord) to share your blog, request theming features, or to ask for help from our team and the community
