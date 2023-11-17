export default function DocsSearch({ html, state }) {
  const { attrs, store } = state
  const { searchTerm } = store
  const { searchid } = attrs

  const darkModeExtras = `
    --docsearch-footer-background: var(--smoke-halite);
    --docsearch-hit-background: var(--white-denim);
    --docsearch-hit-color: var(--white);
    --docsearch-modal-background: var(--smoke-halite);
    --docsearch-searchbox-background: hsla(0deg 0% 0% / 0.5);
    --docsearch-searchbox-focus-background: var(--white-denim);
    --docsearch-text-color: var(--rift-white);
    --mobile-nav-background: hsla(0deg 0% 0% / 0.66);
  `

  return html`
    <style scope="global">
      /* Docsearch overrides */
      :root {
        --docsearch-footer-background: var(--smoke);
        --docsearch-footer-shadow: none;
        --docsearch-highlight-color: var(--purple);
        --docsearch-hit-background: var(--white);
        --docsearch-hit-color: var(--rift);
        --docsearch-hit-shadow: 0 1px 2px hsla(0deg 0% 0% / 0.125);
        --docsearch-modal-background: var(--smoke);
        --docsearch-modal-shadow: 0 2px 6px hsla(0deg 0% 0% / 0.5);
        --docsearch-searchbox-background: hsla(0deg 0% 0% / 0.075);
        --docsearch-searchbox-focus-background: var(--white);
        --docsearch-searchbox-shadow: inset 0 0 0 2px var(--purple);
        --docsearch-text-color: var(--rift);
        --mobile-nav-background: hsla(0deg 0% 100% / 0.85);
      }

      /* Only use dark styles in widescreen; search shown in global nav docs subnav < 56em */
      @media screen and (min-width:56em) and (prefers-color-scheme: dark) {
        :root {
          ${darkModeExtras}
        }
      }

      @media screen and (min-width: 56em) {
        :root[data-force-theme="dark"] {
          ${darkModeExtras}
        }
      }

      .DocSearch-Button {
        font-weight: 400;
        margin-inline-start: 0;
      }

      .DocSearch-Button:focus {
        box-shadow: none;
        outline: 2px auto Highlight;
        outline: 2px auto -webkit-focus-ring-color;
      }

      /* Docsearch media query */
      @media screen and (max-width: 768px) {
        .DocSearch-Button {
          background: var(--lily);
        }
      }

      .DocSearch-Button-Keys {
        min-inline-size: calc(32px + 0.8em);
      }

      .DocSearch-Button-Key {
        font-weight: 400;
        font-size: 0.75em;
        inline-size: 16px;
      }

      .DocSearch-Container {
        backdrop-filter: blur(2px) contrast(50%);
        -webkit-backdrop-filter: blur(2px) contrast(50%);
        font-size: var(--text-0);
      }

      /* unset Enhance Styles */
      .DocSearch-Input:focus-visible {
        outline: unset;
        box-shadow: unset;
      }

      .DocSearch-Hit-content-wrapper {
        font-weight: 400;
      }

      .DocSearch-Hit[aria-selected='true'] a {
        background: var(--dark-purple);
      }

      .DocSearch-Hits mark {
        font-weight: 600;
      }
    </style>

    <style>
      :host {
        display: block;
      }
    </style>

    <search id="${searchid}"></search>

    <script type="module">
      import docsearch from '/_static/bundles/docsearch-js.mjs'

      docsearch({
        appId: '1QR8CXPN0C',
        apiKey: '781b7bc665ad54b682ab4a31a5ccb55e',
        indexName: 'enhance',
        container: '#${searchid}',
        initialQuery: ${searchTerm ? `'${searchTerm}'` : 'null'},
      })
    </script>
  `
}
