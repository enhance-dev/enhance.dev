import markdownIt from 'markdown-it'
import util from './util.mjs'
const { unescapeAll, escapeHtml } = util

const md = new markdownIt()

const CodeBlockOverrideRule = (tokens, idx, options, env, slf) => {
  var token = tokens[idx],
    info = token.info ? unescapeAll(token.info).trim() : '',
    langName = '',
    langAttrs = '',
    highlighted,
    i,
    arr,
    tmpAttrs,
    tmpToken

  if (info) {
    arr = info.split(/(\s+)/g)
    langName = arr[0]
    langAttrs = arr.slice(2).join('')
  }

  if (options.highlight) {
    highlighted =
      options.highlight(token.content, langName, langAttrs) ||
      escapeHtml(token.content)
  } else {
    highlighted = escapeHtml(token.content)
  }

  if (highlighted.indexOf('<pre') === 0) {
    return highlighted + '\n'
  }

  // If language exists, inject class gently, without modifying original token.
  // May be, one day we will add .deepClone() for token and simplify this part, but
  // now we prefer to keep things local.
  if (info) {
    i = token.attrIndex('class')
    tmpAttrs = token.attrs ? token.attrs.slice() : []

    if (i < 0) {
      tmpAttrs.push(['class', options.langPrefix + langName])
    } else {
      tmpAttrs[i] = tmpAttrs[i].slice()
      tmpAttrs[i][1] += ' ' + options.langPrefix + langName
    }

    // Fake token just to render attributes
    tmpToken = {
      attrs: tmpAttrs
    }

    return (
      '<e-fence><pre><code' +
      slf.renderAttrs(tmpToken) +
      '>' +
      highlighted +
      '</code></pre></e-fence>\n'
    )
  }

  return (
    '<e-fence><pre><code' +
    slf.renderAttrs(token) +
    '>' +
    highlighted +
    '</code></pre></e-fence>\n'
  )
}
md.renderer.rules.fence = CodeBlockOverrideRule
export default md
