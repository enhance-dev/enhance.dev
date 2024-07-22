---
title: "On the ninth day of Enhancing: Externalizing Scripts"
image: "/_public/blog/post-assets/dancing.jpg"
category: enhance, webdev, webcomponents
description: "To improve developer experience let's externalize some scripts."
author: 'Simon MacDonald'
avatar: 'simon.png'
twitter: "macdonst"
mastodon: "@macdonst@mastodon.online"
published: "January 3, 2023"
---

![dancing](/_public/blog/post-assets/dancing.jpg)
<small>Original photo by [Ardian Lumi](https://unsplash.com/@ardianlumi) on [Unsplash](https://unsplash.com/s/photos/dancing?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
</small>

Yesterday, we progressively enhanced our submit button to enable a better user experience when JavaScript is enabled. Unfortunately, the more complicated your single-file component becomes, the worse the developer experience becomes, as it’s hard to write JavaScript in a tagged template literal, even with modern developer tools. Today we’ll break this single-file component into separate files for a better developer experience.


## Externalizing the script tag

First, create a new file `public/submit-button-pe.mjs`. Then cut the contents of the `script` tag from `app/elements/submit-button-pe.mjs` and paste it into `public/submit-button-pe.mjs`. You will also need to add `export default` to the class definition. Here’s what the source would look like:


```javascript
export default class SubmitButton extends HTMLElement {
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
   return `<div class="mb0">
   <p class="pb-2"><strong class="capitalize">name: </strong>${comment.name}</p>
   <p class="pb-2"><strong class="capitalize">email: </strong>s${comment.email}</p>
   <p class="pb-2"><strong class="capitalize">subject: </strong>${comment.subject}</p>
   <p class="pb-2"><strong class="capitalize">message: </strong>${comment.message}</p>
   <p class="pb-2"><strong class="capitalize">key: </strong>${comment.key}</p>
 </div>
 <p class="mb-1">
   <link-element href="/comments/${comment.key}">

 <a href="/comments/${comment.key}">
   Edit this comment

 </a></link-element>
 </p>
 <form action="/comments/${comment.key}/delete" method="POST" class="mb-1">
   <submit-button>

 <button class="whitespace-no-wrap pb-3 pt-3 pl0 pr0 font-medium text0 cursor-pointer radius0"><span slot="label">Delete this comment</span></button>
     </submit-button>
 </form>`
 }
}
customElements.define('submit-button-pe', SubmitButton)
```


Then update the `script` tag in `app/elements/submit-button-pe.mjs` to point to our externalized JavaScript file:


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
<script type="module" src="/_public/submit-button-pe.mjs"></script>
`
}
```


Play around with [http://localhost:3333/comments](http://localhost:3333/comments) you won’t notice any changes in the browser, but your developer experience will be way better now that you are not editing JavaScript in a tagged template literal.


## What about that ugly `createArticle` method?

Oh right, I was hoping you wouldn’t notice that, but you are too smart for me. Let’s clean that up by extracting it into it’s own web component.

Create a new file `public/comment-article.mjs` and populate it with the following code;


```javascript
export default class CommentArticle extends HTMLElement {
 connectedCallback() {
   const name = this.getAttribute('name') || ''
   const email = this.getAttribute('email') || ''
   const subject = this.getAttribute('subject') || ''
   const message = this.getAttribute('message') || ''
   const key = this.getAttribute('key') || ''
   this.innerHTML = `<div class="mb0">
     <p class="pb-2"><strong class="capitalize">name: </strong>${name}</p>
     <p class="pb-2"><strong class="capitalize">email: </strong>${email}</p>
     <p class="pb-2"><strong class="capitalize">subject: </strong>${subject}</p>
     <p class="pb-2"><strong class="capitalize">message: </strong>${message}</p>
     <p class="pb-2"><strong class="capitalize">key: </strong>${key}</p>
   </div>
   <p class="mb-1">
     <link-element href="/comments/${key}">

   <a href="/comments/${key}">
     Edit this comment

   </a></link-element>
   </p>
   <form action="/comments/${key}/delete" method="POST" class="mb-1">
     <submit-button>

   <button class="whitespace-no-wrap pb-3 pt-3 pl0 pr0 font-medium text0 cursor-pointer radius0"><span slot="label">Delete this comment</span></button>
       </submit-button>
   </form>`
 }
}
customElements.define('comment-article', CommentArticle)
```


Creating the UI is still ugly but now it’s divorced from our `submit-button-pe`. Over in `app/elements/submit-button-pe.mjs` we’ll add another `script` tag so we can use this component. Right above the existing `script` tag add the line:


```html
<script type="module" src="/_public/comment-article.mjs"></script>
```


Finally we’ll update `public/submit-button-pe.mjs` to use the `create-article` component instead of the `createArticle` method. We’ll delete the `createArticle` method and then instead of setting the `innerHTML` of the `article` we’ll create a `create-article` component and set it’s attributes programmatically.


```javascript
export default class SubmitButton extends HTMLElement {
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
       .then(({comment}) => {
         const main = document.querySelector('main')
         const details = document.querySelector('details')
         let article = document.createElement('comment-article')
         article.setAttribute('name', comment.name)
         article.setAttribute('email', comment.email)
         article.setAttribute('subject', comment.subject)
         article.setAttribute('message', comment.message)
         article.setAttribute('key', comment.key)
         main.insertBefore(article, details)
       })
       .catch(error => {
         console.log(error)
       })
   }
 }
}
customElements.define('submit-button-pe', SubmitButton)
```


Once again, no changes for the user but it cleans up our code quite a bit. Is that exactly how I’d leave that `comment-article` component? Well no, but it’s good enough for right now.


## Next Steps

Tomorrow we’ll do the first deployment of our app.
