---
title: Instance ID
---

`instanceID` is a unique identifier that is generated per Custom Element instance. This enables you to differentiate between multiple instances of the same element on a page. It can also be useful when using a string based diffing library like [Morphdom](https://github.com/patrick-steele-idem/morphdom) which keys on unique identifiers to know when to update versus replace an element.

```javascript
export default function MyCard({ html, state }) {
  const { attrs={}, instanceID='' } = state
  const { content='', heading='' } = attrs

  return html`
<figure id="figure-${instanceID}">
  <h2>${heading}</h2>
  <p>${content}</p>
</figure>
  `
}
```

<doc-callout mark="ℹ️">
  Pro tip: As in the example above, prefix the id with the element name in order to use the id with multiple child elements.
</doc-callout>
