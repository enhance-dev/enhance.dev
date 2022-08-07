import test from 'tape'
import { get } from 'tiny-json-http'
import { start, end } from '@architect/sandbox'

const host = 'http://localhost:3333/'

test('check key paths', async (t) => {
  t.pass(await start({ quiet: true }))

  const docs = await get({ url: `${host}docs/` })
  t.ok(docs.body, 'docs are reachable')

  const waitlist = await get({ url: `${host}waitlist` })
  t.ok(waitlist.body, 'waitlist is reachable')

  const playground = await get({ url: `${host}playground` })
  t.ok(playground.body, 'playground is reachable')

  // const tutorial = await get({ url: `${host}tutorial` })
  // t.ok(tutorial.body, 'tutorial is reachable')

  t.pass(await end())

  t.end()
})
