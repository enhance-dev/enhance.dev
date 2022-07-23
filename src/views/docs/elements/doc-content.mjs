export default function DocContent({ html }) {
  return html`
    <style>
      :host main article {
        max-width: 48rem;
        margin: auto;
      }

      :host main article h1 {
        margin: 0 0 2rem 0;
        font-size: 2rem;
      }
    </style>

    <main>
      <slot name="doc"></slot>
    </main>
  `
}
