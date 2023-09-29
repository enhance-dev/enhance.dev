export default function WebNative({ html }) {
  return html`
    <style>
      :host {
        color: var(--dark-purple);
        display: block;
        position: relative;
      }

      .rainbow-bottom {
        aspect-ratio: 1488 / 736;
        width: 100vw;
      }

      .cloud-and-axol {
        transform: translateY(66%) translateX(-5%);
      }

      .cloud-blue-chunky {
        aspect-ratio: 765 / 411;
        width: 50vw;
      }

      /* Axol popout animation tied to buttslide animation, see rainbow-buttslide.mjs */
      landing-axol-face-front {
        z-index: -1;
        transform: translateX(10vw) translateY(50%) rotate(16deg);
        transition: transform 300ms ease-out;
      }

      landing-axol-face-front svg {
        width: 27vw;
      }

      landing-axol-face-front.animated {
        transform: translateX(24vw) translateY(-8%) rotate(16deg);
      }

      .rewindButton {
        background-color: var(--princess);
        border-radius: 5px;
        box-shadow: 0 0 12px hsla(0deg 0% 100% / 50%);
        color: var(--denim);
        font-size: 0.8em;
        padding-block: 0.75em;
        padding-inline: 1em;
        transition: opacity 1s ease-in-out;
        opacity: 0;
        pointer-events: none;
      }

      .rewindButton.active {
        opacity: 1;
        pointer-events: auto;
      }

      .rewindButton:after {
        content: '';
        position: absolute;
        inset: -2px;
        box-shadow: 0 0 0 2px var(--princess);
        border-radius: 6px;
        opacity: 0;
        transform: scale(0.75);
        transition: opacity 150ms linear, transform 150ms linear;
      }

      .rewindButton:focus {
        outline: none;
      }

      .rewindButton:hover:after,
      .rewindButton:focus:after {
        opacity: 1;
        transform: scale(1);
      }

      .cloud-wide {
        aspect-ratio: 675 / 209;
        width: 50vw;
        transform: translateX(50%);
        margin-top: -10%;
      }

      .container {
        max-width: 80vw;
      }

      h2 {
        font-size: min(16rem, 16vw);
        margin-top: var(--space-l);
        margin-bottom: var(--space-m);
        margin-left: -0.025em;
      }

      .container p:first-of-type {
        font-size: var(--landing-text-1);
        margin-bottom: var(--space-m);
        max-width: 28ch;
      }

      .container p:last-of-type {
        max-width: 32ch;
      }

      landing-axol-on-rainbow-and-cloud {
        aspect-ratio: 789 / 550;
        width: 40vw;
        transform: translateX(20%);
        margin-top: 1rem;
      }

      @media screen and (min-width: 52em) {
        landing-axol-on-rainbow-and-cloud {
          width: 50vw;
          margin-top: -20%;
        }
      }

      .cloud-triad {
        width: 20vw;
        transform: translateX(-10%);
        margin-top: -10%;
      }
    </style>

    <script type="module">
      const rewindButton = document.querySelector('.js-rewindButton')
      const axolSliding = document.getElementById('axol-sliding')
      const axolFace = document.querySelector('landing-axol-face-front')

      rewindButton.addEventListener('click', () => {
        rewindButton.classList.remove('active')
        axolFace.classList.remove('animated')
        axolSliding.classList.remove('animated')
      })
    </script>

    <img
      src="/_public/img/landing/cloud-and-rainbow-bottom.svg"
      alt=""
      loading="lazy"
      class="rainbow-bottom" />

    <figure
      class="cloud-and-axol absolute inset-bs-0 inset-is-0 flex align-items-center si-100">
      <img
        src="/_public/img/landing/cloud-cyan-chunky-light.svg"
        alt=""
        loading="lazy"
        class="inline-block flex-none cloud-blue-chunky" />

      <landing-axol-face-front class="absolute inset-bs-0 inset-is-0 flex-none">
      </landing-axol-face-front>

      <button
        class="relative mi-auto flex-none uppercase tracking2 font-medium rewindButton js-rewindButton">
        &olarr; Rewind!
      </button>
    </figure>

    <figure class="flex justify-content-end">
      <img
        src="/_public/img/landing/cloud-cyan-wide.svg"
        alt=""
        loading="lazy"
        class="cloud-wide" />
    </figure>

    <div class="container mi-auto">
      <h2 class="uppercase font-extrabold tracking-1">
        Stable<br />
        Forever
      </h2>

      <p class="leading3">
        The web platform has what you need and never goes out of&nbsp;fashion
      </p>

      <p class="leading3">
        When you learn Enhance, you’re learning development approaches that will
        last as long as the web&nbsp;does.
      </p>
    </div>

    <figure class="flex justify-content-end">
      <landing-axol-on-rainbow-and-cloud></landing-axol-on-rainbow-and-cloud>
    </figure>

    <img
      src="/_public/img/landing/cloud-purple-triad.svg"
      alt=""
      loading="lazy"
      class="cloud-triad" />
  `
}
