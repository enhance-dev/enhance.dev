function Category(item) {
  return `
<div>
  <div class="category-label mt-1 mb-4 leading1 uppercase font-semibold">${
    item.label
  }</div>
  ${Description(item)}
</div>
${item.items?.length > 0 ? List(item.items) : ''}
  `.trim()
}

function List(items) {
  return `
<ul role="list" class="list-none pl-1">
  ${items
    .map((item) => {
      return `
<li class="mb-4">
  ${item.type === 'doc' || item.type === 'link' ? Link(item) : ''}
  ${item.type === 'category' ? Category(item) : ''}
  ${item.items?.length > 0 && item.type !== 'category' ? List(item.items) : ''}
</li>
      `.trim()
    })
    .join('\n')}
</ul>
  `.trim()
}

function Link(item) {
  return `
<a href="${item.path}" class="p-4 block ${item.active ? 'active' : ''}">
  <div class="${item.type}-label">${item.label}</div>
  ${Description(item)}
</a>
  `.trim()
}

function Description(item) {
  return item.description
    ? `
<div class="description leading-none text-1">
  ${item.description}
</div>
      `.trim()
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
  class="tab-content ${tab.active ? 'active' : 'hidden'}"
  label="${tab.slug}"
>
  ${List(tab.items)}
</div>
        `.trim()
      })

  return html`
    <style>
      li a:hover {
        border-left: 2px solid var(--color-bravo-lighter);
        margin-left: -2px;
        background-color: var(--color-bravo-lightest);
      }
      li a.active {
        border-left: 2px solid var(--color-bravo-light);
        margin-left: -2px;
        background-color: var(--color-bravo-lightest);
      }
      .category-label {
        border-bottom: 1px solid var(--color-alpha-lightest);
      }
      .description {
        color: var(--color-alpha-light);
      }
    </style>

    ${tabs}
  `
}
