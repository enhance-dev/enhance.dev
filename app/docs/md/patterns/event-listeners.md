---
title: Event Listeners
---

An event is a signal that something has happened on your page. The browser notifies you so you can react to them.

## What are events?

From [MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#what_is_an_event)

> Events are things that happen in the system you are programming — the system produces (or "fires") a signal of some kind when an event occurs, and provides a mechanism by which an action can be automatically taken (that is, some code running) when the event occurs. Events are fired inside the browser window, and tend to be attached to a specific item that resides in it. This might be a single element, a set of elements, the HTML document loaded in the current tab, or the entire browser window. There are many different types of events that can occur.

For example:

- A user submits a form
- A user clicks on a button
- A web page finishes loading
- etc.

**[Learn more about events](https://developer.mozilla.org/en-US/docs/Web/Events)**

## Adding a click event listener

Suppose we have a simple web component called `custom-button` that we want to add a click event listener to.

<doc-code filename="app/components/custom-button.mjs">

```javascript
import CustomElement from '@enhance/custom-element'

export default class CustomButton extends CustomElement {
  render ({ html, state }) {
    return html`
        <style>
            button {
                border: 1px solid white;
                padding: 2px;
            }
        </style>
        <button>Click me!</button>
    `
  }
}

customElements.define('custom-button', CustomButton)
```

</doc-code>

As a best practice, event listeners for web components should be added inside the `connectedCallback` function, since this method runs when the element is added to the DOM.

Inside our `connectedCallback` method, we'll use the `querySelector` method on the custom element, to get the button inside our component. Then we will add a `click` listener to the button.

<doc-code filename="app/components/custom-button.mjs">

```javascript
import CustomElement from '@enhance/custom-element'

export default class CustomButton extends CustomElement {
  connectedCallback () {
    this.button = this.querySelector('button')
    this.button.addEventListener('click', function (event) {
      alert('I was clicked')
    })
  }

  render ({ html, state }) {
    return html`
        <style>
            button {
                border: 1px solid white;
                padding: 2px;
            }
        </style>
        <button>Click me!</button>
    `
  }
}

customElements.define('custom-button', CustomButton)
```

</doc-code>

That works great but if we truly do want to follow best practices we should clean up our event listeners when our component is removed from the DOM. We'll remove that event listener in the `disconnectedCallback` method. In order to do that we'll need to refactor our component slightly.

1. Extract our click handler to a method named `clickHander`.
1. Save a reference to the `button` element in the `constructor`.
1. Bind `this` to the callback function.
1. Add the event listener in `connectedCallback`.
1. Remove the event listener in `disconnectedCallback`.

<doc-code filename="app/components/custom-button.mjs">

```javascript
import CustomElement from '@enhance/custom-element'

export default class CustomButton extends CustomElement {
  handleClick (event) {
    alert('I was clicked')
  }

  constructor () {
    super()
    this.button = this.querySelector('button')
    this.handleClick = this.handleClick.bind(this)
  }

  connectedCallback () {
    this.button.addEventListener('click', this.handleClick)
  }

  disconnectedCallback () {
    this.button.removeEventListener('click', this.handleClick)
  }

  render ({ html, state }) {
    return html`
        <style>
            button {
                border: 1px solid white;
                padding: 2px;
            }
        </style>
        <button>Click me!</button>
    `
  }
}

customElements.define('custom-button', CustomButton)
```

</doc-code>

<doc-callout level="info" mark="ℹ️">

If the bind syntax offends you, then you can always use a public class field and an arrow function instead.

```javascript
  handleClick = (event) => {
    alert('I was clicked')
  }
```

</doc-callout>

## Reducing Boilerplate

Many other web components provide a way of reducing the amount of boilerplate code one needs to write. Enhance provides the `@enhance/element` package which builds upon the `CustomElement` and `EventHandlerMixin` classes while providing a more succinct way of writing Enhance Components.

Revisiting our `custom-button` component we get:

<doc-code filename="app/components/custom-button.mjs">

```javascript
import enhance from '@enhance/element'

const CustomButton =  {
  render ({ html, state }) {
    return html`
        <style>
            button {
                border: 1px solid white;
                padding: 2px;
            }
        </style>
        <button>Click me!</button>
    `
  },
  click (event) {
    alert('I was clicked')
  }
}

enhance('custom-button', CustomButton)
export default CustomButton
```

</doc-code>

Add an attribute with a valid event name ( i.e. "click" ) to your custom element markup then and a function of the same name in your Web Component class and it will get called when a user interaction triggers the event.

```html
<custom-button click></custom-button>
```

Optionally, you can target your event listener by passing in the value of the child element. For example:

```html
<custom-button click="button"></custom-button>
```
