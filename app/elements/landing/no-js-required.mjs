export default function NoJsRequired({ html }) {
  return html`
    <style>
      h2 {
        color: var(--mid-purple);
        font-size: var(--text-3);
        padding-block: var(--space-l);
      }

      .cloud-pink {
        width: 25vw;
        aspect-ratio: 342 / 105;
        transform: translateX(-2%);
      }

      landing-star-filled {
        width: 3vw;
        left: 50%;
        transform: translateX(-50%) translateY(-100%);
      }

      .no-js-axol-banner {
        transform: translateY(-2vw);
      }

      .no-js-axol {
        width: 22vw;
        aspect-ratio: 141 / 162;
        transform: scale(-1, 1);
      }

      .no-js-banner {
        background: var(--halite);
        color: white;
        font-size: 5vw;
        padding-inline: 5vw;
        left: -8vw;
        top: 4vw;
      }

      .heart-left,
      .heart-right {
        width: 20vw;
      }

      .cloud-pink-thin-extra {
        z-index: -2;
        width: 25vw;
        right: -3vw;
      }

      .cloud-blue-wide {
        width: 42vw;
        aspect-ratio: 674 / 209;
        left: -12vw;
        transform: translateY(-1vw);
      }

      .unless {
        padding-block: var(--space-l);
      }

      .unless .cloud-blue-chunky-left,
      .unless .cloud-blue-chunky-right {
        aspect-ratio: 945 / 508;
      }

      .unless .cloud-blue-chunky-left {
        width: 60vw;
        transform: translateX(-33%);
      }

      .unless .cloud-blue-small {
        width: 5vw;
        left: 18vw;
      }

      .unless .cloud-blue-chunky-right {
        bottom: var(--space-l);
        width: 30vw;
        transform: translateX(25%);
      }

      .unless-axol-banner {
        left: 15vw;
      }

      .unless-axol {
        width: 15vw;
        transform: translateY(-12.5%) translateX(-30%);
      }

      .unless-banner {
        background: var(--pale-cyan);
        color: var(--mid-purple);
        font-size: 3vw;
        padding-block: 1vw;
        padding-inline: 4vw;
      }
    </style>

    <section class="relative">
      <h2 class="text-center uppercase">
        Build your entire<br />
        app
        <span class="font-semibold">
          with fully<br />
          functioning HTML
        </span>
      </h2>

      <img
        src="/_public/img/landing/cloud-pink-thin.svg"
        alt=""
        class="cloud-pink" />

      <landing-star-filled class="absolute"></landing-star-filled>

      <figure class="flex items-center justify-end relative z1">
        <div class="no-js-axol-banner absolute flex items-center">
          <img
            src="/_public/img/landing/axol.svg"
            alt=""
            class="no-js-axol relative z1" />
          <p
            class="no-js-banner font-bold uppercase pt-2 pb-2 pr0 flex-none relative">
            No Javascript required
          </p>
        </div>

        <img
          src="/_public/img/landing/cloud-pink-heart-left.svg"
          class="heart-left relative z-1"
          alt="" />
        <img
          src="/_public/img/landing/cloud-pink-heart-right.svg"
          class="heart-right relative z1"
          alt="" />
        <img
          src="/_public/img/landing/cloud-pink-thin-extra.svg"
          alt=""
          class="cloud-pink-thin-extra absolute bottom0" />
        <img
          src="/_public/img/landing/cloud-blue-wide.svg"
          alt=""
          class="cloud-blue-wide absolute bottom0" />
      </figure>

      <figure class="unless flex relative z1">
        <img
          src="/_public/img/landing/cloud-blue-chunky.svg"
          alt=""
          class="cloud-blue-chunky-left" />

        <img
          src="/_public/img/landing/cloud-blue-small.svg"
          alt=""
          class="cloud-blue-small absolute" />

        <div class="unless-axol-banner absolute z-1 flex items-center">
          <p class="unless-banner font-bold italic uppercase flex-none">
            Unless you want it
          </p>
          <img
            src="/_public/img/landing/axol-wink.svg"
            alt=""
            class="unless-axol" />
        </div>

        <img
          src="/_public/img/landing/cloud-blue-chunky.svg"
          alt=""
          class="cloud-blue-chunky-right absolute right0" />
      </figure>
    </section>
  `
}
