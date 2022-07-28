---
title: Docs Home 🏠
---

Hey! You're here at the root. Welcome.

## Features

All the things in `arcdown` with some fancy file-based routing.

### Navigation

👈 The left sidebar is generated from `sidebarData.mjs`.  
<small>The data types are in a bit of flux.</small>

The right-side outline is this doc's table of contents. 👉  
<small>Plus a couple arbitrary blocks/lists.</small>

### Code Block

Syntax highlighting by default.

```javascript
const { path, pathParameters } = request;
let docPath = pathParameters?.proxy || 'index';
if (docPath.match(/\/$/)) docPath += 'index';

const docURL = new URL(`${docsRoot}/${docPath}.md`, import.meta.url);
const docMarkdown = readFileSync(docURL.pathname, 'utf-8');
const doc = await render(docMarkdown);
```

> 🪧  Be sure to use the **_full_** language name: "`javascript`" instead of "`js`".

<doc-code numbered focus="11:16">

```arc
@app
enhance-dev

@static
fingerprint true
prune true

@http
get /docs/*

@plugins
enhance/arc-plugin-styles

@enhance-styles # ✨
filename css/styles.css
config css-config.json

@aws
runtime nodejs16.x
architecture arm64
```

</doc-code>

There's even a `<doc-code>` custom element! 👆
