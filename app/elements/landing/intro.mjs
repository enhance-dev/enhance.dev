export default function LandingIntro({ html, state }) {
  return html`
    <style>
      :host {
        --marquee-gap: 1rem;
      }

      section {
        background: linear-gradient(to bottom, #c9ecff, #fff0fe);
        color: var(--mid-purple);
        padding-top: var(--space-l);
      }

      .enhance-type {
        padding-top: var(--space-l);
        width: 85vw;
      }

      .top-cloud {
        aspect-ratio: 427 / 240;
        top: 50%;
        width: 20vw;
      }

      .top-cloud:nth-of-type(1) {
        left: 0;
        transform: translate(-50%, -50%);
      }

      .top-cloud:nth-of-type(2) {
        right: 0;
        transform: translate(50%, -50%);
      }

      .middle-clouds {
        aspect-ratio: 375 / 128;
      }

      .middle-cloud-medium {
        width: 25vw;
        top: 50%;
        left: 40%;
        transform: translateX(-100%) translateY(-50%);
      }

      .middle-cloud-wide {
        width: 50vw;
        top: 15%;
        right: 0;
        transform: translateX(40%);
      }

      .bottom-clouds {
        aspect-ratio: 1412 / 837;
        background-image: url('/_public/img/landing/cloud-purple-section-top.svg');
        background-repeat: no-repeat;
        background-size: contain;
        /* Tuck bottom clouds slightly under middle clouds */
        margin-top: -18.75%;
      }

      .bottom-clouds p {
        /* Won't respond to font/page zoom levels, but it's so big that this shouldn't be an issue */
        font-size: 5.5vw;
        /* Offset to ensure text doesn't hit top of clouds */
        transform: translateY(-33%);
      }

      .marquee-wrapper {
        background-color: var(--mid-purple);
        gap: var(--marquee-gap);
        /* Prevent subpixel rendering showing a thin bleed through of surrounding background */
        margin-block: -1px;
      }

      .marquee {
        gap: var(--marquee-gap);
      }

      @media not (prefers-reduced-motion) {
        .marquee {
          animation: scroll 12s linear infinite;
        }
      }

      .marquee span {
        -webkit-text-stroke: 0.33vw white;
        color: transparent;
        font-size: 15vw;
      }

      .marquee img {
        height: 6vw;
      }

      /* Don't show star graphic between marquee instances if it's not animated */
      @media (prefers-reduced-motion) {
        .marquee img {
          display: none;
        }
      }

      @keyframes scroll {
        from {
          transform: translateX(0);
        }
        to {
          transform: translateX(calc(-100% - var(--marquee-gap)));
        }
      }
    </style>

    <section>
      <div class="relative">
        <img
          src="/_public/img/landing/cloud-purple-chunky.svg"
          alt=""
          class="absolute top-cloud" />
        <img
          src="/_public/img/landing/cloud-purple-chunky.svg"
          alt=""
          class="absolute top-cloud" />

        <landing-axol-introducing class="flex justify-center pl5 pr5">
        </landing-axol-introducing>
      </div>

      <h1>
        <img
          src="/_public/img/landing/enhance-type.svg"
          alt="Enhance"
          class="enhance-type m-auto" />
      </h1>

      <figure class="middle-clouds relative">
        <img
          src="/_public/img/landing/cloud-purple-medium.svg"
          alt=""
          class="middle-cloud-medium absolute" />

        <img
          src="/_public/img/landing/cloud-purple-wide.svg"
          alt=""
          class="middle-cloud-wide absolute" />
      </figure>

      <figure class="bottom-clouds flex items-center justify-center">
        <p class="font-medium uppercase text-center">
          The web native<br />
          framework for your<br />
          Functional Web App
        </p>
      </figure>
    </section>

    <figure>
      <div class="marquee-wrapper pt0 pb0 flex overflow-hidden">
        <div class="marquee flex flex-shrink-0 items-center justify-around">
          <span class="font-extrabold uppercase">HTML&nbsp;First </span>
          <img src="/_public/img/landing/star-4pt-outline.svg" alt="" />
        </div>
        <div
          class="marquee flex flex-shrink-0 items-center justify-around"
          aria-hidden="true">
          <span class="font-extrabold uppercase">HTML&nbsp;First </span>
          <img src="/_public/img/landing/star-4pt-outline.svg" alt="" />
        </div>
      </div>
    </figure>

    <img
      src="/_public/img/landing/cloud-purple-section-bottom.svg"
      alt=""
      class="w-full" />

    <pre class="hidden">${JSON.stringify(state.store, null, 2)}</pre>
  `
}
