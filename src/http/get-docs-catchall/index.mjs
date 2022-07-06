import { readFileSync } from 'fs'
import { URL } from 'url'
import arc from '@architect/functions'
import render from 'arcdown'
import enhance from '@enhance/ssr'

import document from '@architect/views/new-docs/document.mjs'
import elements from '@architect/views/new-docs/elements/index.mjs'

// Configuration
const mountedRoute = 'docs' // this should match app.arc catchall
const docsRoot = `./node_modules/@architect/views/new-docs/md`

const html = enhance({ elements })

async function http(request) {
  const { path: activePath, pathParameters } = request
  let docPath = pathParameters?.proxy || 'index'
  if (docPath.match(/\/$/)) docPath += 'index'

  const docURL = new URL(`${docsRoot}/${docPath}.md`, import.meta.url)
  const docMarkdown = readFileSync(docURL.pathname, 'utf-8')
  const doc = await render(docMarkdown, {
    pluginOverrides: {
      markdownItTocAndAnchor: { tocClassName: 'list-none' },
    },
  })

  return {
    html: html`${document(doc, mountedRoute, activePath)}`,
  }
}

export const handler = arc.http.async(http)
