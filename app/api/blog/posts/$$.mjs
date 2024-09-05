import HljsLineWrapper from '../../../docs/hljs-line-wrapper.mjs'
import footnote from 'markdown-it-footnote'
import url from 'url'
import path from 'path'
import { Arcdown } from 'arcdown'
import { URL } from 'url'
import { default as defaultClassMapping } from '../../markdown-class-mappings.mjs'
// import { getWebMentions } from '../../../../shared/webmentions.mjs'
import { readFileSync } from 'fs'
import navDataLoader from '../../../docs/nav-data.mjs'

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get (req) {

  // reinvoked each req so no weird regexp caching
  const arcdown = new Arcdown({
    plugins: {
      footnote
    },
    pluginOverrides: {
      markdownItToc: {
        containerClass: 'toc mb2 ml-2',
        listType: 'ul',
      },
      markdownItClass: defaultClassMapping,
    },
    hljs: {
      sublanguages: { javascript: [ 'xml', 'css' ] },
      plugins: [ new HljsLineWrapper({ className: 'code-line' }) ],
    },
  })

  const account = req.session.account

  const { path: activePath } = req
  let docPath = activePath.replace(/^\/?blog\//, '') || 'index'
  if (docPath.endsWith('/')) {
    docPath += 'index' // trailing slash == index.md file
  }

  const docURL = new URL(`../../../blog/${docPath}.md`, import.meta.url)

  let docMarkdown
  try {
    docMarkdown = readFileSync(docURL.pathname, 'utf-8')
  }
  catch (_err) {
    return { statusCode: 404 }
  }
  const post = await arcdown.render(docMarkdown)
  // const mentions = (await getWebMentions()).filter(mention => mention.targetPath === req.path && mention.approved)

  let series = null
  const { frontmatter } = post
  const postSeries = frontmatter.series

  if (postSeries) {
    const here = path.dirname(url.fileURLToPath(import.meta.url))
    const seriesJson = path.join(here, '..', 'series.json')
    const seriesFile = readFileSync(seriesJson, 'utf-8')
    const seriesData = JSON.parse(seriesFile)
    series = seriesData[postSeries]
  }

  let cacheControl = process.env.ARC_ENV === 'production'
    ? 'max-age=3600;'
    : 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'

  const navData = navDataLoader('docs', activePath)
  console.log('nav data loader called from api/blog/posts')

  return {
    headers: {
      'cache-control': cacheControl,
    },
    json: {
      post,
      pageTitle: `${post.frontmatter.title.replaceAll(/"/g, "'")}`,
      pageDescription: post.frontmatter.description
        ? post.frontmatter.description.replaceAll(/"/g, "'")
        : undefined,
      pageImage: post.frontmatter.image,
      series,
      // mentions,
      account,
      activeRoute: 'blog',
      navData,
    },
  }
}
