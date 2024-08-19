export default function DocsLayout ({ html, state }) {
  const { store } = state
  const { doc = {} } = store

  return html`
    <style scope="global">
      :root {
        --docs-nav-menu-toggle-height: var(--space-4);
      }

      /* Colors */
      body {
        background-color: var(--white-denim);
        color: var(--rift-white);
        margin-block-start: calc(var(--nav-height) + var(--docs-nav-menu-toggle-height));
      }

      a {
        color: var(--purple-princess);
      }

      site-header {
        --site-header-background: var(--lily);
      }

      @media screen and (min-width: 56em) {
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
      }
    </style>

    <style>
      :host {
        display: block;
        padding-inline: var(--space--2);
        max-inline-size: 100vw;
      }

      #sidebar {
        background-color: var(--white-denim);
        border-block-end: 1px solid var(--grey-greyer);
        inset-block-start: var(--nav-height);
        max-block-size: 75dvh;
        overflow-y: scroll;
        overflow-x: hidden;
        z-index: 3;
      }

      @media (width < 56em) {
        #docs-nav-menu-toggle:not(:checked) ~ docs-nav { display: none; }
        #docs-nav-menu-toggle:checked ~ docs-nav { display: block; }

        label[for="docs-nav-menu-toggle"] {
          height: var(--docs-nav-menu-toggle-height);
        }

        #docs-nav-menu-toggle:not(:checked) ~ label span.open { display: inline-block; }
        #docs-nav-menu-toggle:not(:checked) ~ label span.close { display: none; }
        #docs-nav-menu-toggle:checked ~ label span.open { display: none; }
        #docs-nav-menu-toggle:checked ~ label span.close { display: inline-block; }
      }

      @media only screen and (min-width: 56em) {
        /* 2-col + */
        :host {
          max-inline-size: var(--docs-max-width);
          margin-inline: auto;
          position: fixed;
          padding-inline: 0;
          inset-block-start: var(--nav-height);
          inset-block-end: 0;
          inset-inline: 0;
          display: grid;
          grid-template-columns: var(--docs-nav-width) 1fr;
          container: layout / size;
        }

        /* Sidebar resets */
        #sidebar {
          background-color: transparent;
          border-block-end: none;
          inset-block-start: unset;
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

    <div id="sidebar" class="
      fixed
      inset-i-0
      static-lg
      block-lg
      pi-2
    ">
      <input
        type="checkbox"
        role="button"
        aria-haspopup="true"
        id="docs-nav-menu-toggle"
        name="docs nav menu toggle"
        class="clip absolute opacity-0 hidden-lg"
        autocomplete="off"
      />
      <label
        for="docs-nav-menu-toggle"
        class="hidden-lg relative flex align-items-center font-semibold cursor-pointer"
      >
        <span class="open">
          <?xml version="1.0" encoding="UTF-8"?><svg width="1em" height="1em" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </span>
        <span class="close">
          <?xml version="1.0" encoding="UTF-8"?><svg width="1em" height="1em" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </span>
        <span class="pis-6">
          Docs
        </span>
      </label>
      <docs-nav aria-label="sidebar" searchid="search-widescreen" class="pbe2"></docs-nav>
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

    <js-naked-day>
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
    </js-naked-day>
    `
}
