---
title: test for doc-code elem
---

`doc-code` experiments

## A `<doc-code>` Custom Element

This 👇 code block is rendered and highlighted on the server with arcdown + hljs.

```html
<doc-code numbered focus="7,18:23" mark=12 initial-line-number=11>
```

around some sample JS creates...

<doc-code numbered focus="7,18:23,420" mark=12 initial-line-number=11>

```javascript
class HljsLineWrapper {
  constructor(options) { this.className = options.className }

  'after:highlight'(result) {
    const tokens = []
    const safelyTagged = result.value.replace(
      /(<span [^>]+>)|(<\/span>)|(\n)/g,
      (match) => {
        if (match === '\n')
          return `${'</span>'.repeat(tokens.length)}\n${tokens.join('')}`

        if (match === '</span>') tokens.pop()
        else tokens.push(match)

        return match
      }
    )
    result.value = safelyTagged
      .split('\n')
      .map((line) => {
        return `<span class="${this.className || 'hljs-line'}">${line}</span>`
      })
      .join('\n')
  }
}
```

</doc-code>
