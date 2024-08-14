import navDataLoader from '../../docs/nav-data.mjs'

export async function get (req) {
  const { path: activePath } = req

  const cacheControl =
    process.env.ARC_ENV === 'production'
      ? 'max-age=3600'
      : 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'

  const navData = navDataLoader('docs', activePath)

  return {
    headers: {
      'cache-control': cacheControl,
    },
    json: {
      pageTitle: 'Cookbook',
      navData,
    },
  }
}
