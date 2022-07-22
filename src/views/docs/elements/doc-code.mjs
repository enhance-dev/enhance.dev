export default function DocCode({ html }) {
  return html`
    <style>
      pre.numbered span.code-line {
        counter-increment: lineNo;
      }
      pre.numbered span.code-line:before {
        content: counter(lineNo);
        display: inline-block;
        width: 2.1rem;
        padding: 0 0.5em;
        margin-right: 0.5em;
        text-align: right;
        border-right: 1px solid #ddd;
        color: #888;
      }

      pre.focused span.code-line {
        opacity: 0.5;
      }
      pre.focused span.code-line.focused {
        opacity: 1;
      }

      pre span.code-line.marked {
        opacity: 1;
        background: #ff9b94;
      }
    </style>

    <slot></slot>

    <script type="module">
      class DocCode extends HTMLElement {
        constructor() {
          super()

          this.codeParent = this.querySelector('pre')
          this.codeBlock = this.querySelector('pre code')
          this.lines = this.codeBlock.querySelectorAll('.code-line')

          this.numbered = typeof this.getAttribute('numbered') === 'string'
          this.lineStart = this.getAttribute('line-start')
          this.focus = this.getAttribute('focus')
          this.mark = this.getAttribute('mark')
        }

        render() {
          if (this.numbered) {
            this.codeParent.classList.add('numbered')
          }

          if (this.focus) {
            this.codeParent.classList.add('focused')

            let foci = [] // yes, "foci" is plural focus 😉
            const fociRanges = this.focus.split(',')

            for (const fociRange of fociRanges) {
              const range = fociRange.split(':')

              if (range.length === 2) {
                const lower = Number(range[0])
                const upper = Number(range[1])

                const lines = [...Array(upper - lower + 1)].map(
                  (_, i) => i + lower
                )
                foci = [...foci, ...lines]
              } else if (range.length === 1) {
                foci.push(Number(range[0]))
              }
            }

            for (const lineNo of foci) {
              const focusLine = this.lines[lineNo - 1]
              if (focusLine) focusLine.classList.add('focused')
            }
          }

          if (this.mark) {
            const mark = Number(this.mark)
            const markedLine = this.lines[mark - 1]
            if (markedLine) markedLine.classList.add('marked')
          }

          if (this.lineStart) {
            const lineStart = Number(this.lineStart)
            const firstLine = this.lines[0]
            firstLine.style = 'counter-set: lineNo ' + lineStart
          }
        }

        async connectedCallback() {
          this.render()
        }

        static get observedAttributes() {
          // TODO: respond to these attrs changing
          return ['numbered', 'line-start', 'focus', 'mark']
        }
      }

      customElements.define('doc-code', DocCode)
    </script>
  `
}
