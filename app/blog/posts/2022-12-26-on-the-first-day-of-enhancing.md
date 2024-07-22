---
title: "On the first day of Enhancing: Getting Started"
image: "/_public/blog/post-assets/pear-tree.jpg"
category: enhance, webdev, webcomponents
description: "We embark on a 12 day journey to build and deploy your first Enhance app."
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
mastodon: "@macdonst@mastodon.online"
published: "December 26, 2022"
---

![Pear Tree](/_public/blog/post-assets/pear-tree.jpg)
<small>Original photo by [Dan Gold](https://unsplash.com/@danielcgold) on [Unsplash](https://unsplash.com/s/photos/pear-tree)
</small>

Enhance is a web standards-based HTML framework. It’s designed to provide a dependable foundation for building lightweight, flexible, and future-proof web applications. Over the next 12 days, we’ll slowly build and deploy an Enhance application while introducing you to many, but not all, of the features of Enhance. Let’s get started.


## Installing the Begin CLI

Open up a terminal and execute the following command on macOS or Linux:

```bash
curl -sS https://dl.begin.com/install.sh | sh
```

Then follow the printed instructions to add Begin to your `$PATH`.

On Windows, the command is slightly different:

```
iwr https://dl.begin.com/install.ps1 -useb | iex
```

> We’ll use the Begin CLI to generate some code for us over the next few days and to deploy our application.

## Create a new project

Before you start developing an Enhance application, make sure you have [Node.js 16.x](https://nodejs.org/) or later installed.  Once you do run:

```bash
begin new 12-days
```

This will create a new project in the current folder named `12-days`. Open up that folder and you should see the following structure:

```
12-days
├── app
│   └── pages
│       ├─– about.html
│       └── index.html
└── public
```

As we progress along adding functionality to the application, we’ll add more files and folders to the `app` folder. For now, we’ll only concern ourselves with `app/pages` where we will add our file-based routed HTML pages, and a `public` folder where we can add our static assets.


## Local Development

While Enhance applications are serverless, providing local development to reduce the code/run/debug cycle is vitally important. To get started with local development, execute the following commands:

```bash
cd 12-days
begin dev
```

Now, open your browser to `[http://localhost:3333](http://localhost:3333)` to browse your app locally. Any changes to your code in the `app` folder will trigger a hot reload of your application.

Open the project in your favorite editor ([see our Editor Setup guide](https://enhance.dev/docs/learn/get-started/editor-setup)), and make some changes to `app/pages/index.html`. You’ll notice your changes are instantly updated when you save the file.


## Next Steps

Come back tomorrow when we’ll add a new page to our application.
