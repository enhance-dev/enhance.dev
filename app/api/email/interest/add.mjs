import data from '@begin/data'
export async function post(req) {
  const email = req.body.email
  const timestamp = new Date(Date.now()).toISOString()
  await data.set({ table: 'email', email, timestamp })
  return {
    statusCode: 303,
    location: '/email/thank',
  }
}
