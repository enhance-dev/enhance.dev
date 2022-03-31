import scopeCSS from '../scope-css.mjs'
export default function ContentContainerTemplate({ html }) {
  return html`
    <style>
      ${scopeCSS({
        scopeTo: 'content-container',
        css: `

      div.content-container {
        max-width: 1024px;
      }
        `
      })}
    </style>
    <div class="content-container m-auto p1 text2 font-sans font-thin">
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
