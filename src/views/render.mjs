import enhance from '@enhance/ssr'
import elements from './elements.mjs'
import Document from './document.mjs'
const html = enhance({ elements })

export default function render(str = '') {
  return Document(html(str))
}
