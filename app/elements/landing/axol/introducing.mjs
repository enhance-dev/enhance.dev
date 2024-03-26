export default function AxolIntroducing ({ html }) {
  return html`
    <style>
      :host {
        color: var(--mid-purple);
      }

      figure {
        background: radial-gradient(closest-side, white, transparent);
        grid-template-columns: var(--space-xl) auto var(--space-xl);
        gap: var(--space-xs);
      }

      span {
        font-size: var(--landing-text-1);
        padding-top: calc(0.25rem + var(--space-2xs));
        padding-bottom: var(--space-2xs);
      }

      .axol {
        aspect-ratio: 142 / 163;
      }

      .swash {
        aspect-ratio: 163 / 24;
        width: 100%;
      }

      .mirror {
        transform: scale(-1, 1);
      }
    </style>
    <figure class="grid align-items-center">
      <img src="/_public/img/landing/axol.svg" alt="" class="axol si-100" />
      <div>
        <img
          src="/_public/img/landing/swash.svg"
          alt=""
          class="swash mi-auto" />
        <span class="block font-semibold uppercase text-center">
          Introducing
        </span>
        <img
          src="/_public/img/landing/swash.svg"
          alt=""
          class="swash mi-auto" />
      </div>
      <img
        src="/_public/img/landing/axol.svg"
        alt=""
        class="axol si-100 mirror" />
    </figure>
  `
}
