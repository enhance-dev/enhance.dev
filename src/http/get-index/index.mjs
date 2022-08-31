import arc from '@architect/functions'
import html from './html.mjs'

export const handler = arc.http.async(docs)

async function docs() {
  return {
    statusCode: 301,
    location: '/docs/'
  }
}
