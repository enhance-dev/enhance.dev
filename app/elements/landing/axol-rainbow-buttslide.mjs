export default function AxolRainbow({ html }) {
  return html`
    <style>
      figure {
        /* Combined aspect ratio of rainbow-top and rainbow-bottom */
        aspect-ratio: 1488 / 1460;
        width: 100vw;
      }

      img {
        aspect-ratio: 237 / 317;
        width: 20vw;
        transform: rotate(-24deg);
      }
    </style>
    <figure class="flex items-center justify-center">
      <img src="/_public/img/landing/axol-sliding.svg" alt="" />
    </figure>
  `
}
