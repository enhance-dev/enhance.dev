export default function AxolIntroducing({ html }) {
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
        font-size: var(--text-1);
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
    <figure class="grid items-center">
      <img src="/_public/img/landing/axol.svg" alt="" class="axol w-full" />
      <div>
        <img src="/_public/img/landing/swash.svg" alt="" class="swash m-auto" />
        <span class="block font-semibold uppercase text-center">
          Introducing
        </span>
        <img src="/_public/img/landing/swash.svg" alt="" class="swash m-auto" />
      </div>
      <img
        src="/_public/img/landing/axol.svg"
        alt=""
        class="axol w-full mirror" />
    </figure>
  `
}
