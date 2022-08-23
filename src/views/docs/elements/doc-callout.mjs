const LEVELS = ['note', 'tip', 'info', 'caution', 'danger']
const MARKS = ['📝', '💡', 'ℹ️', '⚠️', '🔥']
const styles = LEVELS.map(
  (l) => `
.callout-${l} {
  background-color: var(--callout-${l})
}`
).join('\n')

export default function Callout({ html, state }) {
  const { attrs } = state
  const level = attrs.level || 'note'
  const mark = attrs.mark || MARKS[LEVELS.indexOf(level)]

  return html`
    <style>
      :host {
        display: block;
      }
      .callout {
        padding: 1rem;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 0px 1px 0px;
        border-radius: 0.333rem;
      }
      ${styles}
    </style>

    <div class="callout callout-${level} flex gap-1">
      <div class="text2 callout-mark">${mark}</div>
      <div class="callout-slot"><slot></slot></div>
    </div>
  `
}
