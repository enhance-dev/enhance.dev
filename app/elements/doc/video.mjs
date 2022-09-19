export default function DocVideo({ html, state }) {
  const { attrs } = state
  const playbackId = attrs['playback-id']
  const title = attrs.title || 'Enhance Video'

  return html`
    <style>
      :host {
        display: block;
        width: 100%;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }
      .video-placeholder {
        display: block;
        min-height: 400px; /* need a 16:9 responsive element */
        background-color: var(--grey-greyer);
      }
      mux-player {
        display: none;
      }

      p {
        margin-top: 0.5rem;
        text-align: right;
        color: var(--grey-greyer);
      }
      p a {
        font-family: 'Menlo', monospace;
        display: inline-flex;
      }
      p a img {
        display: inline-block;
        height: 1.1rem;
      }
    </style>

    <div class="video-placeholder"></div>

    <mux-player
      stream-type="on-demand"
      playback-id="${playbackId}"
      metadata-video-title="${title}"></mux-player>

    <p>
      Powered by
      <a target="_blank" href="https://docs.mux.com/guides/video/mux-player">
        <span>&lt;</span>
        <img src="/_static/img/mux.png" />
        <span>-player&gt;</span>
      </a>
    </p>

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
