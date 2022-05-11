import { EditorState, basicSetup } from '@codemirror/basic-setup'
import { EditorView, keymap } from '@codemirror/view'
import { indentWithTab } from '@codemirror/commands'
// import { javascript } from '@codemirror/lang-javascript'
import { javascript } from '../../../codemirror/lang-javascript-html/dist/index.js'

// import { html } from '@codemirror/lang-html'
// console.log('html support: ', html)
export default {
  EditorState,
  basicSetup,
  EditorView,
  keymap,
  indentWithTab,
  // html
  javascript
}
