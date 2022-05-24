export default function PageHeaderTemplate({ html, state = {} }) {
  return html`
    <p>test</p>

    <script type="module">
      import myBase from '/_bundles/myBase.mjs'

      myBase()

      class PageHeader extends HTMLElement {
        constructor() {
          super()
        }
      }
      customElements.define('page-header', PageHeader)
    </script>
  `
}
