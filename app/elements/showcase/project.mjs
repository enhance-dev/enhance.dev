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

  const axolStyles = `
<style>
  @media screen and (min-width: 67.5em) {
    .show-axol:after {
      content: '';
      background-image: url('/_public/img/landing/axol-face-front.svg');
      background-size: contain;
      inline-size: 12rem;
      aspect-ratio: 215 / 117;
      position: absolute;
      margin: auto;
      inset-block: 0;
      inset-inline-start: 0;
      inset-inline-end: initial;
      translate: -56% 0;
      rotate: -20deg;
      z-index: -1;
    }

    :host:nth-of-type(odd) .show-axol:after {
      inset-inline-start: initial;
      inset-inline-end: 0;
      translate: 56% 0;
      rotate: 20deg;
    }
  }
</style>
  `

  return html`
    <style>
      :host {
        display: block;
        max-inline-size: 52rem;
        margin-inline: auto;
        --radius: 0.5em;
      }

      article {
        background-color: var(--smoke);
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
    ${contributor ? '' : axolStyles}
    <article
      class="mbs0 mbe2 p0 p2-lg relative ${contributor ? '' : 'show-axol'}">
      <a href="${url}" target="_blank">
        <figure class="mbe1">
          <img src="${image}" alt="" />
        </figure>
        <h1 class="font-semibold mbe0 text1 text2-lg">${title}</h1>
        <p class="leading3 text1-lg">
          <slot></slot>
        </p>
      </a>
      ${contributorMarkup}
    </article>
  `
}
