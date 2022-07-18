/* eslint-disable import/no-unresolved, fp/no-class */

// TODO: bundle these things
// import { EditorView } from 'https://esm.sh/codemirror'
import {
  Compartment,
  EditorState,
} from 'https://esm.sh/v87/@codemirror/state@6.1.0/es2022/state.js'
import {
  // ? unsure if this is better than from bare "codemirror"
  EditorView,
  lineNumbers,
} from 'https://esm.sh/v87/@codemirror/view@6.0.3/es2022/view.js'
import {
  defaultHighlightStyle,
  syntaxHighlighting,
} from 'https://esm.sh/v87/@codemirror/language@6.2.0/es2022/language.js'
import { languages } from 'https://esm.sh/v87/@codemirror/language-data@6.1.0/es2022/language-data.js'
import { javascript } from 'https://esm.sh/v87/@codemirror/lang-javascript@6.0.1/es2022/lang-javascript.js'

class DocCode extends HTMLElement {
  constructor() {
    super()

    // DOM and state from markup
    this.editorParent = this.querySelector('div.editor')
    this.codeBlock = this.querySelector('pre code')
    this.codeParent = this.codeBlock?.parentElement
    this.highlightedLang = this.codeBlock?.getAttribute('data-language')
    this.codeText = this.codeBlock?.textContent

    // state from element attributes
    this.codeLang = this.getAttribute('lang')
    this.editable = typeof this.getAttribute('editable') === 'string'
    this.lineStart = this.getAttribute('line-start')
    this.activeLines = this.getAttribute('active-lines')

    this.editorSettings = {
      editable: new Compartment(),
      gutter: new Compartment(),
      langs: new Compartment(),
    }

    this.editor = new EditorView({
      state: EditorState.create({
        doc: this.codeText,
        extensions: [
          this.editorSettings.editable.of([
            EditorView.editable.of(false),
            EditorState.readOnly.of(true),
          ]),
          this.editorSettings.langs.of(javascript()),
          this.editorSettings.gutter.of(lineNumbers()),
          syntaxHighlighting(defaultHighlightStyle),
        ],
      }),
      parent: this.editorParent,
    })
  }

  async render() {
    if (
      this.codeParent &&
      this.editorParent &&
      this.editorParent.childElementCount > 0
    ) {
      this.codeParent['style']['display'] = 'none'
      this.editorParent['style']['display'] = 'block'
    }

    // reflow editor settings by dispatching a list of effects
    const effects = []

    if (this.codeLang && this.codeLang !== 'javascript') {
      // just a smoke test for authors
      console.assert(
        this.highlightedLang === this.codeLang,
        `Specified lang (${this.codeLang}) on <doc-code> does not match highlighted code (${this.highlightedLang})!`
      )

      const foundLang = languages.find((lang) => {
        return lang.alias.includes(this.codeLang)
      })

      if (foundLang) {
        const loadedLang = await foundLang.loadFunc()
        effects.push(
          this.editorSettings.langs.reconfigure([loadedLang.language])
        )
      }
    }

    if (this.editable) {
      effects.push(
        this.editorSettings.editable.reconfigure([
          EditorView.editable.of(true),
          EditorState.readOnly.of(false),
        ])
      )
    }

    if (this.lineStart) {
      const start = Number(this.lineStart) - 1

      effects.push(
        this.editorSettings.gutter.reconfigure(
          lineNumbers({
            formatNumber: (n) => (start + n).toString(),
          })
        )
      )
    }

    if (this.activeLines) {
      const range = this.activeLines.split('-').map(Number)

      let lines
      if (range.length === 2) {
        const lower = range[0]
        const upper = range[1]

        lines = [...Array(upper - lower + 1)].map((_, i) => i + lower)
      } else if (range.length === 1) {
        lines = range
      } else {
        console.warn(`Invalid active-lines="${this.activeLines}"`, this)
      }

      console.log('Activating lines in range', lines, this)
      // TODO: add style changes to effects
    }

    if (effects.length > 0) {
      this.editor.dispatch({ effects })
    }
  }

  async connectedCallback() {
    await this.render()
  }

  static get observedAttributes() {
    return ['lang', 'line-start', 'active-lines', 'editable']
  }
}

customElements.define('doc-code', DocCode)
