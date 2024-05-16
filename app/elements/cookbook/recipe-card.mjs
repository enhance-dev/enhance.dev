export default function Recipe ({ html, state }) {
  const { attrs } = state
  const { href, name, type } = attrs

  const types = [
    'article',
    'codepen',
    'walkthrough',
  ]

  if (!types.includes(type?.toLowerCase()) || !type) console.error(`cookbook-recipe: type attribute must be one of: ${types.join(', ')}`)

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

      <span class="text-1 pb-4 pi-2 mbs-auto mbe0 mi0">
        ${type?.toLowerCase()}
      </span>
    </a>
  `
}
