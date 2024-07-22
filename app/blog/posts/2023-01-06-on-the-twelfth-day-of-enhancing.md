---
title: "On the twelfth day of Enhancing: Debugging"
image: "/_public/blog/post-assets/drumming.jpg"
category: enhance, webdev, webcomponents
description: "How to debug your remote applications."
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
mastodon: "@macdonst@mastodon.online"
published: "January 6, 2023"
---

![drumming](/_public/blog/post-assets/drumming.jpg)
<small>Original photo by [Josh Sorenson](https://unsplash.com/@joshsorenson) on [Unsplash](https://unsplash.com/s/photos/drum?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
</small>

We are at the end of our 12 Days of Enhancing series. We’ll give you some short instructions on debugging your new Enhance application.

## Debugging

Since your Enhance application is running in the cloud, it’s not exactly like you can attach a debugger. Instead, we rely upon our old friend `console.log`. By judicious use of `console.log` we can inspect the crime scene that my code so often emulates.

To get logs from recent executions of your app, run the following command:

```bash
begin logs --env staging
```

That output might get a bit verbose if you have a lot of traffic. Luckily, you can filter the logs by adding a filter parameter to the command.

```bash
begin logs --env staging --filter "my keyword"
```

You might even want to [wrap](https://gist.github.com/robatron/5681424) `console.log` in a function so you can turn on and off the output with an environment variable like we discussed yesterday.

## Next Steps

Take some of the tidbits we’ve given you over the past 12 days and make something great with Enhance yourself. We'd love to hear about your project. Connect in our [Discord server](https://enhance.dev/discord) or on Mastodon [@enhance_dev@fosstodon.org](https://fosstodon.org/@enhance_dev).
