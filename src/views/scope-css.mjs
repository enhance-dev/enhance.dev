import * as cssParser from 'css'

export default function buildScoper({
  scopeTo = '',
  disabled = false,
  instance = ''
}) {
  return function scopeTag(strings, ...values) {
    let str = ''
    strings.forEach((string, i) => {
      str += `${string || ''}${values[i] || ''}`
    })
    return scopeAllBlocks({ str, scopeTo, disabled, instance })
  }
}

function scopeAllBlocks({ str, scopeTo, disabled, instance }) {
  const matches = [
    ...str.matchAll(
      /(?<fullTag><style[^>]*?(enh-scope="\s*(?<scope>global|component|instance)[^">]*"[^>]*>)(?<insideBlock>[^<]*)<\/style>)|(?<noScopeFullTag><style>(?<noScopeInsideBlock>[^<]*)<\/style>)/gm
    )
  ]
  let result = ''
  matches.forEach((i) => {
    if (!i.groups.scope) result += i.groups.noScopeFullTag
    if (i.groups.scope === 'global') result += i.groups.fullTag
    if (i.groups.scope === 'component')
      result += `<style enh-scope="${scopeTo}"> 
${processBlock({
  css: i.groups.insideBlock,
  scopeTo,
  disabled,
  instance: false
})} 
</style>`
    if (i.groups.scope === 'instance')
      result += `<style enh-scope="${scopeTo}.${instance}"> 
${processBlock({
  css: i.groups.insideBlock,
  scopeTo,
  disabled,
  instance
})} 
</style>`
  })
  return result
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
