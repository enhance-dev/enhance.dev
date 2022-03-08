import arc from '@architect/functions'
import data from '@begin/data'
export const handler = arc.http.async(email)
async function email(req) {
  const email = req.body.email
  await data.set({ table: 'email', key: email })
  return {
    statusCode: 302,
    location: '/email/thank'
  }
}
