import arc from '@architect/functions'

export default function DocVideo({ html, state }) {
  const { attrs } = state
  const playbackId = attrs['playback-id']
  const title = attrs.title || 'Enhance Video'

  return html`
    <style>
      :host {
        display: block;
        position: relative;
        width: 100%;
        padding-bottom: 1.25rem;
        /* overall <doc-video> aspect ratio, reduce layout shift */
        aspect-ratio: 5 / 3;
      }
      video.placeholder {
        display: block;
        width: 100%;
      }

      mux-player {
        display: none;
      }

      cite {
        position: absolute;
        bottom: 0;
        right: 0;
        color: var(--inky-lily);
        font-style: normal;
        font-size: 0.9rem;
      }
    </style>

    <video
      class="placeholder"
      src="https://stream.mux.com/${playbackId}/medium.mp4"
      controls></video>

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

    <script
      type="module"
      src="${arc.static('/bundles/mux-player.mjs')}"></script>

    <script type="module">
      class DocVideo extends HTMLElement {
        constructor() {
          super()
          this.video = this.querySelector('video.placeholder')
          this.player = this.querySelector('mux-player')
        }

        connectedCallback() {
          this.video.remove()
          this.player.style.display = 'block'
        }
      }

      customElements.define('doc-video', DocVideo)
    </script>
  `
}
