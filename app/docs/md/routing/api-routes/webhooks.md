---
title: Webhooks
---

A webhook is a method of augmenting or altering the behavior of a web page or web application with custom callbacks.

You can use an API route to receive webhooks from third parties:

<doc-code filename="app/api/webhook.mjs">

```javascript
export async function post (req) {
  try {
    const data = req.body
    // Process the webhook payload
    // Validate payload, etc.
  } catch (error) {
    return {
      status: 400,
    }
  }

  return {
    status: 200,
  }
}
```

</doc-code>
