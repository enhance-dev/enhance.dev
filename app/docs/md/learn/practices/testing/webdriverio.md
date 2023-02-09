---
title: Component Testing With WebdriverIO
---

Running component tests allow you to mount, render and interact with a single Enhance component in isolation.
To ensure that test conditions are as close as possible to the real world, we recommend to run them in actual browser rather than using e.g. [JSDOM](https://github.com/jsdom/jsdom) which is just a JavaScript implementation of web standards provided by browsers.
To run Enhance component tests you can use [WebdriverIO](https://webdriver.io/) as a browser automation framework.
It is based on the [WebDriver](https://www.w3.org/TR/webdriver/) protocol, a browser automation web standard which guarantees that your tests interact with your components as closely as possible to how a user would.

To add a WebdriverIO test harness to your project, run:

```shell
npm init wdio@latest ./
```

The command initializes a configuration wizard that helps you set-up the test harness.
Make sure to select on the first question: "_Where should your tests be launched?_" the answer: "_browser - for unit and component testing in the browser_".

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

You can find the WebdriverIO API docs at [webdriver.io/docs/api](https://webdriver.io/docs/api) and the full example for Enhance component testing [on GitHub](https://github.com/webdriverio/component-testing-examples/tree/main/enhance).
If you have any questions, join the project's [Gitter channel](https://gitter.im/webdriverio/webdriverio).