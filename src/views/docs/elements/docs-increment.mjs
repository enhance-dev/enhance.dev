export default function Increment({ html, state }) {
  const { store } = state
  const sidebarData = store?.sidebarData || []
  // TODO: Items needs to be a recursive reduce that concatinates all sidebar items in the correct order
  const items = sidebarData.reduce(
    (p, c) => (c.items.length ? p.concat(c.items) : false),
    []
  )

  // TODO: find the active item out of the flattened items array.
  // TODO: previous is active index - 1
  const previous = '#'
  // TODO: next is active index + 1
  const next = '#'

  return html`
    <nav class="flex justify-between">
      <a href="${previous}">← Prev</a>
      <a href="${next}">Next →</a>
    </nav>
  `
}
