import enhance from '@enhance/ssr'
import elements from './elements.mjs'
import Document from './document.mjs'
import arc from '@architect/functions'
import importTransform from './script-regex-transform.mjs'
import map from './_bundles/map.mjs'
import { styleTransform } from './style-scope-transform.mjs'

export default function html(str, ...values) {
  const html = enhance({
    elements,
    scriptTransforms: [importTransform({ map })],
    styleTransforms: [styleTransform]
  })
  return Document(html(str, ...values), arc.static)
}
export function initRender({ initialState = '' } = {}) {
  let options = {
    elements,
    scriptTransforms: [importTransform({ map })],
    styleTransforms: [styleTransform]
  }
  if (initialState) options.initialState = initialState
  const html = enhance(options)
  return function (str, ...values) {
    return Document(html(str, ...values), arc.static)
  }
}
