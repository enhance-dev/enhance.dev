export default function SeriesEntry ({ html, state }) {
  const { attrs } = state
  const { href, title } = attrs

  const isActive = Object.keys(attrs).includes('active')

  const postMarkup = isActive
    ? `${title}`
    : `<a href="${href}" class="underline">${title}</a>`

  return html`
    <li class="${isActive ? 'font-semibold' : ''} pb-4">${postMarkup}</li>
  `
}
