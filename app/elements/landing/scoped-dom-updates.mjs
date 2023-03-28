export default function ScopedDOMUpdates({ html }) {
  return html`
    <style>
      :host {
        position: relative;
      }

      landing-marquee {
        color: var(--purple);
        padding-block: var(--space-xl);
      }

      landing-marquee [slot='text'] {
        font-size: 8vw;
      }

      .cloud-and-code {
        aspect-ratio: 780 / 536;
      }

      p {
        color: var(--mid-purple);
      }

      p:first-of-type {
        font-size: var(--text-1);
        max-width: 24ch;
      }

      p:last-of-type {
        max-width: 32ch;
      }

      .cloud-chunky-left {
        width: 20vw;
        aspect-ratio: 945 / 508;
        transform: translateX(-33%);
        margin-top: var(--space-l);
      }

      .cloud-chunky-right {
        bottom: 5%;
        right: 0;
        width: 40vw;
        transform: translateX(10%);
      }
    </style>

    <!-- Using an H2 in the marquee produces a duplicate heading -->
    <h2 class="clip">Scoped DOM Updates</h2>
    <landing-marquee>
      <span slot="text">Scoped DOM Updates</span>
      <img
        slot="image"
        src="/_public/img/landing/star-filled-purple.svg"
        loading="lazy"
        alt="" />
    </landing-marquee>

    <div class="grid gap4 gap2-lg items-center col-1 col-2-lg pb4">
      <img
        src="/_public/img/landing/cloud-and-code.svg"
        alt=""
        loading="lazy"
        class="cloud-and-code w-full" />
      <div class="pl0 pr0 pl-none-lg pr5-lg pb5-lg m-auto m-none-lg">
        <p class="leading2 mb0">
          No need for a full page render to update one element
        </p>
        <p class="leading3 mb5">
          Ditch throbbers and loading screens by removing framework bloat and
          authoring only the code you&nbsp;need.
        </p>
        <landing-link-button href="/docs/"> Try it now! </landing-link-button>
      </div>
    </div>

    <img
      src="/_public/img/landing/cloud-blue-chunky.svg"
      alt=""
      loading="lazy"
      class="cloud-chunky-left" />

    <img
      src="/_public/img/landing/cloud-blue-chunky.svg"
      alt=""
      loading="lazy"
      class="cloud-chunky-right absolute" />
  `
}
