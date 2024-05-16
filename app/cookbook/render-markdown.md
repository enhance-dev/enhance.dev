---
title: Render Markdown
---

Enhance can be used to render Markdown with minimal effort — in fact, this very site is itself an Enhance app that renders Markdown to HTML on demand. You can dig into the [source code](https://github.com/enhance-dev/enhance.dev) to see exactly how we've set it up, or follow along below.

## Arcdown

When rendering Markdown to HTML in Enhance projects, we rely on [Arcdown](https://github.com/architect/arcdown), which packages together our preferred conventions for parsing Markdown files. Under the hood, Arcdown makes use of [markdown-it](https://markdown-it.github.io/), an excellent JavaScript Markdown parser that is highly configurable via a wealth of plugins.

Add the Arcdown package to your project:

```bash
npm install arcdown
```

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
`html` | The Markdown document content, converted to HTML
`tocHtml` | The document's table of contents, converted to HTML
`title` | The document title, lifted from the document's frontmatter.
`slug` | A URL-friendly slug of the title (possibly empty). Synonymous with links in the table of contents.
`frontmatter` | An object containing all remaining frontmatter (possibly empty)

Arcdown follows the convention of markdown-it as being highly configurable. For example, you can always disable functionality if you don't need things like a table of contents or syntax highlighting.

> For more information on configuring Arcdown see [Configuration](https://github.com/architect/arcdown#configuration)

## Parsing Markdown in an API route

In Enhance apps, Markdown parsing is optimally performed as part an API route. After parsing, we can then pass the result to our page route as part of [the store](/docs/elements/state/store). Let's assume you have a new Enhance project, structured like this:

```
app
├── markdown
|   └── example.md
└── pages
    └── index.html
```

Now we want to be able to parse the `app/markdown/example.md` file. In order to do that, we'll first need an API route. Create a new folder called `app/api/markdown` and add a catch-all API route named `app/api/markdown/$$.mjs`. Alternatively, you can run the Enhance CLI command:

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

Next, in our API route's `get` function, we'll need to figure out which file the user has requested. To do that, we'll determine the document path from the incoming request:

```javascript
 const { path: activePath } = req
 let docPath = activePath.replace(/^\/?docs\//, '') || 'index'
 if (docPath.endsWith('/')) {
   docPath += 'index' // trailing slash == index.md file
 }
```

Next, we'll use the `docPath` to read our Markdown file from the `app/markdown` folder:

```javascript
 const docURL = new URL(`../../${docPath}.md`, import.meta.url)
 const docMarkdown = readFileSync(docURL.pathname, 'utf-8')
```

Once we have the Markdown string, we can transform it into HTML using Arcdown and add it to the `store`:

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

> **Note:** We’re omitting a lot of error checking for the sake of brevity, but check out this [hardened example](https://github.com/enhance-dev/enhance.dev/blob/main/app/api/docs/%24%24.mjs) for more details on how to handle 404s.

## Displaying Markdown

Now that we've successfully transformed our Markdown into HTML, let's go about displaying it in a page. First, we'll create a new catch-all page under `app/pages/markdown/$$.html`, and a new web component to display the Markdown at `app/elements/doc-content.mjs`. You can create these files manually, or by running the Enhance CLI commands:

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

For the purposes of this example, we'll keep our `app/pages/markdown/$$.html` simple by including only the web component we just created:

<doc-code filename="app/pages/markdown/$$.html">

```html
<doc-content></doc-content>
```

</doc-code>

In the web component we just created, we'll read the result of the transformation off the `store`. Then we'll return the rendered content to be displayed on our page:

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

Test it out by starting the development server:

```bash
enhance dev
```

Then open a browser tab to [localhost:3333/markdown/example](https://localhost:3333/markdown/example) and you’ll see the rendered markdown file.

That's all you need in order to get started using markdown in an Enhance app.

## Using custom elements in markdown

It is totally possible to include custom elements in Markdown source files and then have the generated markup rendered by Enhance SSR.

When authoring Markdown with custom elements, it is best to add blank lines around opening and closing tags. For example on this page we use the `doc-code` custom element to provide syntax highlighting of source code. In Markdown, use of a custom element would look like:

```
# Custom Elements in Markdown

Custom HTML elements in Markdown are awesome!

<my-rad-elem hype="9001">

## Some really cool info

> This is rendered as `<h2>` and `<blockquote>` inside `<my-rad-elem>`

</my-rad-elem>

Hey, that's pretty neat!
```
