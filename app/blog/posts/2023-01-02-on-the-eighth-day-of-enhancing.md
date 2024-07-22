---
title: "On the eighth day of Enhancing: Progressively Enhanced Forms"
image: "/_public/blog/post-assets/eight-milks.jpg"
category: enhance, webdev, webcomponents
description: "Let's progressively enhance our submit button."
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
mastodon: "@macdonst@mastodon.online"
published: "January 2, 2023"
---

![eight milks](/_public/blog/post-assets/eight-milks.jpg)
<small>Original photo by [Mehrshad Rajabi](https://unsplash.com/@mehrshadr) on [Unsplash](https://unsplash.com/s/photos/milk-maids?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
</small>

Day 7 introduced a bunch of new code into our application for handling forms. Today we will make a new progressively enhanced submit button that makes a fetch call to our API when JavaScript is available and uses a form post when it’s not.


## Create a Submit Button

It might be second nature to you by now, but let’s create a new element for our progressively enhanced submit button.

```bash
begin gen element --name submit-button-pe
```

[Enhance form elements](https://github.com/enhance-dev/form-elements) gives us a pretty good starting point for our submit button. Let’s copy the default `submit-button` code into our `app/elements/submit-button-pe.mjs` file:


```javascript
export default function Element({ html }) {
 return html`
<style>
:host button {
 color: var(--light);
 background-color: var(--primary-500)
}
:host button:focus, :host button:hover {
 outline: none;
 background-color: var(--primary-400)
}
</style>
<button class="whitespace-no-wrap pb-3 pt-3 pl0 pr0 font-medium text0 cursor-pointer radius0">
 <slot name="label"></slot>
</button>
`
}
```


Then edit the `app/pages/comments.mjs` file so we use `submit-button-pe` instead of `enhance-submit-button` on line 44. It should look like this:


```html
<submit-button-pe style="float: right"><span slot="label">Save</span></submit-button-pe>
```


When you reload [`http://localhost:3333/comments`](http://localhost:3333/comments) you won’t notice any changes but we are now setup to progressively enhance this button.


## Enhance the Submit Button

We’ve gotten to day 8 of our series and haven’t yet written a line of client-side JavaScript code but that’s about to change. Instead of having our submit button do a form post to the `/comments` endpoint, we will use `fetch` on the browser to submit the new comment. Then we’ll update the DOM with the newly created comment.

We’ll add a `script` tag to our `app/elements/submit-button-pe.mjs` to contain the client-side JavaScript. This is where things will start to look more like a plain vanilla web component. Right after the close `button` tag add the following script tag.


```html
<script>
class SubmitButton extends HTMLElement {
}
customElements.define('submit-button-pe', SubmitButton)
</script>
```


This is all we need to register the `submit-button-pe` component with the browser at runtime.

Then we’ll add a `constructor` method in our `SubmitButton` class:


```javascript
 constructor () {
   super()
   this.submitForm = this.submitForm.bind(this)
   this.addEventListener('click', this.submitForm)
 }
```


In our `constructor`, we call `super` to run the constructor in `HTMLElement` then we bind the `submitForm` method (we’ll write that next) to the current object and add a `click` listener to call `submitForm` whenever the button is clicked.

Now we’ll create the `submitForm` method.


```javascript
 submitForm (e) {
   if ("fetch" in window) {
       e.preventDefault()
       let form = this.closest('form')
       let body = JSON.stringify(Object.fromEntries(new FormData(form)))
       fetch(form.action, {
           method: form.method,
           body,
           headers: {
               "Content-Type": "application/json",
               "Accept": "application/json",
           },
       })
       .then(response => response.json())
       .then(data => {
           const main = document.querySelector('main')
           const details = document.querySelector('details')
           let article = document.createElement('article')
           article.innerHTML = this.createArticle(data)
           main.insertBefore(article, details)
       })
       .catch(error => {
         console.log(error)
       })
   }
 }
```

This function does several interesting things, so let’s enumerate them:

1. We check to see if `fetch` is supported. If not, the component will continue to act like a regular button, and a form post will occur.
2. If `fetch` is supported we prevent the default behavior from happening as we don’t want to double-submit this comment.
3. We walk the DOM to find the closest `form` element.
4. We create a stringified JSON object from the form’s data.
5. Then, we use `fetch` to post the data to our `/comments` endpoint.
6. On a successful response, we convert it to JSON
7. And then, we insert a new `article` into the DOM.

All of this happens without a page load in browsers that support `fetch`. However, if you are running an older browser or something goes wrong with JavaScript the application will still work because it is built HTML first.

<details>

<summary>Full source code of the element</summary>

```javascript
export default function Element({ html }) {
 return html`
<style>
:host button {
 color: var(--light);
 background-color: var(--primary-500)
}
:host button:focus, :host button:hover {
 outline: none;
 background-color: var(--primary-400)
}
</style>
<button class="whitespace-no-wrap pb-3 pt-3 pl0 pr0 font-medium text0 cursor-pointer radius0">
 <slot name="label"></slot>
</button>
<script>
class SubmitButton extends HTMLElement {
 constructor () {
   super()
   this.submitForm = this.submitForm.bind(this)
   this.addEventListener('click', this.submitForm)
 }
 submitForm (e) {
   if ("fetch" in window) {
       e.preventDefault()
       let form = this.closest('form')
       let body = JSON.stringify(Object.fromEntries(new FormData(form)))
       fetch(form.action, {
           method: form.method,
           body,
           headers: {
               "Content-Type": "application/json",
               "Accept": "application/json",
           },
       })
       .then(response => response.json())
       .then(data => {
           const main = document.querySelector('main')
           const details = document.querySelector('details')
           let article = document.createElement('article')
           article.innerHTML = this.createArticle(data)
           main.insertBefore(article, details)
       })
       .catch(error => {
         console.log(error)
       })
   }
 }
 createArticle({comment}) {
   return \`<div class="mb0">
 <p class="pb-2"><strong class="capitalize">name: </strong>\${comment.name}</p>
 <p class="pb-2"><strong class="capitalize">email: </strong>s\${comment.email}</p>
 <p class="pb-2"><strong class="capitalize">subject: </strong>\${comment.subject}</p>
 <p class="pb-2"><strong class="capitalize">message: </strong>\${comment.message}</p>
 <p class="pb-2"><strong class="capitalize">key: </strong>\${comment.key}</p>
</div>
<p class="mb-1">
 <link-element href="/comments/\${comment.key}">

<a href="/comments/\${comment.key}">
 Edit this comment

</a></link-element>
</p>
<form action="/comments/\${comment.key}/delete" method="POST" class="mb-1">
 <submit-button>

<button class="whitespace-no-wrap pb-3 pt-3 pl0 pr0 font-medium text0 cursor-pointer radius0"><span slot="label">Delete this comment</span></button>
   </submit-button>
</form>\`
 }
}
customElements.define('submit-button-pe', SubmitButton)
</script>
`
}
```

</details>

## Next Steps

Tomorrow, we’ll move on to part two of our progressive enhancement. While it is nice to have a single file component containing all of our HTML, CSS and JavaScript, it gets to be a bit difficult writing complex JavaScript in a tag template literal, even with editor extensions for syntax highlighting.
