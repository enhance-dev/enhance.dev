export default function DocContent({ html }) {
  return html`
    <style>
      :host > ::slotted(*) {
        max-width: 51rem;
        margin: auto;
      }

      /* margin-x for everything except code blocks */
      :host > ::slotted(*) > * {
        margin: 0 5rem 1rem 5rem;
      }

      h1 {
        font-size: 2rem;
        font-weight: 500;
      }

      h2 {
        font-size: 1.5rem;
        font-weight: 500;
      }

      h3 {
        font-size: 1.3rem;
        font-weight: 500;
      }

      h4 {
        font-size: 1.2rem;
      }

      strong {
        color: var(--black-white);
      }
      small {
        color: var(--inky-lily);
      }

      blockquote {
        padding: 0.8rem 0.6rem 0.6rem;
        background-color: var(--smoke-indigo);
        box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 1px 0px;
        border-radius: 0.333rem;
      }

      :not(pre) > code {
        padding: 0.1rem 0.2rem;
        line-height: 1rem;
        overflow-wrap: break-word;
        background-color: var(--smoke-denim4);
        font-family: Menlo, Monaco, Consolas, monospace;
        border-radius: 0.25rem;
      }

      blockquote :not(pre) > code {
        background-color: var(--smoke-denim4);
      }

      pre.hljs {
        padding: 0.8rem 1rem;
        white-space: pre-wrap;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 4px 0px,
          rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
      }
      pre.hljs code {
        font-family: 'Roboto Mono', monospace;
      }
    </style>

    <slot name="doc"></slot>
  `
}
