---
title: Enhance API Routes and OpenAPI
image: "/_public/blog/post-assets/axol-and-openapi.png"
image_alt: Axol and OpenAPI
category: enhance, OpenAPI
description: "Documenting Enhance API's with OpenAPI."
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
mastodon: "@macdonst@mastodon.online"
published: "March 8, 2023"
---

One of the most valuable features of the [Begin CLI](https://begin.com/docs/cli/installation) is the ability to quickly stand up a CRUD-L (Create, Read, Update, Delete and List) application. One command generates all the code for your data access layer, business logic and a user interface that works with and without JavaScript.

Let’s give it a try.


## Getting Started

First, install the [Begin CLI](https://begin.com/docs/cli/installation). Next, let’s create a new Enhance application by running the following commands:

```bash
begin new book-tracker
cd book-tracker
```

When you open the applications directory, you will see a file system that looks like this:

```
app
└── pages
    └── index.html
```

That’s a pretty bare-bones application, so let’s add to it.


## Generate

We have to decide what the object of our application will be. Since I love books, let’s build a site to track all of the books I’ve bought that I haven’t had time to read yet.

```bash
begin generate scaffold Books title:string \
author:string start_date:date finish_date:date --openapi
```

If we look at the file system for the project now, you will see some differences:

```
app
├── api
│   └── books
│       ├── $id
│       │   └── delete.mjs
│       └── $id.mjs
├── elements
│   └── enhance-*.mjs
├── models
│   └── openapi
│   │   └── book.mjs
│   └── schemas
│   │   └── book.mjs
│   └── books.mjs
└── pages
    ├── books
    │    └── $id.mjs
    ├── books.mjs
    └── index.html
```

Whoa, the scaffold command generated a lot of code for us. In broad strokes here’s what scaffold has done.

### `/books` API

In the `app/api` directory scaffold has added three files to handle the following API routes:

```
app/api/books.mjs
- GET  /books            # list all books
- POST /books            # create new book

app/api/books/$id.mjs
- GET  /books/$id        # read one book
- POST /books/$id        # update a book

app/api/books/$id/delete.mjs
- POST /books/$id/delete # delete a book
```

> You may be wondering why the API only uses GETs and POSTs while eschewing PUTs and DELETEs and the answer is quite simple. Web browsers only support GET and POST. Since we want our API to work in situations where JavaScript is unavailable, we’ll limit ourselves to these two verbs.

All GET requests return JSON, while POST requests return JSON if the `content-type` header is set to `application/json` or it will send a redirection response if the `content-type` is `application/x-www-form-urlencoded`, which is the case when you do a form post.


### Elements

The `app/elements` folder contains stubs that point to re-usable form elements from the [`enhance-dev/form-elements`](https://github.com/enhance-dev/form-elements) package. These custom elements are intended to get you up and running quickly, but we fully expect you to build your own amazing components.


### Models

Are you intimidated by NoSQL databases and worried about implementing the wrong access patterns? Fear not. Scaffold has created an easy-to-digest data access wrapper in `app/models/books.mjs`, which handles communication between your application and DynamoDB. This lets you focus on writing your application without worrying about the persistence layer.


### User Interface

Scaffold also creates a couple of bare-bones pages to view your list of books (`app/pages/books.mjs`) and get detailed information about a single book (`app/pages/books/$id.mjs`). These pages are intended to be a starting point for your user interface.

The key takeaways from these stubs are how to retrieve data from the store and respond to problems from form submission.


## Running Locally

Now that we have the basis of our application, let’s test it locally by running the following command:

```bash
begin dev
```

Open a browser tab to [http://localhost:3333/books](http://localhost:3333/books) and click on the `New book` link to reveal the new book form. Fill out the form with some information about a book you’ve recently read. I’m will use the excellent [Engineering Management for the Rest of Us](https://www.engmanagement.dev/) by [Sarah Drasner](https://sarahdrasnerdesign.com/) for my example.

![new book](/_public/blog/post-assets/new-book.gif)


The example seems straightforward, but what is happening behind the scenes?

1. The user fills out the new book form and clicks the “Save” button.
1. The browser does a form POST to `/books` to create a new book.
1. The `post` method in `app/api/books.mjs` receives the request and uses our database model to persist the book information.
1. Since this was a form POST (i.e. without JavaScript) the `post` method redirects the browser to `/books`.
1. The `get` method in `app/api/books.mjs` is invoked and it retrieves the list of books from our database, which then returns this data to our user interface layer at `app/pages/books.mjs`.
1. Our UI layer renders a list of books.

This may seem like a very involved way of getting a list of items but this pattern is guaranteed to work in any web browser, with or without JavaScript. Enhance sets you up with a solid base and enables you to progressively enhance your application. Read the [Enhance Lifecycle](https://enhance.dev/docs/learn/concepts/routing/lifecycle) for more information about how a request makes it's way through an Enhance app.

That’s great, but what if I want to skip the user interface and interact directly with the API layer? We could figure out the cURL commands, but there must be an easier way, and that’s where Open API comes in.

## Open API

> OpenAPI is the most broadly adopted industry standard for describing APIs.

The OpenAPI Specification allows the description of a remote API accessible through HTTP. When you pass the `--openapi` option to scaffold, it will automatically create this specification under `app/models/openapi` and add a plugin to generate Open API routes to test your API.

The routes are:

* `GET /openapi` which lists all the Open API routes you’ve generated
* `GET /openapi/$id` which will only show the routes for the one tag, for example `/openapi/books`

### Benefits of Open API

The first and foremost benefit of having an Open API specification is that your API is documented. By going to the [`http://localhost:3333/openapi/books`](http://localhost:3333/openapi/books) route you will be presented with this UI.

![OpenAPI list](/_public/blog/post-assets/openapi-list.png)

Which is slightly easier to digest than digging into the `app/api` directory to see which routes are available. Expanding the `GET /books` route will show you what type of API response to expect when you hit this route.

![OpenAPI doc](/_public/blog/post-assets/openapi-doc.png)

However, my favorite part is trying out the API directly from this interface. Click on the “Try it Now” button and then “Execute”. This will invoke the `GET /books` route, and you will be able to see the JSON response and response headers. As a bonus, it will give you the cURL command, so you don’t need to figure out all the options yourself.

![OpenAPI execute](/_public/blog/post-assets/openapi-execute.png)

## Wrapping Up

Scaffold is a powerful command that lets you start building your application quickly. To summarize it:

* Creates API routes that support both JSON and URL Form Encoding.
* It makes an OpenAPI file to enable you to explore the API.
* Writes the database access layer code.
* Stubs out a user interface that works with and without JavaScript.

Have you tried out the scaffold command? Let us know what you think on [Discord](https://enhance.dev/discord) or [Mastodon](https://fosstodon.org/@enhance_dev).
