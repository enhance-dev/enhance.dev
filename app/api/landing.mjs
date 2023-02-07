/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get(request) {
  const {
    query: { newui },
  } = request

  // if (typeof newui === 'undefined')
  //   return {
  //     statusCode: 302,
  //     location: '/docs/',
  //   }

  return {
    json: { newui, request },
  }
}
