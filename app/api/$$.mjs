import { checkRedirects } from '../lib/marketing-redirects.mjs'

async function catchAll () {
  return {
    statusCode: 302,
    location: '/404',
  }
}

export const get = [ checkRedirects, catchAll ]
