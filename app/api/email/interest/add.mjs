import data from '@begin/data'

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function post(req) {
  const email = req.body.email
  const timestamp = new Date(Date.now()).toISOString()
  await data.set({ table: 'email', email, timestamp })
  return {
    statusCode: 303,
    /* Change to `?thanks=true#email-thanks` before launch */
    location: '/landing?newui&thanks=true#email-thanks',
  }
}
