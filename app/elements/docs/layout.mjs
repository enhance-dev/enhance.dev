export default function DocsLayout({ html, state }) {
  const { store } = state
  const { doc = {} } = store

  return html`
    <style scope="global">
      /* Colors */
      body {
        background-color: var(--white-denim);
        color: var(--rift-white);
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
      :host {
        display: block;
        padding-inline: var(--space--2);
        max-inline-size: 100vw;
      }

      @media only screen and (min-width: 56em) {
        /* 2-col + */
        :host {
          max-inline-size: var(--docs-max-width);
          margin-inline: auto;
          position: fixed;
          padding-inline: 0;
          inset-block-start: var(--masthead-max-height);
          inset-block-end: 0;
          inset-inline: 0;
          display: grid;
          grid-template-columns: var(--docs-nav-width) 1fr;
          container: layout / size;
        }

        #sidebar,
        #content,
        #outline {
          max-block-size: 100cqb;
          overflow-y: scroll;
          overflow-x: hidden;
        }
      }

      @media (min-width: 72em) {
        /* 3-col */
        :host {
          grid-template-columns: var(--docs-nav-width) 1fr var(--docs-nav-width);
        }
      }
    </style>

    <docs-symbols class="hidden"></docs-symbols>

    <div id="sidebar" class="hidden block-lg pi-2 pbe2">
      <docs-nav aria-label="sidebar"></docs-nav>
    </div>

    <div id="content" class="pbs0 pbs-none-lg pbe2">
      <doc-content>
        <article slot="doc" class="block leading4 p1-lg">
          ${doc.title ? `<h1>${doc.title}</h1>` : ''} ${doc.html}
        </article>
      </doc-content>
    </div>

    <div id="outline" class="hidden block-xl">
      <docs-outline class="block pbs3 pis0">
        ${doc.tocHtml?.indexOf('<li>') > 0
          ? /* html */ `
        <div slot="toc">
          <h3 class="mbe-2 font-medium">On this page</h3>
          ${doc.tocHtml}
        </div>`
          : ''}
      </docs-outline>
    </div>

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
