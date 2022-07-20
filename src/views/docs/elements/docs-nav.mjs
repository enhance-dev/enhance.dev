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

export default function DocsNav({ html, state }) {
  const { store } = state
  const { sidebarData } = store

  let tabs = ''

  if (sidebarData?.length > 0)
    sidebarData
      .filter((i) => i.type === 'tab')
      .forEach((tab) => {
        tabs += `
          <div
            class="tab-content ${tab.active ? 'active' : ''}"
            label="${tab.slug}"
          >
            ${List(tab.items)}
          </div>`
      })

  return html`
    <style>
      .tab-content {
        display: none;
      }
      .tab-content.active {
        display: block;
      }
      li a {
        padding: 0.2rem 0;
        display: block;
        padding-left: 0.3rem;
      }
      li a:hover {
        border-left: 2px solid var(--color-bravo-lighter);
        margin-left: -2px;
        background-color: var(--color-bravo-lightest);
        text-decoration: none;
      }
      li a.active {
        border-left: 2px solid var(--color-bravo-light);
        margin-left: -2px;
        background-color: var(--color-bravo-lightest);
      }
      .category-label {
        margin-top: 1rem;
      }
      .category-label {
        line-height: 1.2rem;
        text-transform: uppercase;
        font-weight: bold;
        border-bottom: 1px solid var(--color-alpha-lightest);
      }
      .description {
        line-height: 1rem;
        font-size: 0.75rem;
        color: var(--color-alpha-light);
      }
    </style>

    ${tabs}
  `
}
