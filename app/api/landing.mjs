/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get({ query }) {
  const { newui } = query

  if (typeof newui === 'undefined')
    return {
      statusCode: 302,
      location: '/docs/',
    }

  return {}
}
