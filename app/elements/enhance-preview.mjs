export default function EnhancePreviewTemplate({ html, state = {} }) {
  const srcdoc = state?.store?.repl?.previewDoc || ''
  return html`
    <div
      class="bg-g0 radius2 border-solid border-p0 border0 text-p2 p0 h-screen">
      <iframe class="h-screen" srcdoc="${srcdoc}"></iframe>
    </div>

    <script type="module">
      import Store from '/_static/bundles/store.mjs'
      import API from '/_static/bundles/api.mjs'
      class EnhancePreview extends HTMLElement {
        constructor() {
          super()
          this.api = API({
            worker: new Worker('__API_WORKER__'),
            store: Store(),
          })
          this.update = this.update.bind(this)
          this.iframe = this.querySelector('iframe')
        }
        connectedCallback() {
          this.api.subscribe(this.update)
        }
        disconnectedCallback() {
          this.api.unsubscribe(this.update)
        }

        update(srcDoc) {
          this.iframe.setAttribute('srcdoc', srcDoc.iframeSrc)
        }
      }
      customElements.define('enhance-preview', EnhancePreview)
    </script>
  `
}
