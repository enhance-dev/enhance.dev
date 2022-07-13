export default function DocsLayout({ html, state }) {
  const { store } = state
  const { doc = {} } = store

  return html`
    <style>
      /* mobile-ish */
      :host {
        display: grid;
        grid-template-areas:
          'header '
          'sidebar'
          'content';
        gap: 0 1.5rem;
      }
      :host docs-header {
        grid-area: header;
      }
      :host docs-sidebar {
        grid-area: sidebar;
      }
      :host doc-content {
        grid-area: content;
      }
      :host doc-outline {
        grid-area: outline;
        display: none;
      }

      @media only screen and (min-width: 50em) {
        /* tablet-ish */
        :host {
          grid-template-columns: 20rem 1fr;
          grid-template-areas:
            'header   header'
            'sidebar content'
            '   .    content';
        }

        docs-sidebar,
        doc-outline {
          position: sticky;
          top: 1rem;
        }
      }

      @media (min-width: 72rem) {
        /* widescreen */
        :host {
          grid-template-columns: 20rem 1fr 18rem;
          grid-template-areas:
            'header  header   header'
            'sidebar content outline'
            '   .    content    .   ';
        }
        doc-outline {
          display: block;
        }
      }
    </style>

    <docs-header></docs-header>

    <docs-sidebar></docs-sidebar>

    <doc-content>
      <article slot="doc">
        ${doc.title ? `<h1>${doc.title}</h1>` : ''} ${doc.html}
      </article>
    </doc-content>

    <doc-outline>
      <div slot="toc">${doc.tocHtml}</div>
    </doc-outline>
  `
}
