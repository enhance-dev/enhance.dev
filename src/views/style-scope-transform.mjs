import * as cssParser from 'css'

export function styleTransform(options) {
  const { attrs = {}, raw = '', tagName = '' } = options
  const scope = attrs.find((i) => i.name === 'enh-scope')?.value
  if (scope === 'global') return raw
  if (scope === 'component') {
    return processBlock({ scopeTo: tagName, css: raw })
  }
  return raw
  // if (attrs?.['enh-scope'] === 'instance') {
  //   return processBlock({ scopeTo: tagName, instance: id, css: raw })
  // }
}

function processBlock({
  css = '',
  scopeTo = '',
  disabled = false,
  instance = ''
}) {
  if (disabled || !scopeTo) return css
  const parsed = cssParser.parse(css)

  function changeRules(arr) {
    arr.forEach((v, i, a) => {
      if (v.type === 'rule') {
        a[i].selectors = a[i].selectors.map((s) =>
          `${scopeTo}${instance ? `.${instance}` : ''} ${s}`
            .replace(/(::slotted)\(\s*(.+)\s*\)/, '$2')
            .replace(
              /([[a-zA-Z0-9_-]*)(::part)\(\s*(.+)\s*\)/,
              '$1 [part*="$3"][part*="$1"]'
            )
            // the component is added above so host is just removed here
            .replace(':host', '')
        )
      }
      if (v.type === 'media') {
        changeRules(a[i].rules)
      }
    })
  }
  changeRules(parsed.stylesheet?.rules)
  return cssParser.stringify(parsed)
}
