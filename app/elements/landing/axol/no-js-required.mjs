export default function AxolNoJSRequired({ html }) {
  return html`
    <style>
      .axol {
        width: 16vw;
        aspect-ratio: 141 / 162;
        transform: scale(-1, 1);
        top: 0.5rem;
      }

      .banner {
        background: var(--halite);
        color: white;
        font-size: max(1.125rem, 5vw);
        padding-block: 0.5vw;
        padding-inline: 5vw;
        left: -7vw;
        top: 4vw;
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
