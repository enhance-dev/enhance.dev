/* eslint-disable */
export default function PageHeaderTemplate({ html, state = {} }) {
  return html`
    <p>test</p>

    <script type="module">
      import myBase from '/_static/bundles/myBase.mjs'

      myBase()

      class PageHeader extends HTMLElement {
        constructor() {
          super()
        }
      }
      customElements.define('page-header', PageHeader)

      import myBase from '/_static/bundles/myBase.mjs'
      const baseTest = myBase({
        tagName: 'base-test',
        mixins: [],
        methods: {},
        config: { useShadow },
        addConstructor: {},
        lifecycle: {
          connected: {},
          disconnected: {},
          adopted: {},
          attributeChanged: {},
          observedAttributes: [],
        },
      })
    </script>
  `
}
