export default function AxolNoJSRequired({ html }) {
  return html`
    <style>
      .axol {
        width: 24vw;
        aspect-ratio: 141 / 162;
        transform: scale(-1, 1);
        flex: none;
      }

      .banner {
        background: var(--halite);
        color: white;
        font-size: 5vw;
        padding-block: 0.5vw;
        padding-inline: 5vw;
        left: -8vw;
        top: 4vw;
      }

      @media (prefers-reduced-motion: no-preference) {
        .banner {
          font-size: 11vw;
          padding-block: 0;
        }
      }
    </style>
    <div class="flex items-center">
      <img
        src="/_public/img/landing/axol.svg"
        alt=""
        class="axol relative z1" />
      <p class="banner font-bold uppercase pr0 flex-none relative">
        No Javascript required
      </p>
    </div>
  `
}
