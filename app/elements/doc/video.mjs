import arc from '@architect/functions'

export default function DocVideo({ html, state }) {
  const { attrs } = state
  const playbackId = attrs['playback-id']
  const name = attrs.name || 'Enhance Video'

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

      nav {
        position: absolute;
        z-index: 100;
        bottom: 0;
        left: 0;
      }
      nav a {
        position: absolute;
        z-index: -1;
        bottom: 0;
        left: 0;
        padding-right: 0.5rem;
        text-align: center;
        font-size: 1.5rem;
      }

      nav ul {
        margin: 0 0 0.5rem 1.3rem;
        padding: 0.5rem;
        list-style: none;
        cursor: pointer;
        color: var(--purple-princess);
        background: var(--cloud-ateneo);
        box-shadow: rgb(0 0 0 / 10%) 0px 1px 3px 0px,
          rgb(0 0 0 / 6%) 0px 1px 2px 0px;
      }
      nav ul li {
        width: auto;
        padding: 0.5rem;
        border-radius: 0.25rem;
      }
      nav ul li.current {
        color: var(--inky-lily);
      }
      nav ul li.current::before {
        content: '› ';
      }

      nav ul.hide {
        transition: max-height 0.3s ease-out;
        overflow: hidden;
        visibility: hidden;
        max-height: 0;
        max-width: 0;
      }
      @media (hover: hover) {
        /* don't apply hover on touchstart */
        nav:hover ul.hide {
          max-height: 500px;
          max-width: unset;
          visibility: visible;
        }
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

    <div data-doc-video="next-videos" class="hidden">
      <doc-video-current
        playback-id="${playbackId}"
        name="${name}"></doc-video-current>
      <slot></slot>
    </div>

    <video
      class="placeholder"
      src="https://stream.mux.com/${playbackId}/medium.mp4"
      controls></video>

    <mux-player
      stream-type="on-demand"
      playback-id="${playbackId}"
      metadata-video-title="${name}"></mux-player>

    <nav class="doc-video-menu hidden">
      <ul class="hide"></ul>
      <a>☰</a>
    </nav>

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

    <script
      type="module"
      src="${arc.static('/js/elements/doc-video.mjs')}"></script>
  `
}
