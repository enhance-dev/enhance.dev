export default function YouveReached({ html }) {
  return html`
    <style>
      :host {
        display: block;
        padding-inline: 1rem;
        margin-inline: auto;
        padding-bottom: var(--space-3xl);
        position: relative;
        z-index: 1;
      }

      @media screen and (min-width: 48em) {
        :host {
          max-width: 80vw;
          padding-inline: 0;
        }
      }

      h2 {
        background-image: linear-gradient(
          to bottom,
          #f179fe,
          #de76fd,
          #c872fb,
          #9e4eff
        );
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        text-fill-color: transparent;
        font-size: min(10rem, 10vw);
        margin-block: var(--space-l);
      }

      p {
        color: var(--mid-purple);
        font-size: var(--text-0);
        padding-bottom: var(--space-l);
      }

      .cloud {
        width: 33vw;
        right: -20vw;
        bottom: 20%;
      }

      @keyframes float {
        from {
          transform: translateY(0) rotate(0deg);
        }
        to {
          transform: translateY(-4%) rotate(-2deg);
        }
      }

      .axol {
        width: min(650px, 30vw);
        right: 5vw;
      }

      @media screen and (min-width: 48em) {
        .axol {
          right: -5vw;
        }
      }

      @media (prefers-reduced-motion: no-preference) {
        .axol {
          animation: 4s float infinite alternate ease-in-out;
          transform-origin: top center;
        }
      }
    </style>

    <h2 class="font-extrabold uppercase tracking-1">
      Always<br />
      Ready<br />
      for<br />
      liftoff!<br />
    </h2>

    <img
      src="/_public/img/landing/cloud-blue-chunky.svg"
      alt=""
      class="cloud absolute z-1" />

    <img
      src="/_public/img/landing/axol-balloons.svg"
      alt=""
      class="axol absolute top0 z1" />

    <p class="leading3">
      Enhance apps are designed with deployment in mind<br />
      When you're ready to launch we've got you covered with
      <a href="https://begin.com" class="underline">Begin</a>!
    </p>

    <landing-link-button href="/docs/"> Start now! </landing-link-button>
  `
}
