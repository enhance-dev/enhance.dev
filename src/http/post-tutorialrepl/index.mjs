import arc from '@architect/functions'
import { nanoid } from 'nanoid'

export const handler = arc.http.async(sendUserCode)

async function sendUserCode(req) {
  const body = req.body
  const returnPath = req.query?.path
  const key = nanoid(10)
  const payload = { ...body, key }

  await arc.events.publish({
    name: 'repl-secure-sandbox',
    payload,
  })
  return {
    statusCode: 302,
    location: `/tutorial${returnPath ? `/${returnPath}` : ''}?key=${key}`,
  }
}
