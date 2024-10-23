export default function BlogImage ({ html, state }) {
  const { attrs } = state
  const { src, alt, fetchpriority = 'auto', loading = 'eager' } = attrs

  return html`
    <enhance-image
      src="${src}"
      alt="${alt}"
      loading="${loading}"
      fetchpriority="${fetchpriority}"
      sizes="(min-width: 56em) 800px, 100vw"
    ></enhance-image>
  `
}
