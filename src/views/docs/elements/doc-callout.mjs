const LEVELS = ['note', 'tip', 'info', 'caution', 'danger']
const MARKS = ['📝', '💡', 'ℹ️', '⚠️', '🔥']
const styles = LEVELS.map(
  (level) => `
.callout.callout-${level} {
  background-color: var(--callout-${level})
}`
).join('\n')

export default function Callout({ html, state }) {
  const { attrs } = state
  const thin = typeof attrs.thin !== 'undefined'
  const level = attrs.level || 'note'
  const mark = attrs.mark || MARKS[LEVELS.indexOf(level)]

  return html`
    <style>
      :host {
        display: block;
      }
      .callout {
        padding: 0.8rem 1rem;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 0px 1px 0px;
        border-radius: 0.333rem;
      }
      .callout.callout-none {
        box-shadow: none;
        padding: 0;
      }
      .callout.callout-thin {
        padding: 0.35rem 0.5rem;
      }
      ${styles}
    </style>

    <div
      class="
        callout
        callout-${level}
        ${thin ? 'callout-thin' : ''}
        flex
        gap-1
        items-center
      ">
      ${mark.length > 0 && mark !== 'none'
        ? `<div class="text2 self-start">${mark}</div>`
        : ''}
      <div>
        <slot></slot>
      </div>
    </div>
  `
}
