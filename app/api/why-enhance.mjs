import navDataLoader from '../docs/nav-data.mjs'

export async function get () {
  const navData = navDataLoader('docs', '/why-enhance')

  const cacheControl =
    process.env.ARC_ENV === 'production'
      ? 'max-age=86400'
      : 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'

  return {
    headers: {
      'cache-control': cacheControl,
    },
    json: {
      navData,
    },
  }
}
