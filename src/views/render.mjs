import enhance from '@enhance/ssr'
import elements from './elements.mjs'
import Document from './document.mjs'
import arc from '@architect/functions'
import importTransform from '@enhance/import-transform'
import styleTransform from '@enhance/enhance-style-transform'

export default function html(str, ...values) {
  const html = enhance({
    elements,
    scriptTransforms: [importTransform({ lookup: arc.static })],
    styleTransforms: [styleTransform],
  })
  return Document(html(str, ...values), arc.static)
}
export function initRender({ initialState = '' } = {}) {
  let options = {
    elements,
    scriptTransforms: [
      importTransform({
        lookup: arc.static,
        workers: [{ label: '__API_WORKER__', path: 'worker.mjs' }],
      }),
    ],
    styleTransforms: [styleTransform],
  }
  if (initialState) options.initialState = initialState
  const html = enhance(options)
  return function (str, ...values) {
    return Document(html(str, ...values), arc.static)
  }
}
