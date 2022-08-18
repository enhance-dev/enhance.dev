---
title: Custom Events
links:
  - "MDN: CustomEvent()": https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
  - "MDN: Creating events": https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events
  - Dispatching Custom Events: https://javascript.info/dispatch-events
---

HTML (custom) elements natively support event publishing and subscribing.
Similar to how a `<button>` might listen for a click event, your web component (and its children) can listen for custom events that your script generates.

<doc-callout level="danger" mark="✋">

## Enhance has a data API built in

This particular `CustomEvent` approach has a narrow use-case if you're already leveraging Enhance in your peroject.
You can likely solve any pub/sub challenge with Enhance's features with less code.
However, it's totally possible to use JavaScript's built in primitives as described here.

</doc-callout>

## A simple example

Suppose you have a `<horse-element>` that listens for the `giddyup` event.

<doc-code focus="5:7" callout="5-'giddyup'">

```javascript
export default function HorseElem({ html, state }) {
  constructor() {
    super()

    this.addEventListener('giddyup', (e) => {
      this.go(e.direction)
    })
  }

  go(direction) {
    console.log(`Headed ${direction}`)
  }
}
```

</doc-code>

This custom element would render as:

```html
<horse-element id="horse"></horse-element>
```

And you can broadcast that event from elsewhere in your HTML document.

<doc-code callout="1-'giddyup'">

```javascript 
const giddyupEvent = new CustomEvent('giddyup', { direction: 'west' })
window.horse.dispatchEvent(giddyup)
```

</doc-code>

## In depth

<doc-callout level="caution" mark="🛠">

### Work in progress

We're still building out a complete example demonstrating this technique.

</doc-callout>

## Recommended reading

Check the sidebar for helpful reference and guide links 👉
