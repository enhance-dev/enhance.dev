---
title: "Module 8: Sessions and Simple Authentication"
---

[Module Index](/enhance-workshop)

# Module 8: Sessions and Simple Authentication

## Outline

- What are Sessions
- HTTP Only Cookies
- Enhance Sessions
- Simple Auth with Sessions


## Sessions
We are missing a few tools to finish our CRUDL routes from the last module.
We need a way to maintain a persistent state between the request and responses back and forth between the browser and the server.
Sessions give us that.
They are the best way to add authentication and to close the loop on form validation from the server.

When you visit a website, by default, it doesn't remember anything about you - it's like starting a new conversation every time you go to the website or even loading a new page on the same website you are already visiting.
HTTP is a stateless protocol.
What if you want the website to remember something about you?
That's where sessions come in.
Sessions are a way for a website to remember things about you, like if you're logged in or what's in your shopping cart.

Enhance implements sessions with HttpOnly cookies.
HttpOnly cookies are the best way to ensure that your session data is safe and secure.


## Cookies

A cookie is a small piece of data that a website stores on a user's computer.
This data is then sent back to the website with every subsequent request.
This allows the website to remember things like user preferences or login status.
At the end of the day, a `Cookie` is an HTTP request header, and writing a cookie is accomplished with the HTTP response header `set-cookie`.

By default, cookies are sent back and forth between the browser and the server in plain text, making them vulnerable to theft by hackers.
To help mitigate this risk, you can set the "HttpOnly" flag on a cookie.
This flag tells the browser that the cookie should only be sent back to the server via HTTP requests and will not be accessible to client-side scripting such as JavaScript.
In addition to HttpOnly, you can set the "Secure" flag on a cookie.
This flag tells the browser that the cookie will only be sent over secure connections (i.e. HTTPS).
The "Secure" flag helps to prevent the cookie from being intercepted by a hacker who may be listening in on an unsecured connection.

When combined, HttpOnly and secure cookies provide a powerful defense against session hijacking.
By keeping session data away from client-side scripts and encrypting it during transit, you can protect your users from a wide range of security threats.
By taking the time to implement these security measures correctly, you'll be able to rest assured that your users' data is well-protected.


## Implementing a session with set-cookie

Lets look at how we might build a session out of cookies for our app.

Add an API route at `/app/api/cookie.mjs` with the following:

```javascript
// filename="app/api/cookie.mjs
export async function get (req) {
 return {
   headers: {
     'set-cookie': `chocolate-chip="yummy"; Max-Age=60; Secure; HttpOnly`
   },
   json: { cookies: req.cookies }
 }
}
```

Now to get a confirmation that our cookie is set add the following page at `/app/pages/cookie.mjs`


```javascript
// app/pages/cookie.mjs
export default function cookie ({html, state}) {

 return html`
 <pre>${JSON.stringify(state.store, null, 2)}</pre>`
}
```

When you first hit the `/cookie` route the server will send a cookie to the user.
The first time through it is sent to the browser.
Then when you refresh the page it is sent back with that request and it show up in the `req.cookies` and is displayed on the page.

## Enhance Sessions

Enhance has session functionality built-in using `set-cookie` behind the scenes. That code is open source, has been audited by thousands, and has more affordances for better security.

Lets check it out.

Add the following lines to the same `/app/api/cookies.mjs` file:

```javascript
// filename="app/api/cookie.mjs
export async function get (req) {
 return {
   session: { peanutbutter: "delicious"},
   headers: {
     'set-cookie': `chocolate-chip="yummy"; Max-Age=60; Secure; HttpOnly`
   },
   json: { cookies: req.cookies, session: req.session}
 }
}
```

Again the first request will set the cookies and to see what was set you refresh the page.

We started with this simple example to show that there is no real magic in sessions. You could reimplement it yourself on every app and every route but that would be a lot of boilerplate code you can avoid writing by using built-in sessions.

While our session cookie is both `Secure` and `HttpOnly` you probably noticed the values are still in plain text while the built in session is not readable in the cookie itself.
Enhance sessions are further locked down with two strategies: signing and encrypting the cookie value for ‘stateless’ sessions and/or using database backed sessions and only storing a UUID in the cookie itself.
Both techniques work fine, and even better can be combined.

Database sessions are nice because you can control invalidation and aren’t limited by the size of cookie.
Stateless sessions are nice because they don’t involve more moving parts like a database.

Enhance, supports both.

# Implementing a basic login flow on top of session

Getting back to the portfolio we are building one of the things that we need sessions for is authentication.
We want any guests to be able to see the portfolio, résumé, and link tree pages, but we don't want them to be able to create new links.

To restrict the CRUDL routes we will use sessions. For this we will build a simple single player authentication.

Lets build a login page

```html
<!-- /app/pages/login.html -->
<enhance-page-container>
  <main>
        <enhance-form action="/login" method="post" >
            <enhance-text-input
              label="Password"
              id="password"
              name="password"
              type="password"
            ></enhance-text-input>
              <enhance-submit-button><span slot="label">Log in</span></enhance-submit-button>
        </enhance-form>
  </main>
</enhance-page-container>
```

Now we need to add the API route for this to post to.


```javascript
// /app/api/login.mjs
export async function post (req) {
 let authorized = req.body.password === process.env.SECRET_PASSWORD
 return {
   location: '/',
   session: { authorized }
 }
}
```

This log in process uses a password stored in an environment variable. In a later module we will talk about how to set environment variables for production. But for local development we can use a `.env` file too do it.

Create a `.env` file and paste the following in it.
```bash
SECRET_PASSWORD="secret"
```

Make sure that this file is in your `.gitignore` so that it will not be checked into GitHub.

Now you are ready to log in.

To be able to log out we add a post route for `/logout`

