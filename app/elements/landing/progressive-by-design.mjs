export default function ProgressiveByDesign({ html }) {
  return html`
    <style>
      h2 {
        color: white;
        font-size: var(--text-5);
      }

      p {
        color: white;
        font-size: var(--text-0);
        padding-block: var(--space-l);
        max-width: 52ch;
      }

      img {
        width: 50vw;
        aspect-ratio: 675 / 210;
        right: -17.5%;
      }
    </style>
    <h2 class="uppercase font-extrabold tracking-2">
      <span class="block text-right">Progressive</span>
      <span class="block">By Design</span>
    </h2>
    <p class="pl0 pr0 text-center leading3 m-auto">
      Enhance makes the right way the easy way. Some frameworks claim
      progressive design but deliver empty app shells and spinners. Start with a
      version that works everywhere for everyone. Incrementally add advanced
      features from&nbsp;there.
    </p>
    <div class="flex justify-end">
      <img
        src="/_public/img/landing/cloud-blue-wide.svg"
        alt=""
        class="relative" />
    </div>
  `
}
