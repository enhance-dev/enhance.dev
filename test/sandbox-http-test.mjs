import test from 'tape'
import { get } from 'tiny-json-http'
import { start, end } from '@architect/sandbox'

const host = 'http://localhost:3333'
const endpoints = [
  '/docs/',
  '/waitlist',
  '/playground',
  // '/tutorial',
]

test('check key paths', async (t) => {
  t.pass(await start({ quiet: true }))

  for (const endpoint of endpoints) {
    const docs = await get({ url: `${host}${endpoint}` })
    t.ok(docs.body, `${endpoint} is reachable`)
  }

  t.pass(await end())

  t.end()
})
