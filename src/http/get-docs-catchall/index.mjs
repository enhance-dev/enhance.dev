import { readFileSync } from 'fs'
import { URL } from 'url'
import arc from '@architect/functions'
import renderMd from 'arcdown'
import enhance from '@enhance/ssr'
import elements from '@architect/views/docs/elements/index.mjs'

// Configuration
const docsRoute = 'docs' // this should match app.arc catchall

async function http(request) {
  const { path: activePath, pathParameters } = request
  let docPath = pathParameters?.proxy || 'index'
  if (docPath.match(/\/$/)) docPath += 'index'

  const docURL = new URL(
    `./node_modules/@architect/views/docs/md/${docPath}.md`,
    import.meta.url
  )
  const docMarkdown = readFileSync(docURL.pathname, 'utf-8')
  const doc = await renderMd(docMarkdown, {
    pluginOverrides: {
      markdownItTocAndAnchor: { tocClassName: 'list-none' },
      // TODO: add class mappings and other plugin config
    },
  })

  const html = enhance({ elements, initialState: { doc } })

  return {
    html: html`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta
            name="viewport"
            content="width=device-width, minimum-scale=1, initial-scale=1" />
          <title>Enhance Docs${` - "${doc.title}"` || ''}</title>
          <link rel="icon" href="https://fav.farm/✨" />
          <link
            rel="stylesheet"
            href="https://unpkg.com/highlight.js@11.5.1/styles/night-owl.css" />
          <link rel="stylesheet" href="${arc.static('css/docs.css')}" />
        </head>
        <body>
          <docs-layout active-path="${activePath}" docs-route="${docsRoute}">
          </docs-layout>
        </body>
      </html>
    `,
  }
}

export const handler = arc.http.async(http)
