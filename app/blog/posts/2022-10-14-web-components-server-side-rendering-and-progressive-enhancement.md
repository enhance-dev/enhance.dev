---
title: "Web Components, Server Side Rendering and Progressive Enhancement, Oh My!"
image: '/_public/blog/post-assets/yellow-brick.jpg'
category: uncategorized
description: There seems to be a bit of confusion these days about how it is possible to progressively enhance web components since they need JavaScript to function properly. Well, that’s where server-side rendering comes in. Follow along as we build a counter component using web fundamentals.
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
published: 'October 14, 2022'
---

![yellow brick road](/_public/blog/post-assets/yellow-brick.jpg)

<small>Photo by <a href="https://unsplash.com/es/@anphotos?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Akshay Nanavati</a> on <a href="https://unsplash.com/s/photos/yellow-brick-road?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></small>

There seems to be a bit of confusion these days about how it is possible to [progressively enhance](https://en.wikipedia.org/wiki/Progressive_enhancement) web components since they need JavaScript to function properly. Well, that’s where server-side rendering comes in. Follow along as we build a counter component using web fundamentals and progressively enhance it with server-side rendering via [Enhance](https://enhance.dev/docs/).

## Prerequisites

Install the Begin CLI by opening your terminal and entering the following command:

* Mac, Linux: `curl -sS https://dl.begin.com/install.sh | sh`
Then follow the printed instructions to add Begin to your $PATH.
* Windows: `iwr https://dl.begin.com/install.ps1 -useb | iex`

Create a new Enhance project:

```bash
begin new project --path ./counter-project
cd counter-project
```

## Building a counter component

To illustrate how to progressively enhance a web component we’ll choose a simple example. Our component will be a counter allowing us to increment or decrease the value shown.

To start, we’ll create a new custom element and a page by executing the following commands:

```bash
begin new element --name state-counter
begin new page --path counter
```

Open up the file `app/elements/state-counter.mjs` and add the following code.

```javascript
// app/elements/state-counter.mjs
export default function StateCounter({ html, state }) {
 const { store } = state
 let { value = 0 } = store
 return html`
 <style>
   * {
     font-size: 200%;
   }

   span {
     width: 4rem;
     display: inline-block;
     text-align: center;
   }

   button {
     width: 6rem;
     border: none;
     border-radius: 10px;
     background-color: seagreen;
     color: white;
     display: flex;
     justify-content: center;
     align-items: center;
   }
 </style>
<div>
   <form method="POST" class="flex">
       <button class="decrement" formaction="/counter?action=dec">-</button>
       <p>${value}</p>
       <input type="hidden" name="value" value="${value}"/>
       <button class="increment" formaction="/counter?action=inc">+</button>
   </form>
</div>
`
}
```

You’ll notice that in this version of the custom element we are only using HTML and CSS, but don’t worry — we’ll get to adding in some JavaScript once we make sure our component works for as many people as possible.

We are using the venerable `form` element and a couple of `button` elements to provide interactivity. Both buttons will post the form data to the same API endpoint controlling whether to increment or decrement the value via an `action` query parameter.

Next open the file `app/pages/counter.html` and replace the contents with:

```html
<state-counter></state-counter>
```

Now that we have our basic component and a page that uses it, let’s fire up our local development environment to check it out. Run `begin dev` and open up your web browser to [http://localhost:3333/counter](http://localhost:3333/counter) and you should see something like this:

![count](/_public/blog/post-assets/count.png)

Try clicking the `-` or `+` button and observe what happens. Nothing, well, almost nothing. If you observe closely, you’ll notice that the page reloads. This makes sense because we are posting our form data to an API endpoint we haven’t created yet.

## Creating an API endpoint

Since our custom element doesn’t depend on JavaScript to increment/decrement its value we’ll need to make an API call to do the work for us. Run the following command to create our `/counter` API route:

```bash
begin new api --path /counter
```

Then open up the newly created API file `app/api/counter.mjs` and replace its contents with the following:

```javascript
// app/api/counter.mjs
export async function post (req) {
 let { value } = req.body
 const { action } = req.query
 value = parseInt(value)
 action === 'inc' ? value += 1 : value -= 1
 return {
   session: { value },
   location: '/counter'
 }
}

export async function get (req) {
 let { value = 0 } = req.session
 return {
   session: {},
   json: { value },
 }
}
```

Clicking on one of our custom element’s buttons makes a call to `POST /counter` which is handled by the API route’s `post` method. A quick overview of this method:

1. Pulls the current value of the web component from the posted form data.
2. Determines whether to increase or decrease the value.
3. Puts the updated value into the session
4. Redirects the browser back to `/counter` \

> Always redirect after a form post to prevent double form submission and proper back-button behavior.

When the `/counter` page is loaded, our API file's `get` method is executed to provide data to our page. In this method, we:

1. Pull the updated value from the session
2. Clear the value from the session
3. Update our store with the new value.

Now clicking on our form buttons refreshes the page with the correct value.

![counting](/_public/blog/post-assets/counter.gif)

We’ve established baseline functionality for our custom element without any client-side JavaScript. In our next step we’ll progressively enhance the element to provide a better user experience.

## Progressive Enhancement

> Progressive enhancement is a design philosophy that provides a baseline of essential content and functionality to as many users as possible while delivering the best possible experience only to users of the most modern browsers that can run all the required code. In contrast, graceful degradation is a design philosophy that centers around trying to build a modern website/application that will work in the newest browsers but falls back to an experience that — while not as good — still delivers essential content and functionality in older browsers.

In our `app/elements/state-counter.mjs` file, we will add some code that will run in the browser when JavaScript is available. After the closing `div` tag in `app/elements/state-counter.mjs` add the following `script` tag:


```html
<script type="module">
   class StateCounter extends HTMLElement {
       constructor() {
           super()
           this.p = this.querySelector('p')
           this.input = this.querySelector('input')
           this.value = parseInt(this.getAttribute('value'))

           this.decrementButton = this.querySelector('.decrement')
           this.incrementButton = this.querySelector('.increment')

           this.decrementButton.addEventListener('click', (evt) => this.decrement(evt))
           this.incrementButton.addEventListener('click', (evt) => this.increment(evt))
       }
       static get observedAttributes() {
           return ['value']
       }
       decrement(evt) {
           evt.preventDefault()
           this.value -=  1
           this.setAttribute('value', this.value)
       }
       increment(evt) {
           evt.preventDefault()
           this.value += 1
           this.setAttribute('value', this.value)
       }
       attributeChangedCallback(name, oldValue, newValue) {
           if (oldValue !== newValue) {
               if (name === 'value') {
                   this.p.textContent = newValue
                   this.value = parseInt(newValue)
                   this.input.value = parseInt(newValue)
               }
           }
       }
   }
   customElements.define('state-counter', StateCounter)
</script>
```

In our enhanced custom element we register a couple of click event listeners to respond to the increment and decrement buttons. These event listeners prevent the default form submit action so the add/subtract functionality can proceed without a round trip to our server.

### Demo

Open a browser tab to [https://1v1norge03.execute-api.us-west-2.amazonaws.com/counter](https://1v1norge03.execute-api.us-west-2.amazonaws.com/counter) and experiment with the counter. Try enabling and disabling JavaScript to see how the functionality works in both scenarios. Open your browser tools and observe how the network tab behaves when JavaScript is enabled and disabled.

You can also browse the [source code](https://github.com/macdonst/counter-project).

## Why go to all this trouble?

At this point you might be wondering why you would do all this extra work to build a component using progressive enhancement techniques? You may be thinking that it’s not worth the effort because everyone has JavaScript enabled but  there are a [myriad of reasons that may not be the case](https://kryogenix.org/code/browser/everyonehasjs.html). As you can see from that list some of those reasons are under the user’s control but many are not. The global average of browsers without JavaScript available hovers between 1-2%. That may not seem like a lot but it quickly adds up.

Some reasons to go the progressive enhancement route when building web components include:

1. Accessibility - semantic HTML, by its nature, is more accessible than markup created by JavaScript
2. Backwards compatibility - HTML you wrote 10 years ago still works today
3. Performance - your HTML will be immediately usable by your users

Then we progressively enhance our custom element with JavaScript to add more advanced client-side functionality.
