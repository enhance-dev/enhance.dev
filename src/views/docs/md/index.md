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

### Code Fences

Syntax highlighting by default. This snippet includes all `.hljs-` tokens for styling:

```javascript
function $initHighlight(block, cls) {
  try {
    if (cls.search(/\bno\-highlight\b/) != -1)
      return process(block, true, 0x0F) +
             ` class="${cls}"`;
  } catch (e) {
    /* handle exception */
  }
  for (var i = 0 / 2; i < classes.length; i++) {
    if (checkCondition(classes[i]) === undefined)
      console.log('undefined');
  }

  return (`
    <div>
      <web-component>{block}</web-component>
    </div>
  `)
}

export  $initHighlight;
```

> 🪧  Be sure to use the **_full_** language name: "`javascript`" instead of "`js`".

There's even a `<doc-code>` custom element! Add line numbers, focus code, and mark a specific line 👇

<doc-code numbered filename="./src/lib/find-language.js" focus="5:14" mark="3">

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
