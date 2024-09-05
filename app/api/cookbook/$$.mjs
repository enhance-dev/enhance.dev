/* eslint-disable filenames/match-regex */
import { readFileSync } from 'fs'
import { URL } from 'url'
import { Arcdown } from 'arcdown'
import arcStaticImg from 'markdown-it-arc-static-img'
import navDataLoader, {
  other as otherLinks,
} from '../../docs/nav-data.mjs'
import HljsLineWrapper from '../../docs/hljs-line-wrapper.mjs'

const arcdown = new Arcdown({
  pluginOverrides: {
    markdownItToc: {
      containerClass: 'toc mbe2 mis-2 leading2',
      listType: 'ul',
      level: [ 1, 2, 3 ],
    },
  },
  plugins: [ arcStaticImg ],
  hljs: {
    sublanguages: { javascript: [ 'xml', 'css' ] },
    plugins: [ new HljsLineWrapper({ className: 'code-line' }) ],
  },
})

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get (request) {
  const { path: activePath } = request
  let recipePath = activePath.replace(/^\/?docs\//, '') || 'index'

  let recipeURL = new URL(`../../${recipePath}.md`, import.meta.url)

  const navData = navDataLoader('docs', activePath)
  console.log('nav data loader called from api/cookbook')


  let recipeMarkdown
  try {
    recipeMarkdown = readFileSync(recipeURL.pathname, 'utf-8')
  }
  catch (e) {
    return {
      location: '/404'
    }
  }

  const recipe = await arcdown.render(recipeMarkdown)

  const initialState = {
    recipe,
    otherLinks,
    navData,
  }

  let cacheControl =
    process.env.ARC_ENV === 'production'
      ? 'max-age=3600;'
      : 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'

  return {
    headers: {
      'cache-control': cacheControl,
    },
    json: initialState,
  }
}
