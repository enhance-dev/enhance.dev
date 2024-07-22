---
title: "Enhancing TodoMVC"
image: '/_public/blog/post-assets/todos.jpg'
category: uncategorized
description: Porting the venerable TodoMVC app to Enhance. In this post we'll build a todo app without any client-side JavaScript.
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
published: 'September 6, 2022'
---

![todos](/_public/blog/post-assets/todos.jpg)
<small>Photo by <a href="https://unsplash.com/@glenncarstenspeters?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Glenn Carstens-Peters</a> on <a href="https://unsplash.com/s/photos/todo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></small>

Last week at [CascadiaJS](https://2022.cascadiajs.com/), [Begin](https://begin.com/) [announced](https://blog.begin.com/posts/2022-08-31-new-begin-and-enhance-html-framework) our new HTML first framework, [Enhance](https://enhance.dev/docs/). It wasn’t long before folks asked about building a Todo app with Enhance on our [Discord](https://discord.gg/UWauMMtt).

![any_plans](/_public/blog/post-assets/any-plans.png)

So I thought it would be interesting to take a pass at building the venerable [TodoMVC](https://todomvc.com/) example as an Enhance app. Our version will use Web Components server-side rendered by Enhance with no client-side JavaScript.

## TL;DR

If you just want to jump right into the app, you can [clone the repository](https://github.com/macdonst/enhance-todomvc) and run the following commands from your terminal:

```bash
npm install
npm start
```

Once the app starts up, navigate to [http://localhost:3333/todos](http://localhost:3333/todos).

![demo](/_public/blog/post-assets/todos-demo.gif)

## Application structure

Enhance apps are a combination of APIs, web components and pages. Our version of TodoMVC should look like this when you clone it:

```
app
├── api
|    ├── todos
|    |   └── $id
|    |   |   └── delete.mjs
|    |   ├── $id.mjs
|    |   ├── clearcompleted.mjs
|    |   └── toggleall.mjs
|    └── todos.mjs
├── elements
|    ├── todo-footer.mjs
|    ├── todo-item.mjs
|    └── todo-main.mjs
└── pages
|    └── todos.mjs
├── head.mjs
models
├── schemas
|    └── todos.mjs
└── todos.mjs
```

## How does it all work?

Great question. Let’s trace what happens when you hit the route [http://localhost:3333/todos](http://localhost:3333/todos).

1. The browser sends a GET request to `/todos`.
2. The Enhance application checks to see if there is an API route that matches `/todos`.
3. In this case, the `get` method of `api/todos.mjs` is executed.
4. The `get` method queries DynamoDB to get all the saved todos and returns a JSON payload.
5. The application then calls the `pages/todos.mjs`, including the JSON payload from step four as part of our [store](https://enhance.dev/docs/learn/concepts/state/store). The store will be passed down to all the web components loaded by this page.
6. Our `pages/todos.mjs` renders out HTML by server-side rendering the apps web components, which you can find in the `elements` folder.

The app is entirely server-side rendered and has no client-side JavaScript. Go ahead and disable JavaScript in your browser (instructions for [Chrome](https://developer.chrome.com/docs/devtools/javascript/disable/), [Edge](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/javascript/disable), [Firefox](https://www.lifewire.com/disable-javascript-in-firefox-446039) and [Safari](https://www.lifewire.com/disable-javascript-in-safari-4103708)), and you’ll notice the app still works! It’s not magic. It’s just the judicious use of the `<form>` element.

## Where to take things from here?

Is this exactly how we’d build an Enhance app from scratch? Well no. This is a quick port of the existing TodoMVC app to Enhance. Join us next week, where we’ll show you how to progressively enhance the application with a sprinkling of JavaScript while retaining this baseline of functionality without JavaScript.

## Next Steps

1. Try out the [Enhance Quickstart!](https://enhance.dev/docs/)
2. [Sign up](https://docs.google.com/forms/d/e/1FAIpQLScPxdqdFI2zkNZ3syCze_Mgj2ba3ZzHWQawKJbFukqFMVrXsA/viewform) for early access to the next version of Begin
