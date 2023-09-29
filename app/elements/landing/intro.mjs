export default function LandingIntro({ html }) {
  return html`
    <style>
      .intro {
        background: linear-gradient(to bottom, #c9ecff, #fff0fe);
        color: var(--mid-purple);
        padding-top: var(--space-xl);
      }

      landing-enhance-type-animated {
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

      .flare-blue {
        width: 30vw;
        aspect-ratio: 2 / 1;
        right: 0;
        translate: 25% 66%;
        background: radial-gradient(
          closest-side,
          hsla(186deg 100% 82% / 66%),
          transparent
        );
      }

      .bottom-clouds {
        aspect-ratio: 1412 / 837;
        background-image: url('/_public/img/landing/cloud-purple-section-top.svg');
        background-repeat: no-repeat;
        background-size: 100vw auto;
        /* Tuck bottom clouds slightly under middle clouds */
        margin-top: -18.75%;
      }

      .bottom-clouds p {
        font-size: clamp(1rem, 1rem + 3.75vw, 5.5vw);
        /* Offset to ensure text doesn't hit top of clouds */
        transform: translateY(-33%);
        z-index: 2;
      }

      landing-marquee {
        background-color: var(--mid-purple);
        /* Prevent surrounding SVG subpixel gaps at certain viewport sizes :) */
        margin-block: -1px;
      }

      landing-marquee [slot='text'] {
        -webkit-text-stroke: 0.33vw white;
        color: transparent;
        font-size: 15vw;
      }

      landing-marquee [slot='image'] {
        height: 6vw;
      }
    </style>

    <div class="intro">
      <div class="relative">
        <img
          src="/_public/img/landing/cloud-purple-chunky.svg"
          alt=""
          class="absolute top-cloud" />
        <img
          src="/_public/img/landing/cloud-purple-chunky.svg"
          alt=""
          class="absolute top-cloud" />

        <landing-axol-introducing class="flex justify-content-center pi5">
        </landing-axol-introducing>
      </div>

      <h1>
        <landing-enhance-type-animated
          class="mi-auto"></landing-enhance-type-animated>
        <span class="clip">Enhance</span>
      </h1>

      <figure class="middle-clouds relative z1">
        <img
          src="/_public/img/landing/cloud-purple-medium.svg"
          alt=""
          class="middle-cloud-medium absolute" />

        <img
          src="/_public/img/landing/cloud-purple-wide.svg"
          alt=""
          class="middle-cloud-wide absolute" />

        <div class="flare-blue absolute z-1" />
      </figure>

      <figure
        class="bottom-clouds flex align-items-center justify-content-center">
        <p class="font-medium uppercase text-center relative">
          The HTML first<br />
          Full Stack <br />
          Web Framework<br />
        </p>
      </figure>
    </div>

    <landing-marquee class="pt0 pb0">
      <span slot="text">HTML&nbsp;First</span>
      <img
        slot="image"
        src="/_public/img/landing/star-white-outline.svg"
        alt="" />
    </landing-marquee>
  `
}
