import arc from '@architect/functions'
import data from '@begin/data'
import prettier from 'prettier'
import Prism from 'prismjs'
import enhance from '@enhance/ssr'

export const handler = arc.events.subscribe(process)

async function process(event) {
  const key = event?.key
  const entryFunction = funkifyEntry(event.entrySrc)
  const component1Function = funkifyComponent(event.component1Src)
  const tagName1 = getTagName(event.component1Src)
  const component2Function = funkifyComponent(event.component2Src)
  const tagName2 = getTagName(event.component2Src)
  const elements = {}
  if (tagName1) elements[tagName1] = component1Function()
  if (tagName2) elements[tagName2] = component2Function()
  const html = enhance({ elements })
  const handler = await entryFunction({ html, elements, enhance })
  const previewDoc = await handler()

  const prettyMarkup = prettier.format(previewDoc.document, {
    parser: 'html'
  })
  // .replace(new RegExp('&', 'g'), '&amp;')
  // .replace(new RegExp('<', 'g'), '&lt;')
  const enhancedMarkup = Prism.highlight(
    prettyMarkup,
    Prism.languages.markup,
    'markup'
  )

  const now = new Date()
  const ttl = Math.round(now.getTime() / 1000) + 24 * 60 * 60
  const result = await data.set({
    key,
    ttl,
    table: 'repl',
    repl: {
      enhancedMarkup,
      previewDoc: previewDoc.document
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;'),
      entrySrc: event.entrySrc,
      component1Src: event.component1Src,
      component2Src: event.component2Src,
      openEditor: event.openEditor || 1,
      openPreview: event.openPreview || 1
    }
  })
  console.log('event data set', result)
}

// if args needed they go before function string new AsyncFunction("arg1",funcString)
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor

const patternImport = new RegExp(
  /import(?:["'\s]*([\w*${}\n\r\t, ]+)from\s*)?["'\s]["'\s](.*[@\w_-]+)["'\s].*;?$/,
  'mg'
)
// eslint-disable-next-line no-unused-vars
const patternDynamicImport = new RegExp(
  /import\((?:["'\s]*([\w*{}\n\r\t, ]+)\s*)?["'\s](.*([@\w_-]+))["'\s].*\);?$/,
  'mg'
)

function funkifyEntry(str) {
  const funcString = str
    ?.replace(/export default/, 'return ')
    ?.replace(patternImport, "const $1= (await import('$2')).default")
  const funcStringWithScope = `
  const {enhance={},html={},elements={}}= args
  return (async function(){ ${funcString} })()
  `
  const newFunc = new AsyncFunction('args', funcStringWithScope)
  return newFunc
}

function funkifyComponent(str) {
  const funcString = str?.replace(/export default/, 'return ')
  const newFunc = new Function(funcString)
  return newFunc
}
function getTagName(text) {
  return text?.replace(
    new RegExp(
      /^(.|\n|\r)*^\s*customElements.define\(['"]([a-zA-Z\-0-9]*)['"](.|\n|\r)*$/,
      'mg'
    ),
    '$2'
  )
}
