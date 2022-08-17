---
title: Custom Elements in Markdown
links:
  - markdown-it: https://www.npmjs.com/package/markdown-it
  - Arcdown: https://github.com/architect/arcdown
---

It is totally possible to include custom HTML elements in Markdown source files and then have the generated markup rendered by Enhance SSR.

<doc-callout level="caution">

Currently, Enhance "Starter Project" pages cannot be written as Markdown.

</doc-callout>

## Things to remember

### 1. Enable HTML in your Markdown parser

For example, if you're using `markdown-it`:

```javascript
const md = require('markdown-it')({ html: true });
```

This will allow HTML tags to be passed through the parser, so they are preserved for Enhance and the HTML eventually sent to the browser client.

### 2. Lots of newlines

When authoring Markdown with custom elements, it is best to add blank lines around opening and closing tags:

<doc-code filename="custom-elems-in-md.md" mark-line="5,11" numbered>

```markdown
# Custom Elements in Markdown

Custom HTML elements in Markdown are awesome!

<my-rad-elem hype="9001">

## Some really cool info

> This is rendered as `<h2>` and `<blockquote>` inside `<my-rad-elem>`

</my-rad-elem>

Hey, that's pretty neat!
```

</doc-code>

### 3. Render order matters

It is probably best to render HTML from Markdown and then render the final HTML with Enhance.

```
.md --[markdown-it]--> HTML --[Enhance]--> browser
```

Passing Enhance-rendered HTML with included HTML to a Markdown parser is likely to create invalid HTML documents, if any at all.

<doc-callout level="tip" mark="🧁">

[Arcdown](https://github.com/architect/arcdown) might be good choice if you're combining Markdown and custom elements to author technical docs.

</doc-callout>
