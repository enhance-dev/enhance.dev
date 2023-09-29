export default function SwingingAxols({ html }) {
  return html`
    <style>
      :host {
        display: block;
        position: relative;
      }

      landing-axol-swing-pink,
      landing-axol-swing-blue {
        top: -1rem;
        width: 20vw;
      }

      landing-star-cross:first-of-type {
        width: 2vw;
        left: 20vw;
        top: 50%;
      }

      landing-star-cross:nth-of-type(2) {
        width: 1vw;
        left: 25vw;
        top: 45%;
      }

      landing-star-filled:first-of-type {
        width: 2vw;
        right: 23vw;
        top: 50%;
      }

      landing-star-filled:nth-of-type(2) {
        width: 1.5vw;
        right: 25vw;
        top: 65%;
      }
    </style>

    <figure class="flex justify-content-center relative">
      <landing-star-cross class="absolute"></landing-star-cross>
      <landing-star-cross class="absolute"></landing-star-cross>
      <landing-star-filled class="absolute"></landing-star-filled>
      <landing-star-filled class="absolute"></landing-star-filled>

      <landing-axol-swing-pink
        class="relative flex justify-content-center"></landing-axol-swing-pink>
      <landing-axol-swing-blue
        class="relative flex justify-content-center"></landing-axol-swing-blue>
    </figure>
  `
}
