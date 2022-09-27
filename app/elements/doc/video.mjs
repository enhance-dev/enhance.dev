import arc from '@architect/functions'

export default function DocVideo({ html, state }) {
  const { attrs } = state
  const playbackId = attrs['playback-id']
  const title = attrs.title || 'Enhance Video'
  const scriptTag = arc.static('/bundles/mux-player.mjs')

  return html`
    <style>
      :host {
        display: block;
        width: 100%;
      }
      .video-placeholder {
        display: block;
        width: 100%;
        min-height: 200px;
        aspect-ratio: 16 / 9;
        background-color: var(--grey-greyer);
      }

      mux-player {
        display: none;
      }

      cite {
        display: block;
        width: 100%;
        margin-top: 0.25rem;
        text-align: right;
        color: var(--inky-lily);
        font-style: normal;
        font-size: 0.9rem;
      }
    </style>

    <div class="video-placeholder"></div>

    <mux-player
      stream-type="on-demand"
      playback-id="${playbackId}"
      metadata-video-title="${title}"></mux-player>

    <cite>
      Powered by
      <a
        target="_blank"
        href="https://www.mux.com/player?utm_source=enhance-docs">
        &lt;mux-player&gt;
      </a>
    </cite>

    <script type="module" src="${scriptTag}"></script>

    <script type="module">
      class DocVideo extends HTMLElement {
        constructor() {
          super()
          this.placeholder = this.querySelector('.video-placeholder')
          this.player = this.querySelector('mux-player')
        }

        connectedCallback() {
          this.placeholder.style.display = 'none'
          this.player.style.display = 'block'
        }
      }

      customElements.define('doc-video', DocVideo)
    </script>
  `
}
