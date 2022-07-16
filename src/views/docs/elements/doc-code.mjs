export default function DocCode({ html, state }) {
  const { attrs } = state
  const { lang = 'javascript' } = attrs

  return html`
    <style>
      :host .cm {
        display: none;
      }
    </style>

    <slot></slot>
    <div class="cm"></div>

    <script type="module">
      // TODO: bundle these things
      // import { EditorView } from 'https://esm.sh/codemirror'
      import {
        Compartment,
        EditorState,
      } from 'https://esm.sh/@codemirror/state@6.1.0'
      import {
        // ? unsure if this is better than from bare "codemirror"
        EditorView,
        lineNumbers,
      } from 'https://esm.sh/@codemirror/view@6.0.3'
      import {
        defaultHighlightStyle,
        HighlightStyle,
        syntaxHighlighting,
      } from 'https://esm.sh/@codemirror/language@6.2.0'
      import { languages } from 'https://esm.sh/@codemirror/language-data@6.1.0'
      import { javascript } from 'https://esm.sh/@codemirror/lang-javascript@6.0.1'

      class DocCode extends HTMLElement {
        constructor() {
          super()

          this.cmParent = this.querySelector('div.cm')
          this.codeParent = this.querySelector('pre')
          this.codeBlock = this.codeParent.querySelector('code')
          this.codeLang = this.codeBlock.getAttribute('data-language')
          this.codeText = this.codeBlock.innerText

          this.editorLangs = new Compartment()

          this.editor = new EditorView({
            state: EditorState.create({
              doc: this.codeText,
              extensions: [
                EditorView.editable.of(false),
                EditorState.readOnly.of(true),
                lineNumbers(),
                syntaxHighlighting(defaultHighlightStyle),
                this.editorLangs.of(javascript()),
              ],
            }),
            parent: this.cmParent,
          })
        }

        async connectedCallback() {
          if (this.codeParent) {
            this.codeParent.style.display = 'none'
            this.cmParent.style.display = 'block'
          }

          if (this.codeLang !== 'javascript') {
            const foundLang = languages.find((lang) => {
              return lang.alias.includes(this.codeLang)
            })

            if (foundLang) {
              const loadedLang = await foundLang.loadFunc()
              this.editor.dispatch({
                effects: this.editorLangs.reconfigure([loadedLang.language]),
              })
            }
          }
        }
      }

      customElements.define('doc-code', DocCode)
    </script>
  `
}
