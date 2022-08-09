export default function DocContent({ html }) {
  return html`
    <style>
      :host > ::slotted(*) {
        max-width: 52rem;
        margin: auto;
      }

      :host > ::slotted(*) > * {
        margin-bottom: 1.25rem;
        /* margin-x for everything except code blocks */
        /* margin: 0 5rem 1.25rem 5rem; */
      }

      h1 {
        font-size: 1.953rem;
        font-weight: 500;
      }

      h2 {
        font-size: 1.563rem;
        font-weight: 500;
      }

      h3 {
        font-size: 1.25rem;
        font-weight: 500;
      }

      h4 {
        font-size: 1rem;
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
    </style>

    <slot name="doc"></slot>
  `
}
