export default function DocShowcase({ html, state }) {
  const { attrs } = state
  const { title, image, url, author = 'the Enhance team' } = attrs

  return html`
    <style>
      :host {
        --radius: 0.5em;
      }

      article {
        background-color: var(--smoke-denim);
        border-radius: var(--radius);
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
          rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
      }

      img {
        border-radius: var(--radius);
      }

      a {
        color: inherit;
      }
    </style>
    <article class="mt0 mb2 p0 p2-lg">
      <a href="${url}" target="_blank">
        <figure>
          <img src="${image}" alt="" class="mb0" />
        </figure>
        <h1 class="font-medium">${title}</h1>
        <p class="mt0 leading3">
          <slot></slot>
        </p>
        <p class="mt0"><span class="font-medium">Author:</span> ${author}</p>
      </a>
    </article>
  `
}
