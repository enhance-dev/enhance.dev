---
title: Testing
---

A big benefit of Enhance custom element [pure functions](https://en.wikipedia.org/wiki/Pure_function) is that they return a string that you can test against an expected output. It doesn't need to get any more complicated than that to get started.

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

function strip(str) => str.replace(/\r?\n|\r|\s\s+/g, '')

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

## Component testing

Running component tests allow you to mount, render and interact with a single Enhance component in isolation. To ensure that test conditions are as close as possible to the real world, we recommend to run them in actual browser rather than using e.g. [JSDOM](https://github.com/jsdom/jsdom) which is just a JavaScript implementation of web standards browser offer. To run Enhance component tests you can use [WebdriverIO](https://webdriver.io/) as a browser automation framework. It is based on the [WebDriver](https://www.w3.org/TR/webdriver/) protocol which is a browser automation web standard which guarantees that your tests interact with your components as closely as possible to how a user would.

To add a WebdriverIO test harness to your project, run:

```shell
npm init wdio@latest ./
```

The command initializes a configuration wizard that helps you set-up the test harness. Make sure to select on the first question: "_Where should your tests be launched?_" the answer: "_browser - for unit and component testing in the browser_".

An example test file should be created. Replace the content with e.g.:

```javascript
import { expect, browser, $$ } from '@wdio/globals'
import enhance from '@enhance/ssr'

// see actual component here: https://github.com/webdriverio/component-testing-examples/blob/main/enhance/app/elements/my-header.mjs
import MyHeader from '../../app/elements/my-header.mjs'

describe('Enhance Framework', () => {
  it('should render MyHeader element correctly', async () => {
    const html = enhance({
      elements: {
        'my-header': MyHeader
      }
    })
    const actual = document.createElement('div')
    actual.innerHTML = (html`<my-header></my-header>`).replace(/<\/?\s*(html|head|body)>/g, '')
    document.body.appendChild(actual)
    expect(await $$('img').length).toBe(2)
  })
})
```

You can find the WebdriverIO API docs at [webdriver.io/docs/api](https://webdriver.io/docs/api) and the full example for Enhance component testing [on GitHub](https://github.com/webdriverio/component-testing-examples/tree/main/enhance). If you have any questions, join the project's [Gitter channel](https://gitter.im/webdriverio/webdriverio).