/* eslint-disable fp/no-class */

export default class {
  constructor (options) {
    this.className = options.className
  }

  'after:highlight' (result) {
    const tokens = []

    const safelyTagged = result.value.replace(
      /(<span [^>]+>)|(<\/span>)|(\n)/g,
      (match) => {
        if (match === '\n') {
          return `${'</span>'.repeat(tokens.length)}\n${tokens.join('')}`
        }

        if (match === '</span>') {
          tokens.pop()
        }
        else {
          tokens.push(match)
        }

        return match
      }
    )

    result.value = safelyTagged
      .split('\n')
      .reduce((result, line, index, lines) => {
        const lastLine = index + 1 === lines.length
        if (!(lastLine && line.length === 0)) {
          result.push(
            `<span class="${this.className || 'hljs-line'}">${line}</span>`
          )
        }
        return result
      }, [])
      .join('\n')
  }
}
