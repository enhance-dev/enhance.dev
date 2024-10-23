function createUrl (label, url) {
  if (label && url) {
    return `<a href="${url}" class="underline">${label}</a>`
  }
  else if (label) {
    return label
  }
  return null
}

function createCaption (photographer, site) {
  if (photographer && site) {
    return `<small>Photo by ${photographer} on ${site}</small>`
  }
  else if (photographer) {
    return `<small>Photo by ${photographer}</small>`
  }
  else if (site) {
    return `<small>Photo on ${site}</small>`
  }
  return null
}

export default function BlogHeroImage ({ html, state }) {
  const { store } = state
  const { frontmatter } = store.post
  const { image, image_alt, image_site, image_site_url, photographer, photographer_url } =
      frontmatter
  const photographerUrl = createUrl(photographer, photographer_url)
  const siteUrl = createUrl(image_site, image_site_url)
  const caption = createCaption(photographerUrl, siteUrl)

  if (!image || !image_alt) {
    return html``
  }
  return html`
    <style>
      :host {
        display: block;
      }

      img {
        width: 100%;
      }
    </style>
    <blog-image src="${image}" alt="${image_alt}" fetchpriority="high">
    </blog-image>
    ${caption}`
}
