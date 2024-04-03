export default function Liftoff ({ html }) {
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

      @media screen and (min-width: 56em) {
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
        text-indent: 0.05em;
      }

      .kern-a,
      .kern-ea,
      .kern-ft {
        letter-spacing: 0;
      }

      .kern-lway {
        letter-spacing: -0.04em;
      }

      .kern-ift {
        letter-spacing: -0.06em;
      }

      p {
        color: var(--mid-purple);
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

      @media screen and (min-width: 56em) {
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

    <h2 class="font-black uppercase tracking-1">
      <span class="kern-a">A</span><span class="kern-lway">lway</span>s<br />
      R<span class="kern-ea">ea</span>dy<br />
      for<br />
      l<span class="kern-ift">i<span class="kern-ft">ft</span></span
      >off!<br />
    </h2>

    <img
      src="/_public/img/landing/cloud-blue-chunky.svg"
      alt=""
      loading="lazy"
      class="cloud absolute z-1" />

    <img
      src="/_public/img/landing/axol-balloons.svg"
      alt=""
      loading="lazy"
      class="axol absolute inset-bs-0 z1" />

    <p class="leading3 font-medium">
      Enhance apps are designed with deployment in mind.
      <br class="hidden block-lg" />
      When you're ready to launch, we've got you covered with
      <a href="https://begin.com" class="underline">Begin</a>!
    </p>

    <div class="flex flex-col flex-row-lg gap0">
      <landing-link-button href="/docs">Check out Enhance</landing-link-button>
      <landing-link-button href="https://begin.com/docs">
        Prepare for launch
      </landing-link-button>
    </div>
  `
}
