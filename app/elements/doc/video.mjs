export default function DocVideo({ html, state }) {
  const { attrs } = state
  const playbackId = attrs['playback-id']
  const title = attrs.title || 'Enhance Video'

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
      <a target="_blank" href="https://docs.mux.com/guides/video/mux-player">
        &lt;mux-player&gt;
      </a>
    </cite>

    <script type="module" src="/_static/bundles/mux-player.mjs"></script>

    <script type="module">
      class DocVideo extends HTMLElement {
        constructor() {
          super()
          this.placeholder = this.querySelector('.video-placeholder')
          this.player = this.querySelector('mux-player')

          this.player.addEventListener('canplay', () => {
            this.placeholder.style.display = 'none'
            this.player.style.display = 'block'
          })
        }
      }

      customElements.define('doc-video', DocVideo)
    </script>
  `
}
