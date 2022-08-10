import data from '@begin/data'
import { readFileSync } from 'fs'
import { join } from 'path'
import { Arcdown } from 'arcdown'
import classMap from './class-mapping.mjs'
import { initRender } from '@architect/views/render.mjs'

let html = initRender()

const arcdown = new Arcdown({
  hljs: { classString: 'hljs mb0 mb1-lg relative' },
  pluginOverrides: { markdownItClass: classMap },
})

const cache = {}

export default async function HTML(req) {
  const { pathParameters, query } = req
  const { proxy } = pathParameters
  const parts = proxy.split('/')
  const docName = parts.pop()

  const doc = `${docName}.md`
  const code = `${docName}-code.mjs`

  const docFilePath = join(
    new URL('.', import.meta.url).pathname,
    'tutorial-content',
    ...parts,
    doc
  )
  const codeFilePath = join(
    new URL('.', import.meta.url).pathname,
    'tutorial-content',
    ...parts,
    code
  )

  let docBody

  if (cache[docFilePath]) {
    docBody = cache[docFilePath]
  } else {
    const file = readFileSync(docFilePath, 'utf8')
    const result = await arcdown.render(file)
    docBody = cache[docFilePath] = result.html
  }

  const key = query?.key
  const solution =
    query.hasOwnProperty('solution') &&
    query.solution !== false &&
    query.solution !== 'false'
  let repl
  try {
    if (key) {
      const result = await poll(
        async () => data.get({ table: 'repl', key }),
        2000,
        50
      ).catch((e) => console.log(e))
      repl = result?.repl ? result.repl : (await import(codeFilePath)).default
    } else {
      repl = (await import(codeFilePath)).default
    }
    console.log({ proxy })
    const initialState = {
      repl,
      solution: solution ? true : false,
      loggedIn: false,
      theme: { ['lg-screen']: '48em' },
      location: `/tutorial/${proxy}`,
      menuLinks: [
        { name: 'Docs', location: '/docs' },
        { name: 'Tutorial', location: '/tutorial' },
        { name: 'Playground', location: '/playground' },
      ],
      tutorialDoc: docBody,
    }
    if (key) initialState.replKey = key

    html = initRender({
      initialState,
    })

    return {
      statusCode: 200,
      html: html`<tutorial-page></tutorial-page>`,
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      html: html`<error-page error=${err}></error-page>`,
    }
  }
}

async function poll(fn, timeout, interval) {
  const endTime = Number(new Date()) + (timeout || 2000)
  interval = interval || 100

  async function checkCondition(resolve, reject) {
    // If the condition is met, we're done!
    const result = await fn()
    if (result) {
      resolve(result)
    }
    // If the condition isn't met but the timeout hasn't elapsed, go again
    else if (Number(new Date()) < endTime) {
      setTimeout(checkCondition, interval, resolve, reject)
    }
    // Didn't match and too much time, reject!
    else {
      reject(new Error('timed out for ' + fn + ': ' + arguments))
    }
  }

  return new Promise(checkCondition)
}
