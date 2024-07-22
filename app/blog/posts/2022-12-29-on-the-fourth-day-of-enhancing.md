---
title: "On the fourth day of Enhancing: Composing elements"
image: "/_public/blog/post-assets/four-birds.jpg"
category: enhance, webdev, webcomponents
description: "Building web components out of smaller components is one of the most powerful features of web components."
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
mastodon: "@macdonst@mastodon.online"
published: "December 29, 2022"
---

![four birds](/_public/blog/post-assets/four-birds.jpg)
<small>Original photo by [Anissa Terry](https://unsplash.com/@nissat) on [Unsplash](https://unsplash.com/s/photos/four-birds)
</small>

Building web components out of smaller components is one of the most powerful features of web components. Today’s lesson will show you how to build a page wrapper component to include a header and footer without having to repeat yourself.

## Create the Header and Footer components

We’ll need a header and footer to compose our page wrapper component. Run these commands in your terminal.

```bash
begin gen element --name my-header
begin gen element --name my-footer
begin gen element --name page-wrapper
```

This updates your project structure to include the three new elements.

```
12-days
├── app
│   ├── api
│   │   └── about.mjs
│   ├── elements
│   │   ├─– my-footer.mjs
│   │   ├─– my-header.mjs
│   │   ├─– page-wrapper.mjs
│   │   └── social-links.mjs
│   └── pages
│       ├─– about.html
│       └── index.html
└── public
```

We’ll add a navigation section for the header with links to the home page and the about page. Replace the contents of `app/elements/my-header.mjs` with the following code:

```javascript
export default function Element ({ html }) {
 return html`
   <header class="p0">
     <h1>Header</h1>
     <nav>
       <a href="/">home</a>
       <a href="/about">about</a>
     </nav>
   </header>
 `
}
```


For the footer, we’ll do something a little different. We’ll use the footer as a quick way to debug our application state. I’ve found this to be very useful in practice as the structure of the JSON I expect to get back from my API occasionally differs from the JSON's actual structure.

Replace the contents of `app/elements/my-footer.mjs` with:

```javascript
export default function Element ({ html, state }) {
 return html`
<footer>
 <pre>${JSON.stringify(state, null, 2)}</pre>
</footer>`
}
```


Now that we have some child components, we can move on to the next step.


## Composing components

Our `page-wrapper` component will be composed of our `my-header` and `my-footer` components. In addition we’ll use slots to enable passing in an arbitrary number of children to our new component. First, the code for `app/elements/page-wrapper.mjs`:


```javascript
export default function Element ({ html }) {
 return html`
<my-header></my-header>
 <slot></slot>
<my-footer></my-footer>
`
}
```

It’s a pretty simple but powerful layout component. Anytime we use the `page-wrapper` component, it will wrap the children we pass into it with our previously developed header and footer components. It’s able to do this via the `slot` tag. In this case, we are using an unnamed `slot`. This means anything between the `page-wrapper` tags will be inserted where the `slot` tag exists.

In our `app/pages/about.html` page the `page-wrapper` component can be used like:

```html
<page-wrapper>
 <section class="m-auto p2 font-sans">
   <h1 class="mb1 font-semibold text3">About Me</h1>
   <social-links></social-links>`
 </section>
</page-wrapper>
```

Which will produce the following output (see [http://localhost:3333/about](http://localhost:3333/about)):

![header and footer](/_public/blog/post-assets/12-days/header-footer.png)

## Next Steps

Things are progressing nicely, but that page looks ugly. Stop by tomorrow, where we’ll apply some styling to our page using Enhance Styles.
