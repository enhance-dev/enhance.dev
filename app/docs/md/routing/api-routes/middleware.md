---
title: Middleware
---

API routes have a lightweight middleware concept. Export an array of async function handlers, and they will be run in the order you define.

```javascript
export const get = [one, two]

async function one (req) {
  console.log('hi from one')
  req.first = true
}

async function two (req) {
  console.log('hi from two')
  const second = false

  return { json: [req.first, second] }
}
```

<doc-callout level="tip" mark="🎩">

Protip: Exit middleware early by `return`ing a response.

</doc-callout>


