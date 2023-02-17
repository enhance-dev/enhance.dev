export default function Marquee({ html }) {
  return html`
    <style>
      :host {
        --marquee-gap: 1rem;
        display: block;
      }

      .marquee-wrapper {
        gap: var(--marquee-gap);
        /* Prevent subpixel rendering showing a thin bleed through of surrounding background */
        margin-block: -1px;
      }

      .marquee {
        gap: var(--marquee-gap);
        min-width: 100%;
      }

      .marquee:last-of-type {
        display: none;
      }

      @media (prefers-reduced-motion: no-preference) {
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100% - var(--marquee-gap)));
          }
        }

        .marquee {
          animation: scroll 12s linear infinite;
        }

        .marquee:last-of-type {
          display: flex;
        }
      }

      .marquee img {
        display: none;
      }

      /* Don't show star graphic between marquee instances if it's not animated */
      @media (prefers-reduced-motion: no-preference) {
        .marquee img {
          display: block;
        }
      }
    </style>
    <figure>
      <div class="marquee-wrapper flex overflow-hidden">
        <div
          class="marquee flex flex-shrink-0 items-center justify-around font-extrabold uppercase">
          <slot name="text"></slot>
          <slot name="image"></slot>
        </div>
        <div
          class="marquee flex-shrink-0 items-center justify-around font-extrabold uppercase"
          aria-hidden="true">
          <slot name="text" aria-hidden="true"></slot>
          <slot name="image"></slot>
        </div>
      </div>
    </figure>
  `
}
