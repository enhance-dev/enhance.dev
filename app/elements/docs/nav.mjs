function List(items, classes = []) {
  return `
<ul role="list" class="${['list-none pl-1', ...classes].join(' ')}">
  ${items
    .map((item) => {
      return `
<li class="">
  ${item.type === 'doc' ? Doc(item) : ''}
  ${item.type === 'link' ? Link(item) : ''}
  ${item.type === 'category' ? Category(item) : ''}
  ${item.items?.length > 0 && item.type !== 'category' ? List(item.items) : ''}
</li>
        `.trim()
    })
    .join('\n')}
</ul>
    `.trim()
}

function Doc(item) {
  return `
<a href="${item.path}" class="p-4 block${item.active ? ' active' : ''}">
  <div class="${item.type}-label">${item.label}</div>
  ${Description(item, ['mt-4'])}
</a>
    `.trim()
}

function Link(item) {
  return `
<a href="${item.path}" class="p-4 mbe0 block${item.active ? ' active' : ''}">
  <div class="${item.type}-label">${item.label}</div>
  ${Description(item, ['mt-4'])}
</a>
    `.trim()
}

function Category(item) {
  return `
<div class="mt3">
  <div class="category-label font-medium mb-4 uppercase">${item.label}</div>
  ${Description(item)}
</div>
${item.items?.length > 0 ? List(item.items) : ''}
    `.trim()
}

function Description(item, classes = []) {
  return item.description
    ? `
<div class="${['description text-1', ...classes].join(' ')}">
  ${item.description}
</div>
      `.trim()
    : ''
}

export default function DocsNav({ html, state }) {
  const { store } = state
  const { sidebarData } = store

  const tabs = sidebarData.filter((i) => i.type === 'tab')
  const activeTab = tabs.find((tab) => tab.activeTab) || tabs[0]

  return html`
    <style>
      li a {
        color: var(--rift-princess);
      }
      li a:hover {
        margin-left: -5px;
        border-left: 5px solid var(--purple-princess);
        background-color: var(--cloud-ateneo);
      }
      li a.active {
        margin-left: -5px;
        border-left: 5px solid var(--purple-princess);
        background-color: var(--cloud-ateneo);
      }
      .category-label {
        color: var(--purple-white);
      }
      .description {
        color: var(--inky-lily);
      }
    </style>

    <nav>${List(activeTab.items)}</nav>
  `
}
