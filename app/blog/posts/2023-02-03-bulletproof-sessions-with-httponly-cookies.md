---
title: "Bulletproof Sessions with HttpOnly Cookies"
image: "/_public/blog/post-assets/cookies.jpg"
category: enhance, webdev, webcomponents
description: "When you visit a website, by default, it doesn’t remember anything about you. HTTP is a stateless protocol. Sessions are a way for a website to remember things about you, like if you’re logged in or what’s in your shopping cart."
author: 'Brian Leroux'
avatar: 'brian.jpg'
twitter: "brianleroux"
mastodon: "@brianleroux@indieweb.social"
published: "February 3, 2023"
---

![Cookies](/_public/blog/post-assets/cookies.jpg)
<small>Original photo by [Hermes Rivera](https://unsplash.com/@picoftasty) on [Unsplash](https://unsplash.com/photos/ppOPjqAJ3Mw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
</small>

When you visit a website, by default, it doesn't remember anything about you - it's like starting a new conversation every time you go to the website or even loading a new page on the same website you are already visiting. HTTP is a stateless protocol. What if you want the website to remember something about you? That's where sessions come in. Sessions are a way for a website to remember things about you, like if you're logged in or what's in your shopping cart.

In this post, we'll talk about implementing sessions with HttpOnly cookies. HttpOnly cookies are the best way to ensure that your session data is safe and secure. We'll talk about why they're important and how to use them to create a session from scratch. It's a great way to add an extra layer of security to your website, and it's easier than you might think.


## Cookies

A cookie is a small piece of data that a website stores on a user's computer. This data is then sent back to the website with every subsequent request, allowing the website to remember things like user preferences or login status. At the end of the day, a `Cookie` is an HTTP request header, and writing a cookie is accomplished with the HTTP response header `set-cookie`.

By default, cookies are sent back and forth between the browser and the server in plain text, making them vulnerable to theft by hackers. To help mitigate this risk, you can set the "HttpOnly" flag on a cookie. This flag tells the browser that the cookie should only be sent back to the server via HTTP requests and will not be accessible to client-side scripting such as JavaScript. In addition to HttpOnly, you can set the "Secure" flag on a cookie. This flag tells the browser that the cookie will only be sent over secure connections (i.e. HTTPS). The "Secure" flag helps to prevent the cookie from being intercepted by a hacker who may be listening in on an unsecured connection.

When combined, HttpOnly and secure cookies provide a powerful defense against session hijacking. By keeping session data away from client-side scripts and encrypting it during transit, you can protect your users from a wide range of security threats. By taking the time to implement these security measures correctly, you'll be able to rest assured that your users' data is well-protected.


## Implementing a session with set-cookie

Most frameworks, Enhance included, already bake in a session functionality you should use for most cases. That code is open source, has been audited by thousands, and has more affordances for better security. The following code is only for an example to learn about how sessions work.


## A counter example

A great use for session state is forms. Let's implement a bare bones counter to demonstrate.

Start by creating a new Enhance project:

```bash
npm create @enhance ./counter-example
```

Create a basic custom element for debugging in `app/elements/my-debug.mjs`. Sometimes folks are disturbed by the `.mjs` but it really is not a big deal: this tells Node.js we’re using ES Modules instead of the older Common JS module system.

<begin-code filename="app/elements/my-debug.mjs">

```javascript
export default function debug ({html, state}) {
 return html`<pre>${JSON.stringify(state, null, 2)}</pre>`
}
```

</begin-code>

Next, delete everything in `app/pages/index.html` and replace it with a basic form, and our debugger element:

<begin-code filename="app/pages/index.html">

```html
<form action=/count method=post>
 <button>go</button>
</form>
<my-debug></my-debug>
```

</begin-code>


Next, add some API routes to manage the data aspect of our counter. First, lets display the raw cookies in our debugger by creating an API route at `app/api/index.mjs`:

<begin-code filename="app/api/index.mjs">

```javascript
export async function get (req) {
 return {
   json: { cookies: req.cookies }
 }
}
```

</begin-code>


This code passes the HTTP request Cookies (`req.cookies`) right back to the client as JSON. Enhance API routes that match Page routes will automatically populate `state`. Nice!

And finally, we’ll implement an HTTP POST handler for incrementing the count at `app/api/count.mjs`:

<begin-code filename="app/api/count.mjs">

```javascript
export async function post (req) {
 // Max-Age wants seconds; this is five min in seconds
 let max = 60 * 5

 // we need to  parse the raw request cookie to find it
 // the cookie we care about is named 'count'
 let count = 0

 // req.cookies looks like this: ['cookie1=value', 'cookie2=value']
 for (let c of req.cookies) {
   let [key, value] = c.split('=')
    if (key === 'count') {
     // cookies are HTTP headers, which are strings, so we need to cast value to Number
     count = Number(value) + 1
     break
   }
 }

 return {
   statusCode: 303,
   headers: {
     'location': '/',
     'set-cookie': `count=${count}; Max-Age=${max}; Secure; HttpOnly`
   }
 }
}
```

</begin-code>

This is a lot of boilerplate you won’t need with built-in sessions but it is valuable for you to understand how things work so you can use an abstraction with confidence. We start out with some helpful default values. Max-Age is how long we want our cookie to live and count is the cookie value we’re interested in for this reduced example.

As you may remember, the HTTP request has a helpful `req.cookies` collection. But the cookies are key/value pairs separated by `=` so we have to parse that data out. Once we find the cookie we’re looking for, on line 15, we have to cast it to a Number before incrementing it because cookies are headers and headers are a bunch of String values. With all that work done we’re ready to write the cookie on the response and redirect to the home page.

Run the example with `npm start`, and submit the form to watch your cookie increment. Pretty cool!

While our session cookie is both `Secure` and `HttpOnly` you probably noticed the values are still in plain text. To further lock this down there are two strategies: signing and encrypting the cookie value for ‘stateless’ sessions and/or using database backed sessions and only storing a UUID in the cookie itself. Both techniques work fine, and even better can be combined.

Database sessions are nice because you can control invalidation and aren’t limited by the size of cookie. Stateless sessions are nice because they don’t involve more moving parts like a database. Good frameworks, like Enhance, support both.

In our next section we’ll look at the Enhance built-in session which does all the aforementioned work for you to build a very basic login flow.


# Implementing a basic login flow on top of session

Let's use the built-in session to implement a single-player login flow. No need for complicated authentication vendors for simple use cases like locking down a personal site or frankly even OAuth.


## Start with pages

**_HTML-first_** means starting with HTML pages! We have two routes: `app/pages/index.html` and `app/pages/protected.html` respectively.

<begin-code filename="app/pages/index.html">

```html
<app-header></app-header>
<please-login></please-login>
<app-footer></app-footer>
```

</begin-code>


<begin-code filename="app/pages/protected.html">

```html
<app-header></app-header>
<sensitive-information></sensitive-information>
<app-footer></app-footer>
```

</begin-code>



## Create custom elements

Let's flesh out the implementation.

<begin-code filename="app/elements/app-header.mjs">

```javascript
export default function header ({ html }) {
 return html`
   <h1>app header</h1>
   <app-navigation></app-navigation>
 `
}
```

</begin-code>


The header is pretty straightforward HTML code which itself embeds a custom element called `<app-navigation>` we will look at that next:

<begin-code filename="app/elements/app-navigation.mjs">

```javascript
export default function nav ({ html, state }) {
 let links = [
   '<a href=/ class=underline>home</a>'
 ]
 if (state.store.authorized) {
   links.push('<a href=/protected class=underline>protected</a>')
 }
 return html`
   <nav>${ links.join('') }</nav>
 `
}
```

</begin-code>


This code is a little more interesting. We create an array of links to render in a standard `<nav>` element. If `state.store.authorized` then the array will include a link to `/protected`.

<begin-code filename="app/elements/please-login.mjs">

```javascript
export default function plsLogin ({ html, state }) {
 let login = `<form method=post action=/login>
   <input type=password name=password placeholder='enter secret'>
   <button>login</button>
 </form>`
 let logout = `<form method=post action=/logout>
   <button>logout</button>
 </form>`


 return html`<section>${ state.store.authorized? logout : login }<section>`
}
```

</begin-code>


The `<please-login>` element is similar, rendering a logout form if the `state.store.authorized` and a login form if not authorized.

<begin-code filename="app/elements/sensitive-information.mjs">

```javascript
export default function protec ({ html }) {
 return html`<p>important information</p>`
}
```

</begin-code>


The final element `<sensitive-information>` is just placeholder content we will protect from our backend API routes in the next section.


## API routes

App business logic belongs in API route handlers. I like to start with GET handlers, but do what works for you.

<begin-code filename="app/api/index.mjs">

```javascript
export async function get (req) {
 let authorized = !!(req.session.authorized)
 return { json: { authorized } }
}
```

</begin-code>


The index route handler grabs `req.session.authorized` and ensures we get a boolean value from it even if the session value isn’t yet defined. We pass that to the `index.html` page store by returning JSON.

<begin-code filename="app/api/protected.mjs">

```javascript
export async function get (req) {
 let authorized = !!(req.session.authorized)
 if (!authorized) {
   return { location: '/' }
 }
 return {
   json: { authorized }
 }
}
```

</begin-code>


The protected page also looks at `req.session.authorized` and immediately returns to the index page if it isn’t truthy. If it is truthy, we’re authorized, and can send that information to the `protected.html` page store.

<begin-code filename="app/api/login.mjs">

```javascript
export async function post (req) {
 let authorized = req.body.password === process.env.SECRET_PASSWORD
 return {
   location: '/protected',
   session: { authorized }
 }
}
```

</begin-code>


Seven lines of code! To implement authentication we hide the password in the backend in an environment variable. Env vars are a great place to store sensitive secrets like configuration information. You can set the environment variable locally by creating a `.env` file with something like `SECRET_PASSWORD=mypassword`.

<begin-code filename="app/api/logout.mjs">

```javascript
export async function post () {
 return {
   location: '/',
   session: { authorized: false }
 }
}
```

</begin-code>


Logging out by setting the session value authorized to `false` and redirecting back home.


## Summary

HttpOnly cookies are a great building block for better security by not leaking sensitive information to potentially insecure client browser environments. Enhance built-in session support makes building stateful flows a snap!


## Further resources

Full source for the raw `set-cookie` example can be found here: [https://github.com/brianleroux/enhance-example-impl-session](https://github.com/brianleroux/enhance-example-impl-session)

Full source code for the single player auth can be found here:

[https://github.com/brianleroux/enhance-example-single-player-auth](https://github.com/brianleroux/enhance-example-single-player-auth)

See also:

[https://begin.com/blog/posts/2022-08-25-progressively-enhancing-form-submissions-with-web-components](https://begin.com/blog/posts/2022-08-25-progressively-enhancing-form-submissions-with-web-components)

For real contrast, check out a way to do the same thing with AWS:

[https://aws.amazon.com/blogs/security/reduce-risk-by-implementing-httponly-cookie-authentication-in-amazon-api-gateway/](https://aws.amazon.com/blogs/security/reduce-risk-by-implementing-httponly-cookie-authentication-in-amazon-api-gateway/)
