import { initRender } from '@architect/views/render.mjs'
import data from '@begin/data'
let html = initRender()

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
  const key = req.query?.key
  try {
    let repl = {
      enhancedMarkup: '',
      previewDoc: '',
      entrySrc: entryBoilerplate,
      'tab-1': templateBoilerplate,
      'tab-2': templateBoilerplate,
      openEditor: 1,
      openPreview: 1,
    }
    if (key) {
      const result = await poll(
        async () => data.get({ table: 'repl', key }),
        2000,
        100
      ).catch((e) => console.log(e))
      repl = result?.repl ? result.repl : repl
    }
    const initialState = {
      scopedCSS: true,
      repl,
      loggedIn: false,
      location: '/',
      menuLinks: [
        { name: 'Docs', location: '/docs' },
        { name: 'Tutorial', location: '/tutorial' },
        { name: 'Playground', location: '/playground' },
      ],
    }
    if (key) initialState.replKey = key
    html = initRender({
      initialState,
    })

    return {
      statusCode: 200,
      html: html`<playground-page></playground-page>`,
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
