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
      }
      ${styles}
    </style>

    <div class="callout callout-${level} flex gap-2">
      <div class="callout-mark">${mark}</div>
      <div class="callout-slot"><slot></slot></div>
    </div>
  `
}
