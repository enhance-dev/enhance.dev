export default function DocCode({ html }) {
  // TODO: apply classes to lines server side?

  return html`
    <style>
      :host {
        display: block;
      }

      .filename {
        display: inline-block;
        padding: 0.5rem 1rem;
        color: var(--hl-comment);
        background: var(--hl-bg);
      }

      pre.numbered {
        padding-right: 0;
        padding-left: 0;
      }
      pre.numbered span.code-line {
        display: inline-block;
        width: 100%;
      }
      pre.numbered span.code-line {
        counter-increment: lineNo;
      }
      pre.numbered span.code-line:before {
        content: counter(lineNo);
        display: inline-block;
        width: 2rem;
        padding: 0 0.25em;
        margin: 0 0.5em;
        text-align: right;
        color: #8d8d8d;
        /* background: #262626; */
      }

      pre.focused span.code-line {
        opacity: 0.5;
      }
      pre.focused span.code-line.focused {
        opacity: 1;
      }

      pre span.code-line.marked {
        opacity: 1;
        background: var(--hl-highlight-line);
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
          this.filename = this.getAttribute('filename')
          this.lineStart = this.getAttribute('initial-line-number')
          this.focus = this.getAttribute('focus')
          this.mark = this.getAttribute('mark')
        }

        createFilenameTab(name) {
          const filenameElem = document.createElement('span')
          filenameElem.classList.add('filename')
          filenameElem.textContent = this.filename

          this.prepend(filenameElem)
        }

        render() {
          if (this.numbered) {
            this.codeParent.classList.add('numbered')
          }

          if (this.filename) {
            this.createFilenameTab(this.filename)
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
          return ['numbered', 'initial-line-number', 'focus', 'mark']
        }
      }

      customElements.define('doc-code', DocCode)
    </script>
  `
}
