import path from 'path'
import url from 'url'
import { readFileSync } from 'fs'
import { parseDate } from '../../lib/parseDate.mjs'
import navDataLoader from '../../docs/nav-data.mjs'

function isPublished (str) {
  return process.env.DISABLE_DATE_CHECK === 'true'
    ? true
    : parseDate(str) < Date.now()
}

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get (req) {
  const account = req.session.account

  let here = path.dirname(url.fileURLToPath(import.meta.url))
  let base = path.join(here, 'posts.json')
  let posts = JSON.parse(readFileSync(base, 'utf-8'))
    .reverse()
    .filter(({ frontmatter }) => isPublished(frontmatter.published))

  const parsedLimit = parseInt(req.query.limit, 10)
  const limit = parsedLimit > 0 ? parsedLimit : 20
  const parsedOffset = parseInt(req.query.offset, 10)
  const offset = parsedOffset >= 0 ? parsedOffset : 0
  const total = posts.length

  const { path: activePath } = req
  const navData = navDataLoader('docs', activePath)
  console.log('nav data loader called from api/blog/index')

  return {
    json: {
      posts,
      pageTitle: 'Blog',
      limit,
      offset,
      total,
      account,
      activeRoute: 'blog',
      navData,
    },
  }
}
