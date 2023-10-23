export default function DocsPager({ html, state }) {
  const {
    store: { navData = [], doc },
  } = state

  if (doc?.frontmatter?.['docs-pager'] === false) {
    return ''
  }

  function flattenItems(items) {
    return items
      ? items.reduce(
          (flattened, item) => [
            ...flattened,
            item,
            ...flattenItems(item.items),
          ],
          []
        )
      : []
  }

  const flattenedItems = flattenItems(navData)
  const activeIndex = flattenedItems.findIndex((i) => i.active)
  let prevDoc
  let nextDoc

  if (activeIndex >= 0) {
    for (let i = activeIndex - 1; i > 0; i--) {
      const item = flattenedItems[i]
      if (item.type === 'doc') {
        prevDoc = item
        break
      }
    }

    for (let i = activeIndex + 1; i < flattenedItems.length; i++) {
      const item = flattenedItems[i]
      if (item.type === 'doc') {
        nextDoc = item
        break
      }
    }
  }

  return prevDoc || nextDoc
    ? html`
        <nav class="flex justify-content-around mbe2">
          ${prevDoc
            ? `<a href="${prevDoc.path}">← Prev: ${prevDoc.label}</a>`
            : ''}
          ${nextDoc
            ? `<a href="${nextDoc.path}">Next: ${nextDoc.label} →</a>`
            : ''}
        </nav>
      `
    : ''
}
