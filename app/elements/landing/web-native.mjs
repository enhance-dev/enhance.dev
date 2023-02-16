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
        transform: translateY(-75%) translateX(50%);
      }

      .container {
        max-width: 75vw;
      }

      h2 {
        font-size: 16vw;
        margin-bottom: var(--space-m);
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

      .axol-rainbow-cloud > img {
        width: 50vw;
        transform: translateX(20%);
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
      <h2 class="uppercase font-extrabold">
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

    <figure class="axol-rainbow-cloud flex justify-end">
      <img src="/_public/img/landing/axol-rainbow-cloud.svg" alt="" />
    </figure>
  `
}
