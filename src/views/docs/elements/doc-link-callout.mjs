export default function LinkCallout({ html, state }) {
  const { attrs } = state
  const link = attrs.link || '/'
  const mark = attrs.mark || 'none'
  const text = attrs.text || 'none'

  return html`
    <doc-callout level="none" mark="${mark}">
      <strong>
        <a href="${link}">${text} →</a>
      </strong>
    </doc-callout>
  `
}
