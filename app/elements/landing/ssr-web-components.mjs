export default function SSRWebComponents({ html }) {
  return html`
    <style>
      :host {
        display: block;
        padding-top: var(--space-l);
        padding-bottom: var(--space-2xl);
      }

      h2 {
        max-width: 72rem;
      }

      .webComponentsType {
        /* Slight inset to align with SSR cloud type */
        transform: scale(0.9);
      }

      p {
        color: white;
        padding-inline: 1rem;
        padding-block: var(--space-l);
        max-width: 48ch;
      }

      a {
        text-decoration: underline 1px;
      }

      .cloud-and-puffs img {
        width: 40vw;
        aspect-ratio: 675 / 210;
        transform: translateX(-25%);
      }

      landing-three-puffs {
        width: 33vw;
        transform: translateX(-33%);
      }
    </style>
    <div class="text-center pl0 pr0">
      <h2 class="font-extrabold uppercase tracking-1 text-center m-auto">
        <landing-ssr-type class="w-full mb0"></landing-ssr-type>
        <span class="clip">SSR</span>
        <svg
          viewBox="0 0 966 75"
          xmlns="http://www.w3.org/2000/svg"
          class="webComponentsType">
          <text
            fill="#E8F8FF"
            font-family="Rubik"
            font-size="101.48"
            font-weight="800"
            letter-spacing="0em">
            <tspan x="-2.75082" y="72.7569">Web Components</tspan>
          </text>
        </svg>
      </h2>

      <p class="text-center leading3 m-auto">
        Build server rendered custom elements<br />
        that seamlessly upgrade to interactive Web Components
      </p>

      <figure class="cloud-and-puffs flex justify-between">
        <img src="/_public/img/landing/cloud-blue-wide.svg" alt="" />
        <landing-three-puffs></landing-three-puffs>
      </figure>
    </div>
  `
}
