export default function DocsLayout({ html, state }) {
  const { store } = state
  const { doc = {} } = store

  return html`
    <style>
      /* mobile-ish */
      docs-layout {
        display: grid;
        grid-template-areas:
          'header '
          'sidebar'
          'main   ';
        gap: 0 1.5rem;
      }
      docs-layout docs-header {
        grid-area: header;
      }
      docs-layout docs-sidebar {
        grid-area: sidebar;
      }
      docs-layout main {
        grid-area: main;
      }
      docs-layout doc-outline {
        grid-area: outline;
      }

      @media only screen and (min-width: 50em) {
        /* tablet-ish */
        docs-layout {
          grid-template-columns: 20rem 1fr;
          grid-template-areas:
            'header  header'
            'sidebar main  '
            '   .    main  ';
        }

        docs-sidebar,
        doc-outline {
          position: sticky;
          top: 1rem;
        }
      }

      @media (min-width: 72rem) {
        /* widescreen */
        docs-layout {
          grid-template-columns: 20rem 1fr 18rem;
          grid-template-areas:
            'header  header  header'
            'sidebar  main  outline'
            '   .     main    .   ';
        }
      }
    </style>

    <docs-header></docs-header>

    <docs-sidebar></docs-sidebar>

    <main>
      <article>${doc.title ? `<h1>${doc.title}</h1>` : ''} ${doc.html}</article>
    </main>

    <doc-outline>
      <div slot="toc">${doc.tocHtml}</div>
    </doc-outline>
  `
}
