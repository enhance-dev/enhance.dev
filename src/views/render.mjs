import enhance from '@enhance/ssr'
import elements from './elements.mjs'
import Document from './document.mjs'
import arc from '@architect/functions'

export default function html(str, ...values) {
  const html = enhance({ elements })
  return Document(html(str, ...values), arc.static)
}
export function initRender(initialState = {}) {
  const html = enhance({ elements, initialState })
  return function (str, ...values) {
    return Document(html(str, ...values), arc.static)
  }
}
