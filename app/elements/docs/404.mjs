export default function ({ html, state }) {
  const {
    store: { searchTerm },
  } = state

  return html`
    <p>We couldn't find that document.</p>
    ${searchTerm &&
    `<button class="underline">Search for "${searchTerm}"</button>`}

    <script type="module">
      class FourOh4 extends HTMLElement {
        constructor() {
          super()
          this.term = this.getAttribute('search-term')
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
