---
title: "On the third day of Enhancing: API routes and the Store"
image: "/_public/blog/post-assets/hens.jpg"
category: enhance, webdev, webcomponents
description: "On day three we’ll introduce API routes and the store."
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
mastodon: "@macdonst@mastodon.online"
published: "December 28, 2022"
---

![hens](/_public/blog/post-assets/hens.jpg)
<small>Original photo by [Jan Kraus](https://unsplash.com/@jankraus) on [Unsplash](https://unsplash.com/s/photos/hens)
</small>

On day one, we started a new project, then on day two, we created a new page and our first Enhance component. Today, we’ll introduce API routes and the store.


## API Routes

Enhance’s API routes are backend JSON routes designed for seamless client-side progressive enhancement. API routes are defined under `app/api` and follow the same file-based routing conventions as app/pages. JSON response values from API routes are passed automatically to corresponding page routes.


## Adding an API Route

Let’s add a new API route to pass data via the store to the `about.html` page. Run the following command from your terminal:

```bash
begin gen api –path /about
```

The file structure of your project should look like this:

```
12-days
├── app
│   ├── api
│   │   └── about.mjs
│   ├── elements
│   │   └── social-links.mjs
│   └── pages
│       ├─– about.html
│       └── index.html
└── public
```

Now when your browser requests [http://localhost:3333/about](http://localhost/about) the Enhance router  first calls the GET function in `app/api/about.mjs`. Then it will pass the returned data via the store to `app/pages/about.html` where it will be available to the page and all child elements.

No. Prop. Drilling.

> See the [Enhance lifecycle](https://enhance.dev/docs/learn/concepts/routing/lifecycle) for more information on how a request travels through the system.

The API route is an excellent place for you to fetch data from a database or a 3rd party service, but for our example, we will return some hard coded strings. Open `app/api/about.mjs` and replace the contents with:

```javascript
export async function get () {
 return {
   json: { socials: [
      { href:"https://github.com/macdonst", label: 'GitHub' },
      { href:"https://mastodon.online/@macdonst", label: 'Mastodon' },
      { href:"https://simonmacdonald.com", label: 'Website' },
    ] } }
}
```

> Again, feel free to add your own social links, you don’t have to use mine.

Let’s use [cURL](https://curl.se/) to test that our API route is up and running. From the command line execute:

```bash
curl http://localhost:3333/about -H "Accept: application/json"
```

And you’ll see a response like:

```json
{
  "socials": [
    {
      "href": "[https://github.com/macdonst",
      "label": "GitHub"
    },
    {
      "href": "https://mastodon.online/@macdonst",
      "label": "Mastodon"
    },
    {
      "href": "https://simonmacdonald.com",
      "label": "GitHub"
    },
    {
      "href": "https://mastodon.online/@macdonst",
      "label": "Mastodon"
    },
    {
      "href": "https://simonmacdonald.com",
      "label": "Website"
    }
  ]
}
```


## Using the Store

Yesterday we mentioned that the `store` is one of the properties of the `state` object passed into your custom element. Now that our API is provides data to the `about.html` page, let’s use it in our `social-links` component.

Let’s update the contents of `app/elements/social-links.mjs` to be:


```javascript
export default function Element ({ html, state }) {
 const { store } = state
 const { socials = [] } = store
 return html`
 <ul>
   ${socials.map(social => `<li><a href="${social.href}">${social.label}</a></li>`).join('')}
 </ul>`
}
```

Now our component reads the list of social links from the data passed into the component via the store. While this is a trivial example, the store is a powerful tool to pass complex data to your components.

## Next Steps

Tomorrow we’ll look at composing components out of other components.
