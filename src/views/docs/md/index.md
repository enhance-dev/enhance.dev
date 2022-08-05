---
title: Docs Home 🏠
---

Hey! You're here at the root. Welcome.

## Features

All the things in [Arcdown](https://github.com/architect/arcdown) with some fancy file-based routing.

### Navigation

👈 The left sidebar is generated from `sidebarData.mjs`.  
<small>The data types are in a bit of flux.</small>

The right-side outline is this doc's table of contents. 👉  
<small>Plus a couple arbitrary blocks/lists.</small>

### Code Block

Syntax highlighting by default.

<doc-code numbered focus="5:14" mark="3">

```javascript
function findLanguages (mdContent) {
  const foundLangs = new Set()
  const fenceR = /`{3,4}(?:(.*$))?[\s\S]*?`{3,4}/gm
  let match
  do {
    match = fenceR.exec(mdContent)
    if (match) {
      const matched = match[1]
      if (matched) {
        const langString = matched.split(' ')
        foundLangs.add(langString[0])
      }
    }
  } while (match)

  return foundLangs
}
```

</doc-code>

> 🪧  Be sure to use the **_full_** language name: "`javascript`" instead of "`js`".

There's even a `<doc-code>` custom element! 👆

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
