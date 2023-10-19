export default function DocsLayout({ html, state }) {
  const { store } = state
  const { doc = {} } = store

  return html`
    <style scope="global">
      /* Colors */
      body {
        background-color: var(--white-denim);
        color: var(--rift-white);
        font-family: rubik;
      }
      a {
        color: var(--purple-princess);
      }

      /* Scrollbars */
      body {
        scrollbar-color: var(--grey-greyer) transparent;
      }
      ::-webkit-scrollbar {
        height: 8px;
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background-color: transparent;
      }
      ::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background-color: var(--grey-greyer);
      }
    </style>

    <style>
      /* Layout */

      /* single col */
      :host {
        display: grid;
        grid-template-areas:
          'header'
          'content';
        gap: 0 1rem;
        block-size: 100dvh;
        inline-size: 100vw;
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
        overflow-y: auto;
      }
      #outline {
        grid-area: outline;
        display: none;
      }

      @media only screen and (min-width: 56em) {
        /* 2-col + */
        :host {
          position: fixed;
          overflow: auto;
          height: 100vh;

          grid-template-columns: var(--docs-nav-width) 1fr;
          grid-template-rows: minmax(auto, 4.5rem) auto;
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
          overflow: auto;
          height: 100vh;

          grid-template-columns: var(--docs-nav-width) 1fr var(--docs-nav-width);
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

    <docs-symbols></docs-symbols>

    <enhance-header id="header"></enhance-header>

    <docs-nav
      id="sidebar"
      class="overflow-y-auto-lg"
      aria-label="sidebar"></docs-nav>

    <doc-content id="content" class="overflow-y-auto-lg p1-lg pbe2">
      <article slot="doc" class="block leading3">
        ${doc.title ? `<h1>${doc.title}</h1>` : ''} ${doc.html}
      </article>
    </doc-content>

    <docs-outline id="outline" class="pbs1-lg overflow-y-auto-lg">
      ${doc.tocHtml?.indexOf('<li>') > 0
        ? /* html */ `
      <div slot="toc">
        <h3 class="mbe-2 font-medium">On this page</h3>
        ${doc.tocHtml}
      </div>`
        : ''}
    </docs-outline>

    <google-analytics code="${state.store.gacode}"></google-analytics>

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
