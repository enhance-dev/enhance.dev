---
title: "An Accessible Modal without JavaScript: The Final Boss"
image: '/_public/blog/post-assets/modal-example.jpg'
category: uncategorized
description: "Building an accessible modal is difficult. Doing it without JavaScript _has_ been almost impossible. It’s been called the final boss of accessible components for a long time. "
author: 'Ryan Bethel'
avatar: 'ryanbethel.png'
twitter: "ryanbethel"
published: 'October 18, 2022'
---


![Modal dialog example](/_public/blog/post-assets/modal-example.jpg )

A modal is a pop-up dialog message that requires immediate attention. Since modal dialog's are intentionally disruptive, they should be used sparingly. But when you need one, it’s usually for something critical. Building an accessible modal is difficult. Doing it without JavaScript _has_ been almost impossible. I am a [fan of progressive enhancement](https://blog.begin.com/posts/2022-06-21-forms-that-work-every-time-everywhere). Build it to work with only HTML (and CSS). Then improve it with just a little JavaScript. It is better for people, and it’s usually easier to build. Modals are an exception to the easy part. They need to hijack other built-in HTML interactions. Without JavaScript, that is hard to do. It’s been called the final boss of accessible components for a long time.


![Video game final boss](/_public/blog/post-assets/final-boss.webp)



### TL&DR

The goal is to build the best modal possible without JavaScript. Then add what’s missing with as little JavaScript as possible. `<dialog>` seems like the obvious answer, and it comes frustratingly close but for one fatal flaw. The real solution is a checkbox and a form reset button, combined with the new CSS `:has` selector. `:has()` is the final piece to unlock this longstanding problem component. It is available in two of the three major browsers and has reached the final stages in the third.


### Background

