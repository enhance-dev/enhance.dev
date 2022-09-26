/* eslint-disable fp/no-class */
class DocCode extends HTMLElement {
  constructor() {
    super()

    this.codeParent = this.querySelector('pre')
    this.codeBlock = this.querySelector('pre code')
    this.lines = this.codeBlock.querySelectorAll('.code-line')

    this.numbered = typeof this.getAttribute('numbered') === 'string'
    this.filename = this.getAttribute('filename')
    this.lineStart = this.getAttribute('initial-line-number')
    this.foci = this.getAttribute('focus')
    this.highlight = this.getAttribute('highlight')
    this.callout = this.getAttribute('callout')
  }

  createFilenameTab() {
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
      this.createFilenameTab()
    }

    if (this.foci) {
      this.codeParent.classList.add('focused')

      let foci = []
      const fociRanges = this.foci.split(',')

      for (const fociRange of fociRanges) {
        const range = fociRange.split(':')

        if (range.length === 2) {
          const lower = Number(range[0])
          const upper = Number(range[1])

          const lines = [...Array(upper - lower + 1)].map((_, i) => i + lower)
          foci = [...foci, ...lines]
        } else if (range.length === 1) {
          foci.push(Number(range[0]))
        }
      }

      for (const lineNo of foci) {
        const focusLine = this.lines[lineNo - 1]
        if (focusLine) {
          focusLine.classList.add('focused')
        }
      }
    }

    if (this.highlight) {
      const highlights = this.highlight.split(',')

      for (const highlight of highlights) {
        const parts = highlight.split('-')
        const range = parts[0].split(':')
        const type = parts[1]

        let lines = [Number(range[0])]
        if (range.length === 2) {
          const lower = Number(range[0])
          const upper = Number(range[1])

          lines = [...Array(upper - lower + 1)].map((_, i) => i + lower)
        }

        for (const lineNo of lines) {
          const highlightedLine = this.lines[lineNo - 1]

          if (highlightedLine) {
            const highlightedClass = ['highlight']
            if (type) {
              highlightedClass.push(`highlight-${type}`)
            }
            highlightedLine.classList.add(...highlightedClass)
          }
        }
      }
    }

    if (this.lineStart) {
      const lineStart = Number(this.lineStart)
      const firstLine = this.lines[0]

      firstLine.style = `counter-set: lineNo ${lineStart}`
    }

    if (this.callout) {
      const callouts = this.callout.split(',')
      for (const callout of callouts) {
        const calloutParts = callout.split('-')
        const calloutLineNo = Number(calloutParts[0])
        const calloutString = calloutParts[1]
        const lineElem = this.lines[calloutLineNo - 1]

        if (!lineElem) {
          continue
        }

        const lineHtml = lineElem.innerHTML

        const result = lineHtml.replace(
          calloutString,
          `<mark>${calloutString}</mark>`
        )

        lineElem.innerHTML = result
      }
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
