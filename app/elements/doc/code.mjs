import arc from '@architect/functions'
const moduleUrl = arc.static('js/elements/doc-code.mjs')

export default function DocCode({ html }) {
  return html`
    <style>
      :host {
        display: block;
      }

      .filename {
        display: inline-block;
        padding: 0.5rem 1rem;
        color: var(--hl-color);
        background: var(--hl-bg);
      }

      pre span.code-line {
        display: inline-block;
        width: 100%;
      }
      pre.numbered span.code-line {
        counter-increment: lineNo;
      }
      pre.numbered span.code-line:before {
        content: counter(lineNo);
        display: inline-block;
        width: 1.5rem;
        margin-right: 1.25rem;
        text-align: right;
        color: #8d8d8d;
      }

      pre.focused span.code-line {
        opacity: 0.5;
      }
      pre.focused span.code-line.focused {
        opacity: 1;
      }

      pre span.code-line.highlight {
        opacity: 1;
        background: var(--hl-highlight-line);
      }
      pre span.code-line.highlight-add {
        background: var(--hl-addition);
      }
      pre span.code-line.highlight-delete {
        background: var(--hl-deletion);
      }

      pre mark {
        color: var(--hl-color);
        background-color: var(--hl-highlight-line);
        border: 1px solid var(--hl-symbol);
        border-radius: 0.2rem;
        padding-inline: 0.2rem;
        margin-inline: 0.1rem;
      }
    </style>

    <slot></slot>

    <script type="module" src="${moduleUrl}"></script>
  `
}
