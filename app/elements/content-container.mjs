export default function ContentContainerTemplate({ html }) {
  return html`
    <style>
      div.content-container {
        max-width: 1024px;
      }
    </style>
    <div class="content-container mi-auto p1 text2 font-sans font-thin">
      <slot></slot>
    </div>

    <script type="module">
      class ContentContainer extends HTMLElement {
        constructor() {
          super()
        }
      }
      customElements.define('content-container', ContentContainer)
    </script>
  `
}
