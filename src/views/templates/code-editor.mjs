export default function CodeEditorTemplate({ html, state = {} }) {
  const formName = state?.attrs['form-name'] || ''
  const docName = state?.attrs['doc-name'] || ''
  const initialDoc = (state?.store?.repl && state.store.repl[docName]) || ''
  return html`
    <style>
      :host {
        display: grid;
        grid-template-rows: 1fr auto;
      }
      .min-height-editor {
        min-height: 16rem;
      }
      textarea.js-editor {
        tab-size: 2;
        background-color: white;
        color: black;
      }

      .js-editor {
        color: #232b31;
        /*height: 100%;*/
        background-color: white;
      }
      .cm-editor {
        /* height: 100%;*/
      }
      .cm-scroller {
        overflow: auto;
      }
      .js-editor .cm-content {
        caret-color: red;
        white-space: pre-wrap;
        font-size: 0.75rem;
      }
      .editor.cm-focused .cm-cursor {
        border-left-color: #0e9;
      }
      .js-editor.cm-focused .cm-selectionBackground,
      ::selection {
        background-color: #074;
      }
      .cm-gutters {
        background-color: #045;
        color: #ddd;
        border: none;
      }
      .js-format {
        justify-self: start;
      }
    </style>
    <div class="grid">
      <div class="js-editor hidden font-mono text-p1 text0"></div>
      <textarea
        class="no-js-editor block  h-screen p0 w-full h-full font-mono text0  text-p2 leading1"
        name="${docName}"
        form="${formName}"
        placeholder="Enter HTML Source Code"
        spellcheck="false">
${initialDoc}</textarea
      >
      <!--<button
        type="button"
        class="js-format text0 border1 border-dark border-solid radius0 p-4">
        Format
      </button>-->
    </div>
    <script type="module">
      import {
        EditorState,
        basicSetup,
        EditorView,
        keymap,
        indentWithTab,
        javascript
      } from '/_static/bundles/codemirror.mjs'
      import Store from '/_static/bundles/store.mjs'
      import API from '/_static/bundles/api.mjs'
      import beautify from '/_static/bundles/beautify.mjs'

      class CodeEditor extends HTMLElement {
        constructor() {
          super()
          this.api = API({
            worker: new Worker('__API_WORKER__'),
            store: Store()
          })
          this.update = this.update.bind(this)
          this.textarea = this.querySelector('textarea.no-js-editor')
          this.editorContainer = this.querySelector('div.js-editor')
          this.initialDoc = this.textarea.textContent
          this.format = this.format.bind(this)
          this.formatButton = this.querySelector('.js-format')
          this?.formatButton?.addEventListener('click', this.format)
          this.api.repl.create({ name: this.docName, doc: this.initialDoc })

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
          // return this.editor.state.doc.text.join('\\n')
          const doc = this.editor.state.sliceDoc(0, this.length)
          return doc
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
