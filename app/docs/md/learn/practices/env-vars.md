---
title: Environment Variables
---

It is a good practice to store runtime configuration data, such as API keys, in environment variables. When working locally Enhance supports loading environment variables ith a `.env` file. 

<doc-callout mark="🔎">
To provision environment variables for production deployment please consult the documentation for the different deployment providers. 
</doc-callout>

## Local Dev Environment Variable Tutorial

In this walkthrough we will setup environment variables, and display them on an example debug page. Please note, a `.env` file *should not* be checked-in to revision control because it will often contain sensitive information. Environment variables normally should never be leaked, or displayed to the end web consumer: this is an example to help demonstrate the lifecycle.

### 1. Create a `.env` file

The `.env` file will contain key/value pairs representing the environment variables.

<doc-code filename=".env">

```
API_KEY=xxx
DOMAIN_NAME=https://enhance.dev
```

</doc-code>

### 2. Create an API Route to read env vars

API Routes are a Node.js process; `process.env` lists all environment variables.

<doc-code filename="app/api/debug.mjs" highlight="2-add" callout="4-env">

```javascript
export async function get () {
  const env = process.env
  return { 
    json: { env } 
  }
}
```

</doc-code>

### 3. Create a Page to display the env vars

Display the values passed from the API Route.

<doc-code filename="app/pages/debug.mjs" highlight="2-add">

```javascript
export default async function debug ({ html, state }) {
  const env = state.store?.env
  return html`<pre>${ env }</pre>` 
}
```

</doc-code>
