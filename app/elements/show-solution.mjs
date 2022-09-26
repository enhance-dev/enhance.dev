export default function ({ html, state = {} }) {
  const location = state.store.location
  return html` <a href="${location}?solution">Show Solution</a>`
}
