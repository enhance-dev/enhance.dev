export default function PageHeaderTemplate({ html }) {
  return html`
    <div
      class="
        flex
        flex-col
        justify-content-center
        align-items-center
        mi-auto
        p1
        p2-lg
      ">
      <h1
        class="
          mbe0
          bg-gradient
          bg-clip-text
          select-none
          text4
          text6-lg
          text-center
          font-bold
          heading-size
        ">
        <slot name="title"></slot>
      </h1>
      <p
        class="
          text0
          text1-lg
          subheading-size
          text-center
          font-thin
        ">
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
