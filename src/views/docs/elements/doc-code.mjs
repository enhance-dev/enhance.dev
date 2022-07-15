export default function DocCode({ html }) {
  return html`
    <style>
      :host .cm {
        display: none;
      }
    </style>

    <slot></slot>
    <div class="cm"></div>

    <script type="module">
      import {
        EditorState,
        basicSetup,
        EditorView,
        javascript,
      } from '/_static/bundles/codemirror.mjs'

      class DocCode extends HTMLElement {
        constructor() {
          super()

          this.cmParent = this.querySelector('div.cm')
          this.codeParent = this.querySelector('pre')
          this.codeBlock = this.codeParent.querySelector('code')
          this.codeText = this.codeBlock.innerText
          this.codeLang = this.codeBlock.getAttribute('data-language')

          this.editor = new EditorView({
            state: EditorState.create({
              doc: this.codeText,
              lineWrapping: true,
              extensions: [basicSetup, javascript()],
            }),

            parent: this.cmParent,
          })
        }

        connectedCallback() {
          if (this.codeParent) {
            this.codeParent.style.display = 'none'
            this.cmParent.style.display = 'block'
          }
        }
      }

      customElements.define('doc-code', DocCode)
    </script>
  `
}
