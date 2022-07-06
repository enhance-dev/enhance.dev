export default function DocsDocContent({ html }) {
  return html`
    <style>
      main article {
        max-width: 55rem;
        margin: auto;
      }

      main article h1 {
        margin: 0 0 2rem 0;
        font-size: 2rem;
      }
    </style>

    <main>
      <slot name="doc"></slot>
    </main>
  `
}
