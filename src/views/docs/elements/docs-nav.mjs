function List(items, classes = []) {
  return `
<ul role="list" class="${['list-none pl-1', ...classes].join(' ')}">
  ${items
    .map((item) => {
      return `
<li class="">
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
<a href="${item.path}" class="p-4 block${item.active ? ' active' : ''}">
  <div class="${item.type}-label">${item.label}</div>
  ${Description(item, ['mt-4'])}
</a>
    `.trim()
}

function Category(item) {
  return `
<div>
  <div class="category-label font-medium mb-2 uppercase">${item.label}</div>
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

  let tabs = ''

  if (sidebarData?.length > 0) {
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
  }

  return html`
    <style>
      .tab-content > ul > li {
        margin-bottom: 2rem;
      }
      li a {
        color: var(--color-text-alpha);
      }
      li a:hover {
        margin-left: -5px;
        border-left: 5px solid var(--color-accent-bravo);
        background-color: var(--color-bg-charlie);
      }
      li a.active {
        margin-left: -5px;
        border-left: 5px solid var(--color-accent-bravo);
        background-color: var(--color-bg-charlie);
      }
      .category-label {
        color: var(--color-accent-bravo);
      }
      .description {
        color: var(--color-text-charlie);
      }
    </style>

    ${tabs}
  `
}
