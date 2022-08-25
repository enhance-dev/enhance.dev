import arc from '@architect/functions'
import data from '@begin/data'
export const handler = arc.http.async(email)
async function email(req) {
  const email = req.body.email
  const timestamp = new Date(Date.now()).toISOString()
  await data.set({ table: 'email', email, timestamp })
  return {
    statusCode: 303,
    location: '/email/thank',
  }
}
