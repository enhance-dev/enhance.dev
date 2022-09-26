/* eslint-disable filenames/match-regex */
import { readFileSync } from 'fs'
import { URL } from 'url'
import { Arcdown } from 'arcdown'
import arcStaticImg from 'markdown-it-arc-static-img'
import navDataLoader, {
  unslug,
  other as otherLinks,
} from '../../docs/nav-data.mjs'
import HljsLineWrapper from '../../docs/hljs-line-wrapper.mjs'

const arcdown = new Arcdown({
  pluginOverrides: {
    markdownItToc: {
      containerClass: 'toc mb2 ml-2',
      listType: 'ul',
    },
  },
  plugins: [arcStaticImg],
  hljs: {
    sublanguages: { javascript: ['xml', 'css'] },
    plugins: [new HljsLineWrapper({ className: 'code-line' })],
  },
})

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get(request) {
  const { path: activePath } = request
  let docPath = activePath.replace(/^\/?docs\//, '') || 'index'
  if (docPath.endsWith('/')) {
    docPath += 'index' // trailing slash == index.md file
  }

  const gacode =
    process.env.ARC_ENV === 'production' ? 'G-FQHNPN78V3' : 'G-0ES194BJQ6'

  const docURL = new URL(`../../docs/md/${docPath}.md`, import.meta.url)

  const sidebarData = navDataLoader('docs', activePath)

  let docMarkdown
  try {
    docMarkdown = readFileSync(docURL.pathname, 'utf-8')
  } catch (_err) {
    let searchTerm = null
    if (!docPath.endsWith('/index')) {
      const docPathParts = docPath.split('/')
      searchTerm = docPathParts.pop()
      searchTerm = unslug(searchTerm)
    }
    const initialState = {
      doc: {
        title: '404',
        path: docPath,
        term: searchTerm || '',
      },
      otherLinks,
      sidebarData,
      searchTerm,
      gacode,
    }

    return { statusCode: 404, json: initialState }
  }
  const doc = await arcdown.render(docMarkdown)

  let gitHubLink = 'https://github.com/enhance-dev/enhance.dev/edit/main/src/'
  gitHubLink += `views/docs/md/${docPath}.md`

  const initialState = {
    doc,
    gitHubLink,
    otherLinks,
    sidebarData,
    gacode,
  }

  let cacheControl =
    process.env.ARC_ENV === 'production'
      ? 'max-age=3600;'
      : 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'

  return {
    cacheControl,
    json: initialState,
  }
}
