import { EditorState, basicSetup } from '@codemirror/basic-setup'
import { EditorView, keymap } from '@codemirror/view'
import { indentWithTab } from '@codemirror/commands'
import { javascript } from '@codemirror/lang-javascript'
export default {
  EditorState,
  basicSetup,
  EditorView,
  keymap,
  indentWithTab,
  javascript
}
