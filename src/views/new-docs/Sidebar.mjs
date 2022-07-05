function Category(item) {
  return `
<div class="group-label">
  <div class="label ${item.type}-label">${item.label}</div>
  ${Description(item)}
</div>
${item.items?.length > 0 ? List(item.items) : ''}`
}

function List(items) {
  return `
<ul class="list-none">
  ${items
    .map((item) => {
      return `
        <li>
          ${item.type === 'doc' || item.type === 'link' ? Link(item) : ''}
          ${item.type === 'category' ? Category(item) : ''}
          ${
            item.items?.length > 0 && item.type !== 'category'
              ? List(item.items)
              : ''
          }
        </li>`
    })
    .join('\n')}
</ul>`
}

function Link(item) {
  return `
<a href="${item.path}" ${item.active ? 'class="active"' : ''}>
  <div class="label ${item.type}-label">${item.label}</div>
  ${Description(item)}
</a>`
}

function Description(item) {
  return item.description
    ? `<div class="description ${item.type}-description">
        ${item.description}
      </div>`
    : ''
}

function unslug(string) {
  return string
    .replace('-', ' ')
    .replace(/(^\w{1})|(\s+\w{1})/g, (l) => l.toUpperCase())
}

function parseItems(items, root, activePath) {
  return items.map((item) => {
    if (typeof item === 'string') {
      // create full item from shorthand item
      item = {
        type: 'doc',
        slug: item,
        path: `/${root}/${item}`,
        label: unslug(item)
      }
    } else {
      if (!item.type) item.type = 'doc'
      if (!item.path) item.path = `/${root}/${item.slug}`
      if (!item.label && item.slug) item.label = unslug(item.slug)
    }

    if (item.items)
      item.items = parseItems(item.items, `${root}/${item.slug}`, activePath)

    item.active = item.path === activePath

    return item
  })
}

export default function (items = [], mountedRoute = '/', activePath) {
  let tabNav = '<div class="tab-labels">'
  let tabs = '<div class="tabs">'

  const testForActive = (item) => item.active || item.items?.some(testForActive)

  parseItems(items, mountedRoute, activePath)
    .filter((i) => i.type === 'tab')
    .forEach((tab, index) => {
      tab.active =
        (index === 0 && `/${mountedRoute}/` === activePath) ||
        tab.items.some(testForActive)

      tabNav += `
<div class="tab-label ${tab.active ? 'active' : ''}">
  ${tab.label}
</div>`

      tabs += `
<div class="tab ${tab.active ? 'active' : ''}" label="${tab.slug}">
  ${List(tab.items)}
</div>`
    })

  tabNav += '</div>'
  tabs += '</div>'

  return tabNav + tabs
}
