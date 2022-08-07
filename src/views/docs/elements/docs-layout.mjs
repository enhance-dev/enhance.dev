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
        gap: 0 1rem;
        margin: 0 1rem;
      }
      #header {
        grid-area: header;
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

      @media only screen and (min-width: 48em) {
        /* 2-col + */
        :host {
          position: fixed;
          overflow: auto;
          height: 100vh;

          grid-template-columns: 16rem 1fr;
          grid-template-areas:
            'header   header'
            'sidebar content'
            'sidebar content';
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

      @media (min-width: 72em) {
        /* 3-col */
        :host {
          position: fixed;
          overflow: auto;
          height: 100vh;

          grid-template-columns: 16rem 4fr 1fr;
          grid-template-areas:
            'header  header   header'
            'sidebar content outline'
            'sidebar content outline';
        }
        #outline {
          display: block;
        }
      }
    </style>

    <docs-header id="header" class="mt1 mb1"></docs-header>

    <nav id="sidebar" class="overflow-y-auto-lg">
      <docs-nav></docs-nav>
    </nav>

    <doc-content id="content" class="overflow-y-auto-lg">
      <article slot="doc" class="leading2">
        ${doc.title ? `<h1>${doc.title}</h1>` : ''} ${doc.html}
      </article>
    </doc-content>

    <doc-outline id="outline" class="overflow-y-auto-lg">
      <div slot="toc">${doc.tocHtml}</div>
    </doc-outline>

    <script type="module">
      class Layout extends HTMLElement {
        constructor() {
          super()
          let sidebar = this.querySelector('#sidebar')

          let top = sessionStorage.getItem('docs-sidebar-scroll')
          if (top !== null) {
            sidebar.scrollTop = parseInt(top, 10)
          }

          window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('docs-sidebar-scroll', sidebar.scrollTop)
          })
        }
      }
      customElements.define('docs-layout', Layout)
    </script>
  `
}
