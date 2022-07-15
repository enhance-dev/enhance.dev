---
title: tbeseda testing some things

---

CodeMirror experiments

## A `<doc-code>` Custom Element

This 👇 code block is rendered and highlighted on the server with arcdown + hljs.
Then CodeMirror takes over in the browser and re-instantiates it as an editor.

<doc-code>

```javascript
const { path: activePath, pathParameters } = request
let docPath = pathParameters?.proxy || 'index'
if (docPath.match(/\/$/)) docPath += 'index' // trailing slash == index.md file

const docURL = new URL(
  `./node_modules/@architect/views/docs/md/${docPath}.md`,
  import.meta.url
)
const docMarkdown = readFileSync(docURL.pathname, 'utf-8')
const doc = await renderMd(docMarkdown
```

</doc-code>

### Markdown Source

So the source authored in .md looks like:

````html
<doc-code>

```javascript
const { path: activePath, pathParameters } = request
let docPath = pathParameters?.proxy || 'index'
if (docPath.match(/\/$/)) docPath += 'index' // trailing slash == index.md file

const docURL = new URL(
  `./node_modules/@architect/views/docs/md/${docPath}.md`,
  import.meta.url
)
const docMarkdown = readFileSync(docURL.pathname, 'utf-8')
const doc = await renderMd(docMarkdown
```

</doc-code>
````

### Without the custom element

And without the `<doc-code>` element, it renders as:

```javascript
const { path: activePath, pathParameters } = request
let docPath = pathParameters?.proxy || 'index'
if (docPath.match(/\/$/)) docPath += 'index' // trailing slash == index.md file

const docURL = new URL(
  `./node_modules/@architect/views/docs/md/${docPath}.md`,
  import.meta.url
)
const docMarkdown = readFileSync(docURL.pathname, 'utf-8')
const doc = await renderMd(docMarkdown
```

Obviously this would work better if we visually matched CodeMirror's styling.
