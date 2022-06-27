import data from '@begin/data'
import { readFileSync } from 'fs'
import { join } from 'path'
import arcdown from 'arcdown'
import classMap from './class-mapping.mjs'
import { initRender } from '@architect/views/render.mjs'
let html = initRender()

const cache = {} // cheap warm cache

const entryBoilerplate = `
 //import enhance from '@enhance/ssr'
 //import elements from '@architect/views/elements.mjs'

 export default async function handler() {
  // const html = enhance({
  //   elements,
  //   initialState: {}
  // })

     return {
       document: html\`<div>hello</div>\`
       //<login-page></login-page>
     }
 }
 `

const templateBoilerplate = `
 export default function LoginPage({html,state = {}}) {
   return  html\`
     <a href="#">
       <button>Login with GitHub</button>
     </a>
     <pre><code>

 </code></pre>

     <script type="module">
       class LoginPage extends HTMLElement {
         constructor() {
           super()
         }

         connectedCallback() {}
       }

       customElements.define('login-page', LoginPage)
     </script>
   \`
 }
 `

export default async function HTML(req) {
  console.log(req)
  const { pathParameters } = req
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
    const renderOptions = {
      hljs: { classString: 'hljs mb0 mb1-lg relative' },
      pluginOverrides: { markdownItClass: classMap }
    }
    const result = await arcdown(file, renderOptions)
    docBody = cache[docFilePath] = result.html
  }

  const key = req.query?.key
  try {
    const srcCode = (await import(codeFilePath)).default
    console.log(srcCode)
    let repl = {
      enhancedMarkup: '',
      previewDoc: '',
      entrySrc: srcCode?.entry || '',
      'tab-1': srcCode?.['tab-1'] || '',
      'tab-2': srcCode?.['tab-2'] || '',
      openEditor: 1,
      openPreview: 1
    }

    if (key) {
      const result = await poll(
        async () => data.get({ table: 'repl', key }),
        2000,
        50
      ).catch((e) => console.log(e))
      repl = result?.repl ? result.repl : repl
    }
    const initialState = {
      scopedCSS: true,
      repl,
      loggedIn: false,
      theme: { ['lg-screen']: '48em' },
      location: '/tutorial',
      menuLinks: [
        { name: 'Docs', location: '/docs' },
        { name: 'Tutorial', location: '/tutorial' },
        { name: 'Playground', location: '/playground' }
      ],
      tutorialDoc: docBody
    }
    if (key) initialState.replKey = key
    html = initRender({
      initialState
    })

    return {
      statusCode: 200,
      html: html`<tutorial-page></tutorial-page>`
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      html: html`<error-page error=${err}></error-page>`
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
