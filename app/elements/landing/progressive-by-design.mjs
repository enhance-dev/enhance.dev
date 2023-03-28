export default function ProgressiveByDesign({ html }) {
  return html`
    <style>
      /* Allow Axol to stack over the next page section */
      :host {
        position: relative;
        z-index: 1;
      }

      h2 {
        color: white;
        font-size: 12vw;
      }

      h2 span:last-child {
        /* Negate character spacing causing a gap between viewport edge and 'B' */
        margin-left: -1.5%;
      }

      .paragraph-safety {
        padding-inline: 15vw;
      }

      p {
        color: white;
        padding-block: var(--space-l);
        max-width: 52ch;
      }

      .cloud-wide {
        width: 60vw;
        aspect-ratio: 675 / 210;
        right: -17.5%;
        margin-top: -5vw;
      }

      .rainbow-top {
        margin-top: -30vw;
      }

      .rainbow-top > img {
        aspect-ratio: 1488 / 724;
        width: 100vw;
      }
    </style>
    <h2 class="uppercase font-extrabold tracking-2">
      <span class="block text-right">Progressive</span>
      <span class="block">By Design</span>
    </h2>
    <div class="paragraph-safety">
      <p class="text-center-lg leading3 m-auto">
        Enhance makes the right way the easy&nbsp;way.
        <br class="hidden block-lg" />
        Start with a version that works everywhere for&nbsp;everyone.
        <br class="hidden block-lg" />
        Incrementally upgrade interactive elements from&nbsp;there.
      </p>
    </div>
    <figure class="flex justify-end">
      <img
        src="/_public/img/landing/cloud-blue-wide.svg"
        alt=""
        loading="lazy"
        class="cloud-wide relative" />
    </figure>
    <figure class="rainbow-top relative">
      <img
        src="/_public/img/landing/cloud-and-rainbow-top.svg"
        alt=""
        loading="lazy" />
      <landing-axol-rainbow-buttslide
        class="absolute top0 left0"></landing-axol-rainbow-buttslide>
    </figure>
  `
}
