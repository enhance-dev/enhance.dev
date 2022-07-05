import { readFileSync } from 'fs'
import { URL } from 'url'
import arc from '@architect/functions'
import render from 'arcdown'
import Sidebar from '@architect/views/new-docs/Sidebar.mjs'
import sidebarData from '@architect/views/new-docs/sidebarData.mjs'

const mountedRoute = 'docs' // this should match app.arc catchall
const docsViewPath = 'new-docs/md' // arbitrary path inside ./src/views
const docsRoot = `./node_modules/@architect/views/${docsViewPath}`

async function http(request) {
  const { path, pathParameters } = request
  let docPath = pathParameters?.proxy || 'index'
  if (docPath.match(/\/$/)) docPath += 'index'

  const docURL = new URL(`${docsRoot}/${docPath}.md`, import.meta.url)
  const docMarkdown = readFileSync(docURL.pathname, 'utf-8')
  const doc = await render(docMarkdown, {
    pluginOverrides: {
      markdownItTocAndAnchor: { tocClassName: 'list-none' }
    }
  })

  const html = /* html*/ `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1">
  <title>${mountedRoute}/ ${doc.title || ''}</title>
  <link rel="stylesheet" href="https://unpkg.com/highlight.js@11.5.1/styles/night-owl.css">
  <link rel="stylesheet" href="${arc.static('css/docs.css')}">
</head>
<body>
  <header>
    <nav>
      <h1>
        ✨
        <a href="/" class="enhance-link">Enhance</a>
        <a href="/docs/" class="docs-link">Docs</a>
      </h1>
    </nav>
    <input type="search" placeholder="Search...">
  </header>

  <aside id="sidebar">
    ${Sidebar(sidebarData, mountedRoute, path)}
  </aside>

  <main>
    <article>
      ${doc.title ? `<h1>${doc.title}</h1>` : ''}
      ${doc.html}
    <article>
  </main>

  <aside id="toc">
    <strong>On this page</strong>
    ${doc.tocHtml}

    <strong>Contribute</strong>
    <ul class="list-none">
      <li>Edit this page on GitHub</li>
    </ul>

    <strong>Community</strong>
    <ul class="list-none">
      <li>Blog</li>
      <li>Discord</li>
    </ul>
  </aside>
</body>
</html>
  `.trim()

  return { html }
}

export const handler = arc.http.async(http)
