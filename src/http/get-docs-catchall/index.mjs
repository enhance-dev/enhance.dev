import { readFileSync } from 'fs'
import { URL } from 'url'
import { Arcdown } from 'arcdown'
import arc from '@architect/functions'
import enhance from '@enhance/ssr'
import styleTransform from '@enhance/enhance-style-transform'
import elements from '@architect/views/docs/elements/index.mjs'
import navDataLoader, {
  other as otherLinks,
} from '@architect/views/docs/nav-data.mjs'
import document from '@architect/views/docs/document.mjs'
import HljsLineWrapper from './hljs-line-wrapper.mjs'

// Configuration
const docsRoute = 'docs' // this should match app.arc catchall

const arcdown = new Arcdown({
  pluginOverrides: {
    markdownItToc: {
      containerClass: 'toc mb2 ml-2',
      listType: 'ul',
    },
  },
  hljs: {
    plugins: [new HljsLineWrapper({ className: 'code-line' })],
  },
})

async function http(request) {
  const { path: activePath, pathParameters } = request
  let docPath = pathParameters?.proxy || 'index'
  if (docPath.match(/\/$/)) {
    docPath += 'index' // trailing slash == index.md file
  }

  const docURL = new URL(
    `./node_modules/@architect/views/docs/md/${docPath}.md`,
    import.meta.url
  )
  const docMarkdown = readFileSync(docURL.pathname, 'utf-8')
  const doc = await arcdown.render(docMarkdown)

  let gitHubLink = 'https://github.com/enhance-dev/enhance.dev/tree/main/src/'
  gitHubLink += `views/docs/md/${docPath}.md`

  const html = enhance({
    elements,
    initialState: {
      doc,
      gitHubLink,
      otherLinks,
      sidebarData: navDataLoader(docsRoute, activePath),
    },
    styleTransforms: [styleTransform],
  })

  return { html: html`${document(doc.title)}` }
}

export const handler = arc.http.async(http)
