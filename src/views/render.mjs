import enhance from '@enhance/ssr'
import elements from './elements.mjs'
import Document from './document.mjs'
import arc from '@architect/functions'

export default function initRender(initialState = {}) {
  const html = enhance({ elements, initialState })
  return function (str = '') {
    return Document(html(str), arc.static)
  }
}
