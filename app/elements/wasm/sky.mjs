export default function Sky ({ html }) {
  return html`
    <style>
      :host {
        display: block;
        background-image: linear-gradient(to bottom, #fff0fe, #c9ecff, #7e60f3);
        padding-block-start: clamp(var(--space-7), 12vw, 16em);
        position: relative;
        z-index: 1;
      }

      @keyframes sunshine {
        0% {
          scale: 1;
          opacity: 0.5;
        }
        100% {
          scale: 1.5;
          opacity: 0.875;
        }
      }

      [slot="heading"] {
        translate: 0 -25%;
      }

      #sunlight {
        background-image: radial-gradient(
          circle at center,
          #ffe9b0,
          transparent 66%
        );
        aspect-ratio: 1 / 1;
        width: 75vw;
        translate: 0 -33%;
        animation: 4s sunshine linear alternate infinite;
        animation-fill-mode: forward;
        z-index: -1;
      }

      #purple-cloud-right {
        inline-size: 40vw;
        opacity: 0.5;
        translate: 25% -100%;
        z-index: -2;
      }

      #purple-cloud-left {
        inline-size: 40vw;
        opacity: 0.4;
        translate: -20% 0;
        z-index: -2;
      }
    </style>

    <figure id="sunlight" class="absolute inset-bs-0 inset-i-0 mi-auto"></figure>

    <figure id="purple-cloud-right" class="absolute inset-ie-0">
      <img src="/_public/img/landing/cloud-purple-wide.svg" alt="" />
    </figure>

    <slot name="heading"></slot>

    <figure id="purple-cloud-left" class="absolute inset-is-0">
      <img src="/_public/img/landing/cloud-purple-medium.svg" alt="" />
    </figure>

    <slot name="body"></slot>
  `
}
