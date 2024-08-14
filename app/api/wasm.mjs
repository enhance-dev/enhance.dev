import navDataLoader from '../docs/nav-data.mjs'

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get ({ query }) {
  const { thanks } = query

  const cacheControl =
    process.env.ARC_ENV === 'production'
      ? 'max-age=86400'
      : 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'

  const navData = navDataLoader('docs', '/wasm')

  return {
    headers: {
      'cache-control': cacheControl,
    },
    json: {
      pageTitle: 'Enhance WASM',
      thanks,
      navData,
    },
  }
}
