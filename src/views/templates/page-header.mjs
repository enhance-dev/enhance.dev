export default function PageHeaderTemplate({ html }) {
  return html`
    <div
      class="
        flex
        flex-col
        justify-center
        m-auto
        p1
        p2-lg
      "
    >
      <h1
        class="
          mb1
          bg-gradient
          bg-clip-text
          select-none
          text4
          text6-lg
          text-center
          font-bold
          heading-size
        "
      >
        <slot name="title"></slot>
      </h1>
      <p
        class="
          subheading-size
          ml-none
          ml2-lg
          text-center
          font-thin
        "
      >
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
