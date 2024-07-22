export default function BlogImage ({ html, state }) {
  const { attrs } = state
  const { src, alt } = attrs

  return html`
    <enhance-image
      src="${src}"
      alt="${alt}"
      loading="lazy"
      sizes="(min-width: 56em) 280px, 100vw"
    ></enhance-image>
  `
}
