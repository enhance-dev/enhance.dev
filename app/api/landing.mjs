/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get({ query }) {
  const { newui, thanks } = query

  if (typeof newui === 'undefined')
    return {
      statusCode: 302,
      location: '/docs/',
    }

  const cacheControl =
    process.env.ARC_ENV === 'production'
      ? 'max-age=300'
      : 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'

  return {
    headers: {
      'cache-control': cacheControl,
    },
    json: {
      thanks,
    },
  }
}
