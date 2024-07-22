export default function BlogPagination ({ html, state }) {
  const { attrs, store } = state
  const { limit = 20 } = store
  const { index, label } = attrs

  const booleanAttr = (attrs, attr) =>
    Object.keys(attrs).includes(attr) ? attr : ''
  const active = booleanAttr(attrs, 'active')

  return html`
    <style>
      .active {
        color: white;
        background-color: var(--denim);
      }
    </style>
    <li
      class="
         flex
         align-items-center
         justify-content-center
         font-semibold
         leading5
         pb-2
        "
    >
      ${!active
    ? `<a
         class="no-underline pi-1"
         href="/blog?offset=${parseInt(index, 10) * limit}&limit=${limit}"
       >
        ${label}
      </a>`
    : `<div class="pi-1 mi-3 radius0 active">
         ${label}
       </div>`}
    </li>
  `
}
