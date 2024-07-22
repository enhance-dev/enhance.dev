---
title: "Client side State Management with Enhance"
image: "/_public/blog/post-assets/clientside-state-management/store.jpg"
image_alt: "neon Store sign"
photographer: "Manny Becerra"
photographer_url: "https://unsplash.com/@mannyb?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
category: enhance, state management,
description: "Here is an explanation of our recommended client side reactive state management approach if you need one. The client side API pattern has three main parts: 1. Reactive data store to share state changes throughout the app. 2. A web worker to move slow operations like Fetching off the main (UI) thread. 3. An API helper to wrap up these pieces of code and handle message passing between them."
author: 'Ryan Bethel'
avatar: 'ryanbethel.png'
mastodon: "@ryanbethel@indieweb.social"
published: "November 30, 2023"
---

Modern JavaScript frameworks push patterns and tools that are needlessly complicated and unnecessary for most projects.
You probably don't need Redux and GraphQL for a personal blog.
The [Enhance](https://enhance.dev) approach is intentionally different.
You only opt into complexity when it is required.
Unfortunately, because we encourage starting with the simplest approach that can possibly work, some people assume that means Enhance can’t support advanced use cases.
Ryan McNeely wrote an excellent post on his first experience using Enhance.
It is great.
You should [check it out](https://mcneely.online/2023/11/15/ENHANCE.html).

He observed:


> “I would love some sort of semi-opinionated way for stores on the client side.
> The development experience is not suited for an app that must hold a lot of state values or interactivity between components.
> Ultimately for complex apps, I am probably going to need _something_ there.” ([Ryan McNeely post](https://mcneely.online/2023/11/15/ENHANCE.html))

Well, we do have opinions.
So here is an explanation of our recommended client side reactive state management approach if you need one.


## Background

Our overall goal is to build apps that are fast and resilient.
Minimizing reliance on JavaScript helps.
That is why we use an HTML first approach.
This means using real `<form>`s, anchors, and storing state where the platform does (i.e. in the URL).
This foundation should be in place before reactive state management is added.
It may sound like more work to build this way, but it is usually less work.
The opposite approach, adding resilient HTML to an already implemented JavaScript app, is nearly impossible without a full rewrite.


In a working HTML multi-page app (formerly known as just a website) the client state is already stored in the browser with the server as the source or truth.
Browsers store state in:

<dl>
  <dt>Forms</dt> 
  <dd>&lt;form>s are a source of intermediate user data until it is ready to be committed to permanent storage (usually in a database on the server).</dd>

  <dt>URL Path</dt> 
  <dd> Location, resources, and actions</dd>

  <dt>URL Query String</dt> 
  <dd>Key value pairs transmitted to the server (i.e. search parameter)</dd>

  <dt>URL Fragments</dt> 
  <dd>Location within the page (or other browser only UI state). These hash values are kept client side only and are not sent to the server with requests.</dd>
  
  <dt>Session Cookie</dt> 
  <dd>Headers that are sent with requests/responses between the browser and server. They can track logged in status, and other state like active shopping cart items. They persist until they are cleared by the server so are a reliable way to track state across navigation and page reloads.

  <dt>DOM/Document</dt> 
  <dd>State for a specific page, like list items, list order, etc. are stored in the DOM. <dd>

  <dt>Database</dt> 
  <dd>Server side database is the source of truth for all the state. This is where form data goes to persist, and this is where the other application state is derived from if a full page refresh is initiated. <dd>

  <dt>localStorage/indexedDB/etc.</dt> 
  <dd>These client side persistent stores do have uses, but they are usually a last resort. They are not as reliable as server side database and resolving conflicts between the two is complex. <dd>

  <dt>Service Workers</dt> 
  <dd>These can intercept requests and respond with cached resources for improved offline experience or to speed up response time. <dd>
  
  <dt>Cache</dt> 
  <dd>Browsers, CDNs, and servers all have caches to reduce the data that needs to be served with a given request. Often, these are not used directly as a means to store application state, but they are indirectly involved. <dd>

</dl>

JavaScript frameworks don’t trust the DOM.
If a user hits refresh, all is lost.
This is why React developers learn tropes like “Don’t mutate the DOM,” or they are warned not to add elements to the DOM outside the framework.
This is because the state that matters is the virtual DOM, not the real DOM.
We recommend keeping the state of the app in the real DOM.


It also means relying on attributes as the primary reactive API for components.
Custom elements have hooks to run JavaScript when attributes change if needed.
Custom Element surgical DOM updates are inherently scoped to the contents of the custom element in a way that JQuery and document based DOM updates never were.



# Client side State Management

A common enhancement for a CRUD app (Create, Read, Update and Delete) is to avoid full page reloads when submitting form data.
To do this, we need a client side data store.
Since the app is fully functional, we can use the HTML and existing backend routes to minimize this work.
The goal is to:



1. Send data to the server and update the UI without reloading the page
2. Introduce minimal changes to the working HTML
3. Introduce minimal extra JavaScript
4. Avoid stalling the main UI thread with long running tasks

Assuming the CRUD operations are already fully implemented, a typical form post and response is shown below.
The form POSTs to the server, and if there are no errors the response redirects back to the server to GET the updated data.
The simplest approach to enhancing this is to plug in between this exchange with JavaScript.



 
![CRUD Post transaction without JavaScript](/_public/blog/post-assets/clientside-state-management/crud-wo-js.jpg)

We can insert our client side API helper (architecture shown below) to interrupt and handle data updates without page reloads.
The client side API pattern has three main parts:



1. **Reactive data store** to share state changes throughout the app
2. A **web worker** to move slow operations like Fetching off the main (UI) thread
3. An **API helper** to wrap up these pieces of code and handle message passing between them





![CRUD Post transaction with JavaScript and Client side State Management](/_public/blog/post-assets/clientside-state-management/crud-with-js.jpg)


It looks complicated, but this pattern[^1] can be reduced to a very minimal footprint and extended to a large complicated application.



## Client API Handler

The client API handler, represented by the large green circle above, is a wrapper around the required parts.
It creates a clean interface for components to use.
A simplified example including an HTML page with a form is shown below.
The `API` function exposes methods to do the CRUD operations (simplified to just Create for this example) and to subscribe to changes.
In a typical application, the API function would be externalized in its own file so that it can be imported and used in any component that needs access to the state.


The `processForm` function translates between the HTML form values and what the database requires.
HTML forms are flat key value pairs of strings.
The CRUD object may be nested with other types of values like numbers or booleans.
The Enhance approach is to normalize and reshape this form data when it is received by the server using a JSON schema.
With the client side store, we can do the same process in the API function using the same JSON schema.
That normalization is done in the `processForm` function.


```javascript
<h1>Tasks</h1>
<ul>
  <li>First Task</li>
</ul>
<form action="/todos" method="POST">
  <input type="text" name="task"/>
</form>

<script>
  import Store from '@enhance/store'
  function API(){
    const store = Store({tasks:['First Task']})
    let worker =  new Worker('/worker.mjs')
    worker.onmessage = createMutation

    function processForm(form){
      return JSON.stringify(new FormData(form))
    }
    function create(form) {
      const data = processForm(form)
      worker.postMessage({
        data
      })
    }
    function createMutation({ task = '' }) {
      const copy = store.tasks?.slice() || []
      copy.push(task)
      store.tasks = copy
    }
    return {
      create,
      subscribe: store.subscribe,
      unsubscribe: store.unsubscribe
    }
  }

  const api = API()
  const myForm = document.querySelector('form')
  myForm.addEventListener('submit', (event)=> {
    event.preventDefault()
    api.create(myForm)
  })
  const list = document.querySelector('ul')
  api.subscribe(update, ['tasks'])
  function update(tasks){
    list.innerHTML = tasks.map(task => `<li>${task}</li>`).join('')
  }

</script>
```



## Reactive Data Store

The `Store` is a light weight (~100 LOC) reactive data store (`@enhance/store`).
It is abstracted as an npm package because the code does not need to be modified for different projects.
The store is a JavaScript Singleton object that is shared across all components that need access to it.
You can add or modify data in the store by adding a key (i.e. `store.myData = ['one', two']`).
Your components become reactive to that data by subscribing to changes in that key (i.e. `store.subscribe(updateFunc, ['myData'])`).
This works using a JavaScript [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) so that when data is set, the subscribed handlers will be called.
A <code>[requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)</code> is used so that updates are grouped with UI updates for efficiency.
This pattern is simple and can scale to very advanced use cases.



## Web Worker

The whole point of this enhancement over full page reloads is for the UI to remain interactive and stable all the time.
Updating data may require fetching data from the server, which can be slow.
If we can offload this slow work somewhere we can avoid stalling the interactivity of the UI.
Web workers allow us to run a script on an entirely separate thread so that the code in the main thread responsible for our UI remains responsive.
The [Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) does just that.
The code for this worker is externalized into a separate file because the `new Worker()` API loads the code from a URL.
That is why it is represented as a dotted line inside the API in the architectural diagram above.
The messages from the worker are sent from the API and returned there even though the code is run in a different thread as an independent script.


```javascript
// worker.mjs
self.onmessage = work

async function work ({ data }) {
    try {
      const result = await (await fetch(
        `/todos`, {
          body: payload,
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST'
        })).json()

      self.postMessage({
        result
      })
    }
    catch (err) {
      // RESPOND WITH ERROR
      console.error(err)
    }
}
```



## Worker to Client Message State Machine

Web Workers pass messages back and forth between the main thread using the built-in `postMessage`, and respond to messages using the `onmessage` subscription.
In a simple case, we can manually wire these together.
If the worker and the store are doing multiple operations like most CRUD apps there are different messages to route back and forth.
A good way to handle this is with a small state machine using a switch/case to route.
An example is shown below focusing on the message passing between the main thread and the worker (some code has been shortened to simplify the example).


```javascript
// Main Thread Client
// /api.mjs
const CREATE = 'create'
const UPDATE = 'update'
const worker =  new Worker('/worker.mjs')
worker.onmessage = workerResponse
function workerResponse(e) {
  const { data } = e
  const { result, type } = data
  switch (type) {
  case CREATE:
    createMutation(result)
    break
  case UPDATE:
    updateMutation(result)
    break
  }
}
// The create method, used in the application code, sends a message to the worker
function create(data){
  worker.postMessage(data)
}
// The createMutation method handles the response from the worker
function createMutation(result){
  //update store code not shown here
}
```



```javascript
// Worker Client
// /worker.mjs
const CREATE = 'create'
const UPDATE = 'update'
self.onmessage = stateMachine
async function stateMachine ({ data }) {
  const { data: payload, type } = data
  switch (type) {
  case CREATE:
    createFetch(payload)
    break
  case UPDATE:
    updateFetch(payload)
  }
}
function createFetch(payload){
  // fetch code not shown here
  self.postMessage(result)
}
```


The worker handles the Create and Update keeping them straight by using the `type` property in the switch/case.
With this method we can add more operations while keeping the code organized.



## Optimistic UI updates

An additional optimization that can be made is to let the UI respond to data changes optimistically instead of waiting for the server to respond.
In the above example, a `create` is started using the data given by the user.
That data is then passed to the worker which sends it to the server where it is added to the database.
Now let's consider the `delete` operation.
One way to make the UI feel very fast is for deleted data to disappear instantly.
In reality, for the data to be fully deleted, the worker must make a `fetch` request to the `/things/{id}/delete` route and wait for confirmation.
That takes some time.
We can implement optimistic delete by having the `API.delete(key)`:



1. Delete the item from the client side store and put it in a `deletedItems` list in the store.
2. Request the worker to do the fetch to delete on the server.
3. If the worker receives a success response, nothing else happens.
4. If the worker receives a failure or error the store delete is reverted by pulling it off the `deletedItems` and restoring it to the store.


## Conclusion

For an SPA (Single Page App) the client side state management is the heart of the application.
But if you build a resilient HTML first app you might not even need JavaScript based client side state management.
It can be a valuable enhancement to make the UI a little faster, but it is an anti-pattern to let it drive the app's architecture.
The pattern for client side state management above is simple, flexible, and scalable.
You can add it to a working app easily. To see a full example of this pattern check out the [enhance state management](https://github.com/enhance-dev/enhance-state-management) example repository.


[^1]: This pattern was developed by Kristofer Joseph for use on the original Begin.com website.
