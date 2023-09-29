export default function DocShowcase({ html, state }) {
  const { attrs } = state
  const {
    title,
    image,
    url,
    contributor = '',
    'contributor-url': contributorUrl = '',
  } = attrs

  const contributorMarkup = contributor
    ? `<p class="mbs0">Contributed by: <a class="underline" href="${contributorUrl}">${contributor}</a></p>`
    : ''

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

      p {
        max-width: 64ch;
      }

      a {
        color: inherit;
      }
    </style>
    <article class="mt0 mb2 p0 p2-lg">
      <a href="${url}" target="_blank">
        <figure class="mb1">
          <img src="${image}" alt="" />
        </figure>
        <h1 class="font-medium mbe0">${title}</h1>
        <p class="leading3">
          <slot></slot>
        </p>
      </a>
      ${contributorMarkup}
    </article>
  `
}
