export default function LinkCallout({ html, state }) {
  const { attrs } = state
  const link = attrs.link || '/'
  const mark = attrs.mark || 'none'

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
        <a href="${link}"> <slot></slot> → </a>
      </strong>
    </doc-callout>
  `
}
