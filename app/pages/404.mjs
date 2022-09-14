export default function FourOh4({ html, state }) {
  const {
    store: {
      doc: { path = null, term = null },
    },
  } = state

  return html`
    <style>
      button {
        color: var(--white-denim);
        background-color: var(--purple-princess);
      }
    </style>

    <h2 class="mb1 text1">Unable to find "${path}"</h2>
    ${term
      ? `<button class="radius-pill pt-2 pr1 pb-2 pl1 font-semibold">
          Search for "${term}"
        </button>`
      : ''}

    <script type="module">
      class FourOh4 extends HTMLElement {
        constructor() {
          super()
          this.term = this.getAttribute('term')
          this.searchButton = this.querySelector('button')
        }

        async connectedCallback() {
          if (this.term && this.searchButton && window.search) {
            const algoliaButton = window.search.querySelector('button')
            if (algoliaButton) {
              this.searchButton.addEventListener('click', (e) => {
                algoliaButton.click()
              })
            }
          }
        }
      }

      customElements.define('docs-404', FourOh4)
    </script>
  `
}
