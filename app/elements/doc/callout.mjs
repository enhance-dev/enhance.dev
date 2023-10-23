const LEVELS = ['note', 'tip', 'info', 'caution', 'danger']
const MARKS = ['📝', '💡', 'ℹ️', '⚠️', '🔥']
const generatedStyles = LEVELS.map(
  (level) => `
callout-container.callout-${level} {
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

      callout-container {
        padding: 0.8rem 1rem;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 0px 1px 0px;
        border-radius: 0.333rem;
      }
      callout-container.callout-none {
        box-shadow: none;
        padding: 0;
      }
      callout-container.callout-thin {
        padding: 0.35rem 0.5rem;
      }
      callout-container pre code {
        border-radius: 0.333rem;
      }

      :not(pre) code {
        background: var(--callout-code-bg);
      }

      callout-mark {
        background-color: transparent;
        text-shadow: 0 1px 2px #555;
      }

      ${generatedStyles}
    </style>

    <callout-container
      class="
        callout-${level}
        ${thin ? 'callout-thin' : ''}
        flex
        gap-1
        align-items-center
      ">
      ${mark?.length > 0 && mark !== 'none'
        ? `<callout-mark class="text2 align-self-start">${mark}</callout-mark>`
        : ''}
      <div>
        <slot></slot>
      </div>
    </callout-container>
  `
}
