---
title: Supporting Publish Own Site, Syndicate Elsewhere
image: "/_public/blog/post-assets/posse.jpg"
image_alt: "Six cowboys on horseback, with the mountains behind them."
category: indieweb, posse, enhance
description: "Our next step towards making it easier for everyone to participate in the open and indie web is the release of @enhance/arc-plugin-posse. This plugin checks your RSS feed for new content and syndicates it to whatever platforms you choose. The plugin is designed to work seamlessly with the Enhance Blog Template, but you can also deploy it as a standalone plugin for existing sites."
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
mastodon: "@macdonst@mastodon.online"
published: "April 28, 2023"
---

<small>Photo from the 1993 movie [Posse](https://en.wikipedia.org/wiki/Posse_(1993_film))</small>

Our next step towards making it easier for everyone to participate in the open and indie web is the release of [@enhance/arc-plugin-posse](https://github.com/enhance-dev/arc-plugin-posse). This plugin checks your RSS feed for new content and syndicates it to whatever platforms you choose. The plugin is designed to work seamlessly with the [Enhance Blog Template](https://begin.com/blog/posts/2023-03-17-introducing-the-enhance-blog-template), but you can also deploy it as a standalone plugin for existing sites.


## What is "Publish Own Site, Syndicate Elsewhere?"

Publishing on your own site and syndicating elsewhere (POSSE) is a content strategy involving creating content on your website first and then distributing it to other platforms. This approach allows you to take advantage of the traffic and visibility of different platforms while retaining control over your content and driving traffic back to your website.

## What are the benefits of POSSE?

**_Control Over Your Content_**

You have complete control over your website when you publish content on it. You can choose the tone, the format, and the length of your content. You can also include links to other content on your website, which can help to drive traffic. When you syndicate your content elsewhere, you can retain this control by creating a direct ownership chain that can be traced back to you without any intervening 3rd party’s Terms of Services getting in the way.

**_Increased Visibility_**

Syndicating your content on other platforms can increase your visibility and reach a larger audience. Publishing content on high-traffic websites relevant to your niche exposes it to a new audience that may not have found it otherwise. Syndication can increase website traffic and attract new customers.

**_Cost-Effective_**

Publishing content on your own website is typically very cost-effective. All you need is a website and some basic content-creation tools. The hardest thing is creating and posting content on a regular basis. To start, consider using the [Enhance Blog Template](https://begin.com/blog/posts/2023-03-17-introducing-the-enhance-blog-template) and deploying to Begin for free. Worried about the ole bait and switch on costs? Checkout our [pricing guarantee](https://begin.com/pricing). If you want a custom domain name, you can do that with [Begin Domains](https://begin.com/blog/posts/2023-04-03-begin-domains).

## Getting Started

To start syndicating your content to other sites, we need to add the plugin to an existing Enhance application. First, install the plugin from npm:

```bash \
npm install @enhance/arc-plugin-posse
```

Then add the plugin to your application by editing your `.arc` file and adding a line under the `@plugins` pragma:

```arc
@plugins
enhance/arc-plugin-posse
```

To configure your plugin you’ll add a few more lines to your `.arc` file:

```arc
@posse
feed "https://url.to/rss"
since “2023-04-27”
```

The `feed` option tells the plugin what RSS feed to inspect for new content while the `since` property lets the plugin know the date to start syndicating content on.

## Syndication Targets

The plugin supports syndicating content to [dev.to](https://dev.to/), [Mastodon](https://joinmastodon.org/) and [Twitter](https://twitter.com/) (while it lasts 😉). Additional syndication targets are planned, but please let us know what you’d like to see next by raising an [issue](https://github.com/enhance-dev/arc-plugin-posse/issues).

The plugin will only attempt to syndicate to a target if the necessary environment variables are set for each syndication target. For more information see the documentation on [@enhance/arc-plugin-posse](https://github.com/enhance-dev/arc-plugin-posse#readme).

### Mastodon Example

![Mastodon Post](/_public/blog/post-assets/posse-mastodon.png)

### Twitter Example

![Twitter Post](/_public/blog/post-assets/posse-twitter.png)

## Further Reading

* Dig into the details of the [Enhance Blog Template](https://begin.com/blog/posts/2023-03-17-introducing-the-enhance-blog-template).
* [Customize](https://begin.com/blog/posts/2023-04-06-customizing-the-enhance-blog-template) the style of your blog.
* Grab a [domain name](https://begin.com/blog/posts/2023-04-03-begin-domains)!
* Set up [webmention](https://begin.com/blog/posts/2023-04-19-webmention-support-in-enhance-blog-template) support on your blog.

## Next Steps

* Join the [Enhance Discord](https://enhance.dev/discord) and share what you’ve built or ask for help.
* Let us know what features you would like to see next. What syndication targets are important to you?
