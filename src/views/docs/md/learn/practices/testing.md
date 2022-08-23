---
title: Testing
---

## Element tests
Testing can be a daunting task if you let it. One benefit of Custom Element [pure functions](https://en.wikipedia.org/wiki/Pure_function) is that they return a string that you can test against an expected output. It doesn't need to get any more complicated than that.

```javascript
import test from 'tape'
import enhance from '@enhance/ssr'
import MyParagraph from './fixtures/my-paragraph.mjs'

function Head() {
  return `
<!DOCTYPE html>
<head></head>
  `
}

const strip = str => str.replace(/\r?\n|\r|\s\s+/g, '')

test('expand template', t => {
  const html = enhance({
    elements: {
      'my-paragraph': MyParagraph
    }
  })

  const actual = html`
${Head()}
<my-paragraph></my-paragraph>
  `

  const expected = `
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<my-paragraph>
  <p><span slot="my-text">My default text</span></p>
</my-paragraph>
</body>
</html>
  `

  t.equal(
    strip(actual),
    strip(expected),
    'By gum, that template was expanded with slotted default content!'
  )
  t.end()
})
```

## API tests
To test an `api` route you can spin up a local server then test the response from a route.

```javascript
const { get } = require('tiny-json-http')
const test = require('tape')
const sandbox = require('@architect/sandbox')
const url = (path) => `http://localhost:3333${path}`

test(`Start local server`, async t => {
  await sandbox.start({ quiet: true })

  t.pass('local server started')
  t.end()
})

test('Api should return expected result', async t => {
  const response = await get({ url: url('/') })
  const actual = response.body
  const expected = { count:  1 }

  t.equal(actual, expected, 'API returned expected result')
  t.end()
})

test('Shut down local server', async t => {
  await sandbox.end()

  t.pass('Shut down Sandbox')
  t.end()
})
```

