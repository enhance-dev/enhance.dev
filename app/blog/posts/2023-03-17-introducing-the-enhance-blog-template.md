---
title: Introducing the Enhance Blog Template
image: "/_public/blog/post-assets/enhance-blog-template.png"
image_alt: Enhance Blog Template
category: enhance, blog, template
description: "One thing we’ve heard from users is that they want more options for getting started using Enhance. Today we are excited to announce our first Enhance application template - Blog."
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
mastodon: "@macdonst@mastodon.online"
published: "March 17, 2023"
---

One thing we’ve heard from users is that they want more options for getting started using Enhance. Today we are excited to announce our first Enhance application template - [Blog](https://github.com/enhance-dev/enhance-blog-template). Give the new blog template a test drive then jump onto the [Enhance Discord](https://enhance.dev/discord) to tell us how it went, and let us know what other templates you’d like to see in the future.

## Features

* Author posts in markdown
* Syntax highlighting of code blocks
* Light and dark themes based on the operating system setting
* Automatic RSS feed generation
* CI/CD via GitHub Actions

## Project Structure

```
app
├── api ............... data routes
│   ├── posts
│   │   └── $$.mjs .... load data for individual blog post
│   └── index.mjs ..... list of blog posts
├── blog
│   └── posts ......... post files in markdown format
│       └── *.md
├── elements .......... single file components
│   └── *.mjs
├── lib
│   ├── hljs-line-wrapper.mjs
│   └── markdown-class-mappings.mjs
├── pages ............. file-based routing
│   ├── posts
│   │   └── $$.mjs .... individual blog post
│   └── index.mjs ..... list of blog posts
└── head.mjs .......... head tag, used on all pages
```

## Prerequisites

Install the [Begin CLI ](https://begin.com/docs/)to simplify the deployment of your new blog.


## Local Development

Clone the blog template repository.

```bash
git clone git@github.com:enhance-dev/enhance-blog-template.git
```

Install dependencies

```bash
cd enhance-blog-template
npm install
```

Start the development server.

```bash
npm start
```

Open a browser tab to [http://localhost:3333](http://localhost:3333) and start editing your blog. The local development server will hot-reload your site as you make changes.

## Blog Posts

You’ll probably want to clear out all the files in `app/blog/posts` since you didn’t write them. Any file with the extension .md will automatically be added to your blog. The filename should follow the format `YYYY-MM-DD-title.md` (e.g. `2023-03-07-new-post.md`).

In order for the file to be correctly processed it needs to include some frontmatter. You are not limited to these three properties. Add additional properties and make use of them in your blog.

```yaml
---
title: The title
description: A description of your post
published: The date published in the format "Month Day, Year" (e.g. March 7, 2023)
---
```

The rest of your post can be any valid markdown, including fenced code blocks. For more info on adding languages to the syntax highlighting, check out the documentation for [Arcdown](https://github.com/architect/arcdown).


## Customization

### Styling

Styles for this template are applied in the following places:

* `styleguide.json`: Dark and light colors are defined here, as are the font stacks to be used on headings and body text. System font stacks are used by default; you can find some great alternatives at [Modern Font Stacks](https://modernfontstacks.com/).
* `public/css/global.css`: This stylesheet applies some basic styles at the global level.
* `public/css/a11y-dark.min.css`: This stylesheet applies syntax highlighting to code blocks. Feel free to swap this out with another highlight.js theme of your choosing (and update the link to the stylesheet in `head.mjs`).
* `app/lib/markdown-class-mappings.mjs`: This file exports an object of HTML element names matched to arrays of classes from Enhance’s utility class system. When your markdown files are converted to HTML, these classes will be attached to the respective HTML elements.
* `<style>` blocks in the Single File Components (SFCs), which live in the app/elements directory. Styles written in these style blocks will be scoped to the custom elements they’re defined in.

This template supports dark mode out of the box — try switching between light and dark mode in your operating system settings to see this in action!

### Site Title

There are a few places in the template where you will want to update your site’s title:

* In `app/head.mjs` you can set the `<title/>` tag.
* In `app/elements/site-header.mjs` you can set the blog title and subtitle that shows up on every page.
* Finally, in `src/plugins/create-rss-feed.js` you can update the title and description that is included in your RSS feed.

## Deploying Your Blog

Try out your blog by deploying it to the Begin free tier.

Login to Begin

```bash
begin login
```

Create your application and staging environment by following the interactive prompts:

 ```bash
begin create
This project doesn't appear to be associated with a Begin app
? Would you like to create a Begin app based on this project? (Y/n) · true
? What would you like to name your app? · blog-template
? What would you like to name your first environment? · staging
Archiving and uploading project to Begin...
Project uploaded, you can now exit this process and check its status
with: begin deploy --status
Beginning deployment of 'staging'
Packaging build for deployment
Publishing build to Begin
Build completed!
Deployed 'staging' to: https://blog-template.begin.app
```

Try our your new blog by visiting the URL `begin create` provides for you.

**Optional Step**: If you plan on using the default GitHub Action for CI/CD you should create a production environment.

```bash
begin create --env production
App environment 'production' created at https://blog-template-prod.begin.app
```

## Configuring CI/CD

This repo comes with a GitHub action that will deploy your site to the `staging` environment when there is a commit to the `main` branch and `production` when you tag a release.

For this to work you must [create a repo secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) named `BEGIN_TOKEN`. Once you successfully login to Begin using the CLI command `begin login` you can retrieve the value for `BEGIN_TOKEN` in the file `~/.begin/config.json`. Use the value of `access_token` in this file as the value for `BEGIN_TOKEN`.


## Next Steps

* Join the [Enhance Discord](https://enhance.dev/discord) and share what you’ve built or ask for help.
* Let us know what templates you’d like to see next!
