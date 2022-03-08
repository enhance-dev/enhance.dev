export default function PageHeaderTemplate({ html }) {
  return html`
    <div class="flex flex-col justify-center font-sans m-auto p1 p2-lg">
      <h1 class="text4 text6-lg text-center font-bold">
        <slot name="title"></slot>
      </h1>
      <p class="text1 text-center font-thin">
        <slot name="subtitle"></slot>
      </p>
    </div>

    <script type="module">
      class PageHeader extends HTMLElement {
        constructor() {
          super()
        }
      }
      customElements.define('page-header', PageHeader)
    </script>
  `
}