The web is a great platform to build on. It steadily improves with new capabilities, but most critically, it remains backward compatible. Things that used to work will continue to work if they rely on web APIs. My old solution for this modal problem was quite complex, requiring hidden radio buttons and some complicated CSS using `:checked` selectors. But as time moves on, the web platform has upgraded itself, and the new solution using `:has()`  is much simpler. That [Rube Goldburg](https://en.wikipedia.org/wiki/Rube_Goldberg) modal can fade into history (except for those sites where I used it, which I am confident will continue to work until I want to change them).

![I have not failed. I have found 10,000 ways that don't work. Thomas Edison](/_public/blog/post-assets/thomas-edison-10000-ways.jpg)

People coming into web development from this point forward will never know how many hacks it took to make some things like this work. That is a good thing. They can focus on new challenges.


### Why not `<dialog>`

Before showing the working solution, you might ask “why not use the `<dialog>` element.”  It is the most semantically correct element for a modal. Most of the difficult requirements, like trapping focus and escape to close, are built in. But `<dialog>` has one fatal flaw. **_You cannot open it without JavaScript._** It can start, on the initial render, in the open state, and then a form submit button can close it without JavaScript. But rarely do you want to render a page with a modal open already. If you give up on an accessible working no JavaScript solution, then I recommend  `<dialog>`. It is the cleanest and most straightforward solution _with_ JavaScript. [Web.dev](https://web.dev/building-a-dialog-component/) has a good post with examples. But I am not giving up, so `<dialog>` is out.


### Requirements

Some of the critical features for a modal are:

1. Opens above main content (i.e. not covered by sticky headers)
2. Fully keyboard accessible
3. Traps focus in the modal when open
4. De-emphasizes main page content to focus attention on the modal
5. Triggered from anywhere
6. Multiple open and close targets
7. Click outside to close
8. Escape to close

The markup below shows the ideal author experience for this modal. The dialog itself is after the other page content in the document flow. That ensures that no matter what sticky header z-index shenanigans happen in the main content, you can ensure the dialog is not trapped under some other content on the page.


```html
<div class="main-content">
  main content
  <trigger-modal name="my-modal">open modal</trigger-modal>
</div>

<dialog-modal name="my-modal" main-content-class="main-content">
  Dialog Message
  <close-modal name="my-modal">close modal</close-modal>
</dialog-modal>
```


This example uses custom elements (i.e. `<dialog-modal>`) rendered with [Enhance](https://enhance.dev), which expands them with the internal elements necessary to make it work without JavaScript. The custom tag is just a container to author with and later a place to attach the progressively enhanced behavior. This same solution would work without [Enhance](https://enhance.dev). You just need to render the necessary elements into your page somehow.

Here is a CodePen showing a full example.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="BaxvGgB" data-user="rbethel" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/rbethel/pen/BaxvGgB">
  progressive-enhanced-modal</a> by Ryan Bethel (<a href="https://codepen.io/rbethel">@rbethel</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>



The key to this modal is to combine a checkbox, `<form>`, reset button, and `:has()`. The so-called [checkbox hack](https://css-tricks.com/the-checkbox-hack/) has been used to control UI elements for many years. But you had to have the checkbox positioned above and outside of the thing you wanted to control. That has all changed with `:has()`. Now that checkbox can be anywhere in the document, and it can affect the styles for elements anywhere on the page. We use a checkbox to trigger the modal to open, but how do we close it? If that checkbox trigger is in the main content, and the modal blocks that content once open, we can’t directly interact with it to close it. The solution is to add that checkbox to a `<form>` and use a `type=reset` button to close it. When that form is “reset” it will toggle the checkbox, no matter where it is in the document, back to its original state, which will close the modal.

The markup below shows the modal in its most basic form. This is all you need to make this work. It takes a little more to make it nice (like styles and labels), but this is the essence of how it works. Note you can have any number of input checkboxes to open the modal and any number of reset buttons to close it if needed.


```html
<style>
  /* Main content visibility hidden to trap focus in modal */
  .main-content:has(input[form="modal-form-my-modal"]:checked) {
    visibility: hidden;
  }
  /* Show modal when open */
  body:has(input[form="modal-form-my-modal"]:checked) .modal-body {
    display: block;
  }
</style>

<body>
  <div class="main-content">
    <input type="checkbox" role="button" form="modal-form-my-modal">
  </div>

  <div class="modal-body" role="dialog">
    <button type="reset" form="modal-form-my-modal">
       Close Modal
    </button>
    <form id="modal-form-my-modal"></form>
  </div>
</body>
```



### Trap Focus without JavaScript

One of the most challenging requirements, without JavaScript, is to trap focus inside the modal when it’s open. Even solving this with JavaScript used to be difficult. You had to capture keyboard events and call `focus()` back inside the modal when it tried to escape. This is far easier now with the `inert` attribute. But without JavaScript, we can’t add an attribute. The solution is to set `visibility:hidden` on the page content instead. The downside is that this hides the main content completely; ideally, we only want to add an opaque layer to obscure the background. But setting visibility to hidden works for accessibility and is a reasonable compromise.

The last two items in the list of requirements are: click outside to close and escape to close. An easy way to add click outside to close is to make the entire backdrop into another reset button when the modal is open. We set `tabindex=-1` so that this button is only a click target, and click to close is done.


### Progressive Enhancements

That only leaves escape to close. As far as I know, there is still no way to do this without JavaScript. I consider it a nice to have, and I feel comfortable handling this as a progressive enhancement instead. The other compromise we made building the modal was using `visibility:hidden` instead of `inert`. Ideally, we wanted to keep the main content visible but set the `inert` attribute. And, finally, for keyboard control a button should respond to a space key or enter key. Without JavaScript a checkbox will only toggle with space key, so we should add enter key control. Let’s tackle these three items as progressive enhancements now. As a bonus, we will add them to the modal as a JavaScript upgrade in the form of a custom element definition.


```javascript
class DialogModal extends HTMLElement {
  constructor() {
    super();
    this.form = this.querySelector("form");
    this.inertMain = this.inertMain.bind(this);
    this.unInertMain = this.unInertMain.bind(this);
    this.escClose = this.escClose.bind(this);
    this.enterOpen = this.enterOpen.bind(this);
    this.form.addEventListener("reset", this.unInertMain);
    window.addEventListener("keyup", this.escClose);
  }
  connectedCallback() {
    this.mainContentClass = this.getAttribute("main-content-class");
    this.mainContent = document.querySelector("." + this.mainContentClass);
    this.name = this.getAttribute("name");
    this.allTriggers = document.querySelectorAll(
      "input[type=checkbox][form=modal-form-" + this.name + "]"
    );
    this.allTriggers.forEach((trigger) => {
      trigger.addEventListener("change", this.inertMain);
      trigger.addEventListener("keydown", this.enterOpen);
    });
  }
  disconnectedCallback() {
    this.allTriggers.forEach((trigger) => {
      trigger.removeEventListener("change", this.inertMain);
      trigger.removeEventListener("keydown", this.enterOpen);
    });
    this.form.removeEventListener("reset", this.unInertMain);
    window.removeEventListener("keyup", this.escClose);
  }
  inertMain() {
    this.mainContent.setAttribute("inert", "");
  }
  unInertMain() {
    this.mainContent.removeAttribute("inert");
  }
  enterOpen(e) {
    if (e.code === "Enter") {
      e.target.checked = true;
      this.inertMain()
    }
  }
  escClose(e) {
    if (e.code === "Escape") {
      this.form.reset();
    }
  }
}
customElements.define("modal-dialog", DialogModal);
```


Some extra boilerplate comes with the custom element solution, but I love knowing that this solution will always work and is not tied to the shrinking lifespan of most frameworks.

All this code does is add an event listener to any checkbox triggers that will add the `inert` attribute to the main content. And an event listener to the form reset that will remove that `inert` when it resets. We also set a keyup event listener to reset the form if escape is pressed.


### Hidden benefits of a progressive enhancement mindset

One problem I encountered writing this JavaScript is how to undo the `visibility:hidden` that we set up for the initial solution. I could have done it all with JavaScript, but progressive enhancement has taught me to stop and think “would this be easier in HTML or CSS?” I realized that if we are using `inert`, then we don’t want to use `visibility` so I can update the CSS rule by adding a `:not([inert])` pseudo selector. I used to use JavaScript as my primary tool for everything. But when you first look to HTML and CSS to do what they do best, a lot of problems that take a lot of JavaScript are much easier to solve in the right domain.


```css
.main-content:not([inert]):has(input[form="modal-form-my-modal"]:checked) {
    visibility: hidden;
}
```



### Finishing accessibility

The focus of this post has been making the modal fully functional so that it can be made accessible. There is a little more work to do for accessibility. The first rule of ARIA is don’t use ARIA if you are using semantic markup. But in this case we are using a checkbox for a button so we need some ARIA attributes. The checkbox needs to be set to `role=button`. Other attributes will be specific to the use case but you will probably need a few.


### Is progressive enhancement really worth it

I think so. I am sure on Twitter at this very moment someone is saying, “who disables JavaScript these days.” While they are competing for likes with the other guy yelling, “HTML isn’t a real programming language” there are many more people quietly trying to build things in the best way they can. Progressive enhancement, using HTML and CSS first to do what they does best and adding small enhancements with JavaScript, is the best way. If that describes you, try using [Enhance](enhance.dev). It is the best way to build progressively enhanced HTML-first web apps.

If you are curious to see how this modal looks in Enhance here is a CodeSandbox with the Enhance components:
[https://codesandbox.io/p/sandbox/enhance-modal-jyzhbf](https://codesandbox.io/p/sandbox/enhance-modal-jyzhbf)
