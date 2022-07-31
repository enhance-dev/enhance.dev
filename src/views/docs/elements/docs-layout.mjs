export default function DocsLayout({ html, state }) {
  const { store } = state
  const { doc = {} } = store

  return html`
    <style>
      /* Layout */

      /* single col */
      :host {
        display: grid;
        grid-template-areas:
          'header'
          'content';
        gap: 0 1.5rem;
        margin: 0 1rem;
      }
      #header {
        grid-area: header;
        margin: 0 -0.5rem 1rem -0.5rem;
      }
      #sidebar {
        grid-area: sidebar;
        display: none;
      }
      #content {
        grid-area: content;
      }
      #outline {
        grid-area: outline;
        display: none;
      }

      @media only screen and (min-width: 50em) {
        /* 2-col + */
        :host {
          grid-template-columns: 16rem 1fr;
          grid-template-areas:
            'header   header'
            'sidebar content'
            '   .    content';
        }

        #sidebar {
          display: block;
        }

        #header,
        #sidebar,
        #outline {
          position: sticky;
        }

        #sidebar,
        #outline {
          top: 1rem;
        }
      }

      @media (min-width: 72rem) {
        /* 3-col */
        :host {
          grid-template-columns: 16rem 4fr 1fr;
          grid-template-areas:
            'header  header   header'
            'sidebar content outline'
            '   .    content    .   ';
        }
        #outline {
          display: block;
        }
      }
    </style>

    <style>
      /* Colors */

      a {
        color: var(--color-bravo);
      }
      strong {
        color: var(--color-alpha);
      }
      small {
        color: var(--color-alpha-light);
      }
    </style>

    <docs-header id="header" class="p1"></docs-header>

    <nav id="sidebar">
      <docs-nav></docs-nav>
    </nav>

    <doc-content id="content">
      <article slot="doc" class="leading2">
        ${doc.title ? `<h1>${doc.title}</h1>` : ''} ${doc.html}
      </article>
    </doc-content>

    <doc-outline id="outline">
      <div slot="toc">${doc.tocHtml}</div>
    </doc-outline>
  `
}
