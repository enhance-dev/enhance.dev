import buildScoper from '../scope-css.mjs'
import map from '../../http/get-index/node_modules/@architect/importmap/browser/index.mjs'
export default function CodeEditorTemplate({ html, state = {} }) {
  const formName = state?.attrs['form-name'] || ''
  const docName = state?.attrs['doc-name'] || ''
  const initialDoc = (state?.store?.repl && state.store.repl[docName]) || ''
  const scope = buildScoper({
    scopeTo: 'code-editor',
    disable: !state?.store?.scopedCSS
  })
  return html`
    ${scope`
    <style enh-scope="component">
      .min-height-editor {
        min-height: 16rem;
      }
      textarea.js-editor {
        tab-size: 2;
        background-color: white;
        color: black;
      }

      .js-editor {
        color: '#232b31';
        min-height: '100vh';
        background-color: 'white';
      }
      .cm-scroller {
        overflow: 'auto';
      }
      .js-editor .cm-content {
        caret-color: 'red';
        white-space:pre-wrap;
        font-size:.75rem;
      }
      .editor.cm-focused .cm-cursor {
        border-left-color: '#0e9';
      }
      .js-editor.cm-focused .cm-selectionBackground,
      ::selection {
        background-color: '#074';
      }
      .cm-gutters {
        background-color: '#045';
        color: '#ddd';
        border: 'none';
      }
    </style>
  `}

    <div>
      <div class="js-editor hidden font-mono text-p1 text0"></div>
      <textarea
        class="no-js-editor block  h-screen p0 w-full h-full font-mono text0  text-p2 leading1"
        name="${docName}"
        form="${formName}"
        placeholder="Enter HTML Source Code"
        spellcheck="false">
${initialDoc}</textarea
      >
    </div>
    <button
      type="button"
      class="js-format text0 border1 border-dark border-solid radius0 p-4 ">
      Format
    </button>

    <script type="module">
      import codemirror from '${map.codemirror}'
      import API from '${map.api}'
      import beautify from '${map.beautify}'

      class CodeEditor extends HTMLElement {
        constructor() {
          super()
          this.api = API()
          this.update = this.update.bind(this)
          this.textarea = this.querySelector('textarea.no-js-editor')
          this.editorContainer = this.querySelector('div.js-editor')
          this.initialDoc = this.textarea.textContent
          this.format = this.format.bind(this)
          this.formatButton = this.querySelector('.js-format')
          this.formatButton.addEventListener('click', this.format)
          this.api.repl.create({ name: this.docName, doc: this.initialDoc })

          const {
            EditorState,
            basicSetup,
            EditorView,
            keymap,
            indentWithTab,
            javascript
          } = codemirror
          this.editor = new EditorView({
            state: EditorState.create({
              doc: this.initialDoc,
              lineWrapping: true,
              extensions: [
                basicSetup,
                keymap.of([indentWithTab]),
                javascript(),
                EditorView.updateListener.of(this.update)
              ]
            }),

            parent: this.editorContainer
          })
        }

        update(value) {
          this.api.repl.update({ name: this.docName, doc: this.text })
        }
        format() {
          let formatted = this.editor.state.update({
            changes: {
              from: 0,
              to: this.editor.state.doc.length,
              insert: beautify.js_beautify(this.text)
            }
          })
          this.editor.dispatch(formatted)
        }

        get text() {
          return this.editor.state.doc.text.join('\\n')
        }

        connectedCallback() {
          if (this.isConnected) {
            this.editorContainer.style['display'] = 'block'
            this.textarea.style['display'] = 'none'
          }
        }
        disconnectedCallback() {}
        // attributeChangedCallback(name, o, n) {
        //   if(name==='doc-name'){

        //   }
        // }
        // static get observedAttributes() {
        //   return ['doc-name']
        // }
        get docName() {
          return this.getAttribute('doc-name')
        }
      }
      customElements.define('code-editor', CodeEditor)
    </script>
  `
}
