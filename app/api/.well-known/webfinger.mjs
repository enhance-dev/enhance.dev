// ! This doesn't work until Enhance supports dots in paths

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get({ query }) {
  const { resource } = query
  const [, user, host] = resource?.match(/^acct:(.*)@(.*)$/) || []

  const axol =
    user === 'axol' && host === 'enhance.dev'
      ? {
          subject: 'acct:axol@enhance.dev',
          aliases: [
            'https://fosstodon.org/@enhance_dev',
            'https://fosstodon.org/users/enhance_dev',
          ],
          links: [
            {
              rel: 'http://webfinger.net/rel/profile-page',
              type: 'text/html',
              href: 'https://fosstodon.org/@enhance_dev',
            },
            {
              rel: 'self',
              type: 'application/activity+json',
              href: 'https://fosstodon.org/users/enhance_dev',
            },
            {
              rel: 'http://ostatus.org/schema/1.0/subscribe',
              template: 'https://fosstodon.org/authorize_interaction?uri={uri}',
            },
          ],
        }
      : null

  return axol
    ? {
        headers: {
          'Content-Type': 'application/jrd+json; charset=utf-8',
        },
        json: axol,
      }
    : {
        headers: { 'Content-Type': 'text/plain' },
        body: 'Not found',
        statusCode: 404,
      }
}
