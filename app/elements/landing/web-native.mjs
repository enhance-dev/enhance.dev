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

      .cloud-blue-chunky {
        aspect-ratio: 765 / 411;
        width: 50vw;
        transform: translateY(66%) translateX(-10%);
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
        font-size: var(--text-1);
        margin-bottom: var(--space-m);
        max-width: 28ch;
      }

      .container p:last-of-type {
        font-size: var(--text-0);
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

    <img
      src="/_public/img/landing/cloud-and-rainbow-bottom.svg"
      alt=""
      class="rainbow-bottom" />

    <img
      src="/_public/img/landing/cloud-cyan-chunky-light.svg"
      alt=""
      class="cloud-blue-chunky absolute top0 left0" />

    <figure class="flex justify-end">
      <img
        src="/_public/img/landing/cloud-cyan-wide.svg"
        alt=""
        class="cloud-wide" />
    </figure>

    <div class="container m-auto">
      <h2 class="uppercase font-extrabold tracking-1">
        Web<br />
        Native
      </h2>

      <p class="leading3">
        Build using web standards so you don’t have to constantly chase
        breaking&nbsp;changes.
      </p>

      <p class="leading3">
        When you learn Enhance, you’re learning native web standards that will
        last as long as the web&nbsp;does.
      </p>
    </div>

    <figure class="flex justify-end">
      <landing-axol-on-rainbow-and-cloud></landing-axol-on-rainbow-and-cloud>
    </figure>

    <img
      src="/_public/img/landing/cloud-purple-triad.svg"
      alt=""
      class="cloud-triad" />
  `
}
