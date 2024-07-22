---
title: "On the second day of Enhancing: Your first page and component"
image: "/_public/blog/post-assets/turtle-doves.jpg"
category: enhance, webdev, webcomponents
description: "Picking up from where we left off yesterday. Let’s add a new page to our application."
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
mastodon: "@macdonst@mastodon.online"
published: "December 27, 2022"
---

![turtle doves](/_public/blog/post-assets/turtle-doves.jpg)
<small>Original photo by [Bruno Oliveira](https://unsplash.com/@boliveira) on [Unsplash](https://unsplash.com/s/photos/turtle-doves)
</small>

Picking up from where we left off yesterday. Let’s add a new page to our application.

## Adding a page

Once again, we’ll lean on the Begin CLI to quickly generate code for our project. Open up your terminal and run:

```
begin generate page --path /about
```

> **Note:** The Begin CLI aliases `gen` to `generate` so we’ll use the shorter form in the future.

This will create a file `app/pages/about.html`. Your apps folder structure now looks like this:

```
12-days
├── app
│   └── pages
│       ├─– about.html
│       └── index.html
└── public
```

The contents of the `about.html` page are meant to be replaced so open that file in your favorite editor, and let’s write some HTML. I’m going to add links to my socials but feel free to use yours instead. I’ll replace the current contents of `about.html` with the following:

```html
<section class="m-auto p2 font-sans">
 <h1 class="mb1 font-semibold text3">About Me</h1>
 <ul>
   <li><a href="https://github.com/macdonst">GitHub</a></li>
   <li><a href="https://mastodon.online/@macdonst">Mastodon</a></li>
   <li><a href="https://simonmacdonald.com">Website</a></li>
 </ul>
</section>
```

Opening a browser to [http://localhost:3333/about](http://localhost:3333/about) will look something like this:

![about me](/_public/blog/post-assets/12-days/about-me.png)

Not super exciting, but it’s a start!

## Your first component

Now that we’ve added a page to our application let’s build our first web component. This is where Enhance excels! Once again, we’ll lean on the CLI to get us started. Run the command:

```bash
begin gen element --name social-links
```

This will create a new folder called `app/elements`. The elements folder is where you add reusable components in your Enhance application. As well as this new folder, you will notice a new file: `app/elements/social-link.mjs`

```
12-days
├── app
│   ├── elements
│   │   └── social-links.mjs
│   └── pages
│       ├─– about.html
│       └── index.html
└── public
```

> Enhance will automatically make files in the `app/elements` folder available as web components to the rest of your application, using the element's filename as the component's tag name. Web components require a `-` character in the tag name, so be sure to include one in your filename.

The contents of `app/elements/social-links.mjs` will be replaced, but I want to explain the function signature.

```javascript
export default function Element ({ html, state }) {
```

Our `Element` function is passed an object with two properties, `html` and `state`. `html` is a render function which is used to expand custom elements. `state` is an object comprised of `attrs` (the attributes passed into your custom element), and `store` (which is an object containing the application state). More on that tomorrow.

Let’s replace the contents of `app/elements/social-links.mjs` with the following:

```javascript
export default function Element ({ html, state }) {
 return html`
 <ul>
   <li><a href="https://github.com/macdonst">GitHub</a></li>
   <li><a href="https://mastodon.online/@macdonst">Mastodon</a></li>
   <li><a href="https://simonmacdonald.com">Website</a></li>
 </ul>`
}
```

Then modify your `app/pages/about.html` page to use your new `social-links` component:

```html
<section class="m-auto p2 color-light font-sans">
 <h1 class="mb1 font-semibold text3">About Me</h1>
 <social-links></social-links>
</section>
```

> Web components are not self-closing, so you must have an opening and closing tag, even if your web component doesn’t have any children.

Reload [http://localhost:3333/about](http://localhost:3333/about), and you will see:

![about me](/_public/blog/post-assets/12-days/about-me.png)

This is exactly the way our page looked before, but now it’s powered by a server-side rendered custom element. To see the difference, inspect the source of  [http://localhost:3333/about](http://localhost:3333/about) in your browser dev tools.

```html
<section class="m-auto p2 color-light font-sans">
  <h1 class="mb1 font-semibold text3">About Me</h1>
  <social-links>
    <ul>
      <li><a href="https://github.com/macdonst">GitHub</a></li>
      <li><a href="https://mastodon.online/@macdonst">Mastodon</a></li>
      <li><a href="https://simonmacdonald.com">Website</a></li>
    </ul>
  </social-links>
</section>
```

Our `ul` is now wrapped in a `social-links` tag. This doesn’t seem groundbreaking right now, but what you’ve done is laid the foundation for an app that works 100% of the time.

## Next Steps

Come back tomorrow when we’ll add an API route to our application.
