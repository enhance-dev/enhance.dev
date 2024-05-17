export default function Recipe ({ html, state }) {
  const { attrs } = state
  const { href, name } = attrs

  return html`
    <style>
      a {
        background-color: white;
        border: 1px solid var(--gray-200);
        border-radius: 0.25em;
        box-shadow: 0 2px 8px hsla(0deg 0% 0% / 0.1);
        transition: background-color 0.15s linear;
      }

      a:hover {

      }

      h3 {
        color: var(--dark-purple);
        border-block-end: 1px solid var(--gray-100);
        transition: color 0.15s linear;
      }

      a:hover h3,
      a:focus h3 {
        color: var(--magenta);
      }

      span {
        background: var(--gray-100);
        border-radius: 99em;
      }
    </style>
    <a href="${href}" class="flex flex-col align-items-start sb-100">
      <figure class="p0 leading4">
        <h3 class="text1 font-semibold tracking-1 leading1 pbe-1 mbe-1">
          ${name}
        </h3>

        <slot name="description"></slot>
      </figure>
    </a>
  `
}
