import { initRender } from '@architect/views/render.mjs'
let html = initRender()
import { readFileSync } from 'fs'
import { join } from 'path'
import arcdown from 'arcdown'
import renderer from './markdown-render.mjs'
import toc from '@architect/views/docs/table-of-contents.mjs'
import markdownItAttrs from 'markdown-it-attrs'

const options = {
  renderer,
  plugins: {
    markdownItAttrs
  }
}
let cache = {}

export default async function HTML(req) {
  const { pathParameters } = req
  const { lang, proxy } = pathParameters
  const parts = proxy.split('/')
  const docName = parts.pop()

  const doc = `${docName}.md`

  const filePath = join(
    '.',
    'node_modules',
    '@architect',
    'views',
    'docs',
    lang,
    ...parts,
    doc
  )

  try {
    let docBody, file
    if (cache[filePath]) {
      docBody = cache[filePath]
    } else {
      file = readFileSync(filePath, 'utf8')
      cache[filePath] = await arcdown(file, options)
      docBody = cache[filePath]
    }

    console.log(docBody)
    const html = initRender({
      initialState: {
        pageBody: docBody.html,
        tableOfContents: docBody.tocHtml
      }
    })

    return {
      statusCode: 200,
      html: html`<doc-page></doc-page>`
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      html: html`<error-page error=${err}></error-page>`
    }
  }
}
