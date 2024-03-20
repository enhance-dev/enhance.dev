---
title: Rendering Markdown
links:
  - "Arcdown": https://github.com/architect/arcdown/blob/main/readme.md
---

A frequent question is, *“Can I render Markdown files with Enhance?”* and the answer is, *“of course!”*  [This site](https://enhance.dev/docs/) is an Enhance app which renders markdown on demand. You can always dig into the [source code](https://github.com/enhance-dev/enhance.dev) to see exactly how we've set it up, but I thought I'd review some of the high points.

## Arcdown

Enhance does not natively support rendering markdown into HTML, which is out of scope for the project. Instead, we rely on [markdown-it](https://markdown-it.github.io/), an excellent JavaScript markdown parser that is endlessly configurable with plugins. As we use markdown in many different projects, we've created a node module called, [Arcdown](https://github.com/architect/arcdown), which packages together our preferred conventions for parsing markdown files.

Here's a quick example of parsing a markdown string with Arcdown:

```javascript
import { Arcdown } from 'arcdown'

const mdString = `
---
title: Hello World
category: Examples
---

## Foo Bar

lorem ipsum _dolor_ sit **amet**

[Enhance](https://enhance.dev/)
`.trim()

const arcdown = new Arcdown()
const result = await arcdown.render(mdString)
```

The result of the render returns an object with the following properties:

Property | Description
-: | :-
`html` | The Markdown document contents as HTML
`tocHtml` | The document's table of contents as HTML (nested unordered lists).
`title` | The document title, lifted from the document's frontmatter.
`slug` | A URL-friendly slug of the title. (possibly empty) Synonymous with links in the table of contents.
`frontmatter` | An object containing all remaining frontmatter. (possibly empty)

Arcdown follows along the convention of markdown-it as being infinitely configurable. For example, you can always disable functionality if you don't need things like a table of contents or syntax highlighting.

> For more information on configuring Arcdown see [Configuration](https://github.com/architect/arcdown#configuration)

## Parsing markdown in an API route

When parsing markdown, we'll want to do it in an API route and then pass the result to our page route as part of the store. Let's assume you have a new Enhance project like this:

```
app
├── markdown
|   └── example.md
└── pages
    └── index.html
```

Now we want to be able to parse the `app/markdown/example.md` file. In order to do that we'll need an API route so you can manually create a new folder called `app/api/markdown` and add a catch-all API route named `app/api/markdown/$$.mjs`, or you can run the Enhance CLI command:

```bash
enhance gen api --path 'markdown/$$'
```

> **Note:** the single quotes around 'markdown/$$' are important as they prevent the shell from doing variable substitution.

Now our project looks like this:

```
app
├── api
|   └── markdown
|       └── $$.mjs
├── markdown
|   └── example.md
└── pages
    └── index.html
```

In our `app/api/markdown/$$.mjs` file, we'll need to import a few packages and instantiate Arcdown.

```javascript
import { readFileSync } from 'fs'
import { URL } from 'url'
import { Arcdown } from 'arcdown'
const arcdown = new Arcdown()
```

Then in our `get` function we'll need to figure out which file the user has requested. To do that we'll determine the document path from the incoming request.

```javascript
 const { path: activePath } = req
 let docPath = activePath.replace(/^\/?docs\//, '') || 'index'
 if (docPath.endsWith('/')) {
   docPath += 'index' // trailing slash == index.md file
 }
```

Next we'll use the `docPath` to read our markdown file from the `app/markdown` folder.

```javascript
 const docURL = new URL(`../../${docPath}.md`, import.meta.url)
 const docMarkdown = readFileSync(docURL.pathname, 'utf-8')
```

Once we have the markdown string, we can transform it into HTML using Arcdown and add it to the `store`.

```javascript
 const doc = await arcdown.render(docMarkdown)
 return {
   json: { doc }
 }
```

The entire function looks like this:

<doc-code filename="app/api/markdown/$$.mjs">

```javascript
import { readFileSync } from 'fs'
import { URL } from 'url'
import { Arcdown } from 'arcdown'
const arcdown = new Arcdown()

export async function get (req) {
 // Get requested path
 const { path: activePath } = req
 let docPath = activePath.replace(/^\/?docs\//, '') || 'index'
 if (docPath.endsWith('/')) {
   docPath += 'index' // trailing slash == index.md file
 }

 // Read markdown file
 const docURL = new URL(`../../${docPath}.md`, import.meta.url)
 const docMarkdown = readFileSync(docURL.pathname, 'utf-8')

 // Convert to HTML and add to store
 const doc = await arcdown.render(docMarkdown)
 return {
   json: { doc }
 }
}
```

</doc-code>

> **Note:** I'm omitting a lot of error checking for the sake of brevity but check out this [hardened example](https://github.com/enhance-dev/enhance.dev/blob/main/app/api/docs/%24%24.mjs) for more details on how to handle 404's.

## Displaying markdown

Now that we have successfully transformed our markdown into HTML let's go about displaying it in a page. First, we'll create a new catch-all page under `app/pages/markdown/$$.html` and a new web component to display the markdown at `app/elements/doc-content.mjs` which you can do manually or by running the Begin CLI commands:

```bash
enhance gen page --path 'markdown/$$'
enhance gen element --name doc-content
```

Our project structure now looks like this:

```
app
├── api
|   └── markdown
|       └── $$.mjs
├── elements
|   └── doc-content.mjs
├── markdown
|   └── example.md
└── pages
    ├── markdown
    |   └── $$.mjs
    └── index.html
```

Our `app/pages/markdown/$$.html` file will look really simple as we will just hand everything over to our web component to handle. Feel free to make this page more advanced by adding headers, footers, etc. as required by your design.

<doc-code filename="app/pages/markdown/$$.html">

```html
<doc-content></doc-content>
```

</doc-code>

Over in `app/elements/doc-content.mjs` we will read the result of the transformation off the `store`. Then we'll return the rendered content to be displayed on our page:

<doc-code filename="app/elements/doc-content.mjs">

```javascript
export default function DocContent ({ html, state }) {
 const { store } = state
 const { doc } = store
 return html`
<h1 class="text3">${doc.title}</h1>
<div>
 ${doc.html}
</div>
`
}
```

</doc-code>

That's all you need in order to get started using markdown in an Enhance app.

## Using custom elements in markdown

It is totally possible to include custom elements in Markdown source files and then have the generated markup rendered by Enhance SSR.

When authoring Markdown with custom elements, it is best to add blank lines around opening and closing tags. For example on this page we use the `doc-code` custom element to provide syntax highlighting of source code. In markdown, use of a custome element would look like:

```
# Custom Elements in Markdown

Custom HTML elements in Markdown are awesome!

<my-rad-elem hype="9001">

## Some really cool info

> This is rendered as `<h2>` and `<blockquote>` inside `<my-rad-elem>`

</my-rad-elem>

Hey, that's pretty neat!
```
### Render order matters

When rendering HTML from Markdown that includes custom elements the rendering order matters. First, render the markdown to HTML with Arcdown then "enhance" that HTML by running it through Enhance SSR before sending it to the browser.

```
.md → [Arcdown] → HTML → [Enhance SSR] → browser
```
