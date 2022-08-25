import arc from '@architect/functions'

export const handler = arc.http.async(html)

export default async function html() {
  return {
    statusCode: 302,
    location: '/waitlist',
  }
}
