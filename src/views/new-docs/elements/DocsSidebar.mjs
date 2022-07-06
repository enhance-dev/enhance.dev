import sidebarData from '../sidebarData.mjs'

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

export default function DocsSidebar({ html, state }) {
  const { attrs } = state
  const { 'docs-route': docsRoute, 'active-path': activePath } = attrs
  let tabNav = '<div class="tab-labels">'
  let tabs = '<div class="tabs">'

  const testForActive = (i) => i.active || i.items?.some(testForActive)

  if (sidebarData?.length > 0)
    parseItems(sidebarData, docsRoute, activePath)
      .filter((i) => i.type === 'tab')
      .forEach((tab, index) => {
        tab.active =
          (index === 0 && `/${docsRoute}/` === activePath) ||
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

  return html`
    <style>
      #sidebar .tab-labels {
        display: flex;
        justify-content: space-around;
        margin-bottom: 1rem;
      }
      #sidebar .tab-label {
        flex-basis: 50%;
        text-align: center;
        line-height: 1.25rem;
        font-weight: bold;
        font-size: 1.15rem;
        padding: 0 0 0.5rem 0.5rem;
        margin-bottom: 0.5rem;
        border-bottom: 2px solid SeaShell;
        color: Crimson;
      }
      #sidebar .tab-label.active {
        border-bottom: 2px solid LightSalmon;
      }
      #sidebar .tab {
        opacity: 0.5;
      }
      #sidebar .tab.active {
        opacity: 1;
      }
      #sidebar li a {
        padding: 0.2rem 0;
        display: block;
        padding-left: 0.3rem;
      }
      #sidebar li a:hover {
        border-left: 2px solid LightSteelBlue;
        margin-left: -2px;
        background-color: Azure;
        text-decoration: none;
      }
      #sidebar li a.active {
        border-left: 2px solid CornflowerBlue;
        margin-left: -2px;
        background-color: AliceBlue;
      }
      #sidebar .category-label {
        margin-top: 1rem;
      }
      #sidebar .category-label {
        line-height: 1.2rem;
        text-transform: uppercase;
        font-weight: bold;
        border-bottom: 1px solid WhiteSmoke;
      }
      #sidebar .description {
        line-height: 1rem;
        font-size: 0.75rem;
        color: DarkGray;
      }
    </style>

    <aside id="sidebar">${tabNav} ${tabs}</aside>

    <script type="module">
      class DocsSidebar extends HTMLElement {
        constructor() {
          super()
        }
      }

      customElements.define('docs-sidebar', DocsSidebar)
    </script>
  `
}
