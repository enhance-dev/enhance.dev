---
title: "Using Fast Components in an Enhance App"
image: "/_public/blog/post-assets/fast.jpg"
category: enhance, webdev, webcomponents, fast
description: "Fast is a library of web components and framework for building web components from Microsoft. With a minor amount of configuration you can use Fast components in your Enhance app."
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
mastodon: "@macdonst@mastodon.online"
published: "January 20, 2023"
---

![Fast](/_public/blog/post-assets/fast.jpg)
<small>Original photo by [Marc-Olivier Jodoin](https://unsplash.com/@marcojodoin) on [Unsplash](https://unsplash.com/photos/NqOInJ-ttqM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
</small>

[Fast](https://www.fast.design/) is a library of web components and a framework for building web components from Microsoft. With minor configuration, you can use Fast components in your Enhance app.

## Using the Fast component library in your Enhance app

Fast comes with a [suite of pre-built components](https://explore.fast.design/components/fast-button) based on their design language that you can drop into your application. These components are beneficial for [wireframing](https://balsamiq.com/learn/articles/what-are-wireframes/) your application before you replace them with your own components.

Fast Components are a [browser module](https://enhance.dev/docs/learn/starter-project/browser). We’ll need to bundle in the dependency so it is available in the browser at run time.

First, we need to install `@microsoft/fast-components` by executing the command:

```bash
npm install @microsoft/fast-components
```

Then we need to create an entry point for Enhance to roll up the components and their dependencies to be used in the browser. Create a file called `app/browser/fast.mjs` and populate it with:

```javascript
// app/browser/fast.mjs
import {
    allComponents,
    provideFASTDesignSystem
} from "@microsoft/fast-components"

provideFASTDesignSystem().register(allComponents)
```

If you want to make all of the Fast components available.

However, you can reduce the size of your script by specifying which components you will use from Fast. For example, if you only need the button component use:

```javascript
// app/browser/fast.mjs
import {
    fastButton,
    provideFASTDesignSystem
} from "@microsoft/fast-components";

provideFASTDesignSystem()
    .register(
        fastButton()
    );
```

Now, all you need to do to use Fast components in an Enhance page is add a `script` tag to the rolled up code that Enhance creates for you.

```html
<script src="/_public/pages/fast.mjs"></script>
```

## Closing thoughts

What off-the-shelf components are important to you when you are building web applications? Let us know over on [Discord](https://enhance.dev/discord) or [Mastodon](https://fosstodon.org/@enhance_dev).
