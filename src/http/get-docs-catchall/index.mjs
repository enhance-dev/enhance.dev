import { readFileSync } from 'fs'
import { URL } from 'url'
import { Arcdown } from 'arcdown'
import arc from '@architect/functions'
import enhance from '@enhance/ssr'
import styleTransform from '@enhance/enhance-style-transform'
import elements from '@architect/views/docs/elements/index.mjs'
import sidebarDataLoader from '@architect/views/docs/sidebar-data.mjs'
import document from '@architect/views/docs/document.mjs'
import HljsLineWrapper from './hljs-line-wrapper.mjs'

// Configuration
const docsRoute = 'docs' // this should match app.arc catchall

const arcdown = new Arcdown({
  pluginOverrides: {
    markdownItToc: { containerClass: 'list-none mb2 pl-2 leading2' },
  },
  hljs: {
    plugins: [new HljsLineWrapper({ className: 'code-line' })],
  },
})

async function http(request) {
  const { path: activePath, pathParameters } = request
  let docPath = pathParameters?.proxy || 'index'
  if (docPath.match(/\/$/)) docPath += 'index' // trailing slash == index.md file

  const docURL = new URL(
    `./node_modules/@architect/views/docs/md/${docPath}.md`,
    import.meta.url
  )
  const docMarkdown = readFileSync(docURL.pathname, 'utf-8')
  const doc = await arcdown.render(docMarkdown)

  const html = enhance({
    elements,
    initialState: {
      doc,
      sidebarData: sidebarDataLoader(docsRoute, activePath),
    },
    styleTransforms: [styleTransform],
  })

  return { html: html`${document(doc.title)}` }
}

export const handler = arc.http.async(http)