```javascript
// /app/api/logout.mjs
export async function post (req) {
 return {
   location: '/',
   session: {}
 }
}


// For local dev it is convenient to be able to logout using a get route
export async function get () {
  const env = process.env.ARC_ENV
  if (env !== 'staging' && env !== 'production') {
    return {
      session: {},
      location: '/'
    }
  } else {
    return {
      code: 404
    }
  }
}

```

Notice that in production there is only a POST route for logout. For debugging it is nice to be able to use a GET route.

The previous code will clear the session entirely.
If there are possibly values in the session that you want maintained you can just clear the login state as follows.



```javascript
// /app/api/logout.mjs
export async function post (req) {
 const {authorized:removeAuthorized, ...newSession} = req.session
 return {
   location: '/',
   session: newSession
 }
}
```

## Using Session state to protect routes

Now we have a session that will persist with each request for that user unless cleared by the server.
With this we can verify the authentication status for any other pages.
The `req.session.authorized` property can be checked in any API route.
If we have a `protected` route that only the the owner should see we check the status and redirect to the login page if not authorized.

```javascript
// /app/api/protected.mjs
export async function get (req) {
 let authorized = !!(req.session.authorized)
 if (!authorized) {
   return { location: '/login' }
 }
}
```

Some pages may not be fully restricted but just have mixed content for an authenticated user.
In this case you don't have to redirect if not authorized.
Instead we will pass the `authorized` property to the page.

```javascript
// /app/api/mixed-content.mjs
export async function get (req) {
 let authorized = !!(req.session.authorized)
 return {
   json: { authorized }
 }
}
```

And in the page we can use that `authorized` property to control what content is shown.

```javascript
// /app/pages/mixed-content.mjs
export default function mixed({html, state}){
return html`
${state.store.authorized ? `<form method=POST action=/logout><button>logout</button></form>` : ''}
<main>Hello</main>
`
}
```

In the case of a POST request we usually want to respond with a "Not Authorized" status code instead of redirecting.

```javascript
// /app/api/protected.mjs
export async function post (req) {
 let authorized = !!(req.session.authorized)
 if (!authorized) return { status: 401 }
 return { json: data }
}
```

We could add these few lines of code to all our CRUDL routes which would not be too bad.
But there is a better way.
Enhance has an affordance for lightweight middleware.
Lets use that to add auth checks to our protected routes.

## Authentication Middleware

In an API handler we can export an array of handlers instead of one function.

We can rewrite the handler as shown below to share the authentication logic.

```javascript
// /app/api/links.mjs
import { getLinks, upsertLink } from '../models/links.mjs'
import { checkAuth } from '../lib/check-auth.mjs'

export const get = [checkAuth,listLinks]
export const post = [checkAuth,postLinks]

export async function listLinks (req) {
  const links = await getLinks()
  return {
    json: { links }
  }
}

export async function postLinks (req) {
  await upsertLink(req.body)
  return {
    location: '/links'
  }
}
```

For more info check out the [Enhance Docs](https://enhance.dev/docs/learn/concepts/routing/api-routes#middleware)

We can write a `check-auth.mjs` middleware function and add it to our protected routes.

Copy and paste the middleware below into `/app/lib/check-auth.mjs`.

```javascript
export async function checkAuth(req) {
  const session = req.session
  const authorized = session?.authorized ? session?.authorized : false

  if (!authorized){
    if (req.method === 'GET') {
      return {
        location: '/login'
      }
    }
    return {
      status: 401
    }
  }
}

```


Now do the same for the other two protected routes at `/app/api/links/$id.mjs` and `/app/api/links/$id/delete.mjs`.

Finally our protected routes are actually protected.

## Auth Status in HTML pages

The Authentication check used here protects an unauthorized user from ever seeing a page. In some cases you will want users to be able to access a page either way with UI changes depending on their auth status. This may be an avatar in the header or a log out button only shown if they are authenticated. For that we need to pass the `authorized` property from the `session` to the page using the store.

We can do that in each of the API routes by grabbing authenticated from the session and returning it in the `json` so that it is available in the `state.store`.

This is actually tricky to do with middleware because if we want to add something to the response we need to hang it on the request and pull it off at the end of the middleware chain.

If an early middleware returns something it will send the response immediately and short circuit any other middleware.

Another problem with using the API for this is that if our page does not need an API we will have to add it just to pass the authorized status.

So the solution for this ends up being something we have already seen. We can use the `head.mjs` to get the `req.session.authorized` and put it in the `state.store.authorized` to make it available in every page.

Lets add a logout button to our `nav-bar` using this approach.

Add the following code in the `head.mjs` (only the top of the file is show).

```javascript
// code removed ...
export default function Head(state) {
  const { req, store } = state
  const { path, session } = req

  if (store.authorized === undefined) {
    store.authorized = session.authorized || false
  }
  if (store.path === undefined) {
    store.path = path
  }
  // code removed ...

```

Now we can go back to our `/app/elements/nav-bar.mjs` and add the log out button.

```html
  <ul class='mis-auto flex gap0 list-none text-1 uppercase tracking1 font-semibold'>
    <li><a href='/'>Home</a></li>
    <li><a href='/resume'>Résumé</a></li>
    <li><a href='/linktree'>Links</a></li>
    ${state.store?.authorized ?
    `<li><form method="POST" action="/logout"> <button>Log Out</button></form></li>` : ''}
  </ul>
```

Now we have pretty bullet proof authentication for our portfolio site.
This would need some more features for a site with many authorized users.

We have extensive examples to follow for all of the most common types of authentication that you can find in our [Auth Series](https://begin.com/blog/posts/2023-05-10-why-you-should-roll-your-own-auth).

In the next module we will add the finishing touches on our CRUDL routes using session to handle validation problems.
