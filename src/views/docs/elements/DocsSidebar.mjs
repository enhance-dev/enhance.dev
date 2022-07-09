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

export default function DocsSidebar({ html, state }) {
  const { store } = state
  const { sidebarData } = store

  let tabLabels = ''
  let tabs = ''
  let tabStyles = []

  if (sidebarData?.length > 0)
    sidebarData
      .filter((i) => i.type === 'tab')
      .forEach((tab) => {
        tabLabels += `
          <input
            type="radio"
            name="tabs"
            id="tab-control-${tab.slug}"
            ${tab.active ? 'checked' : ''}
          >
          <label for="tab-control-${tab.slug}">${tab.label}</label>`

        tabs += `
          <div class="tab-content" label="${tab.slug}">
            ${List(tab.items)}
          </div>`

        // This is probably temporary, requires inputs to be sibling of tab-content
        tabStyles.push(
          `#tab-control-${tab.slug}:checked ~ .tab-content[label='${tab.slug}']`
        )
      })

  return html`
    <style>
      .tab-content {
        display: none;
      }
      ${tabStyles.join(', ')} {
        display: block;
      }
      #sidebar input[type='radio'] + label {
        display: inline-block;
        cursor: pointer;
        text-align: center;
        line-height: 1.25rem;
        font-weight: bold;
        font-size: 1.15rem;
        padding: 0 1rem 0.5rem;
        margin-bottom: 0.25rem;
        border-bottom: 2px solid SeaShell;
        color: Crimson;
      }
      #sidebar input[type='radio'] {
        display: none;
      }
      #sidebar input:checked + label {
        border-bottom: 2px solid LightSalmon;
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

    <aside id="sidebar">${tabLabels} ${tabs}</aside>
  `
}
