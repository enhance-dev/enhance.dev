---
title: Instance ID
---

`instanceID` is a unique identifier that is generated per Custom Element instance. This enables you to differentiate between multiple instances of the same element on a page. It can also be useful when using a  string based diffing library like [Morphdom](https://github.com/patrick-steele-idem/morphdom) that require unique identifiers for DOM diffing.

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
