export default function LinkCallout ({ html, state }) {
  const { attrs } = state
  const link = attrs.link || '/'
  const mark = attrs.mark || 'none'

  const external = link.startsWith('http')

  return html`
    <style>
      :host {
        display: block;
      }
      ::slotted(*) {
        display: inline-block;
      }
    </style>

    <doc-callout level="none" mark="${mark}">
      <strong>
        <a href="${link}" ${external ? 'target="_blank"' : ''}>
          <slot></slot> →
        </a>
      </strong>
    </doc-callout>
  `
}
