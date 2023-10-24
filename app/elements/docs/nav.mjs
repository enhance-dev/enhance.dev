function List(items, classes = []) {
  return `
<ul role="list" class="${['list-none', ...classes].join(' ')}">
  ${items
    .map((item) => {
      return `
<li class="${item.hasChildren ? 'hasChildren' : ''}">
  ${item.type === 'doc' ? Doc(item) : ''}
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
<a href="${item.path}" class="block pb-4 ${item.active ? 'active' : ''}">
  <div class="${item.type}-label">${item.label}</div>
  ${Description(item, ['mbs-4'])}
</a>
    `.trim()
}

function Category(item) {
  return `
<div class="mbs3">
  <div class="category-label font-medium text-1 tracking2 mbe-4 uppercase">${
    item.label
  }</div>
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
  const { navData } = store

  return html`
    <style>
      :host {
        display: block;
        padding-inline: var(--space--2);
      }

      li a {
        margin-inline: calc(var(--space--4) * -1 - 4px);
        padding-inline: var(--space--4);
        border-inline-start: 4px solid transparent;
        color: var(--rift-princess);
      }

      li a:hover,
      li a.active {
        background-color: var(--cloud-ateneo);
        border-color: var(--purple-princess);
      }

      .category-label {
        color: var(--purple-white);
      }

      .description {
        color: var(--inky-lily);
      }

      .hasChildren ul {
        padding-inline-start: var(--space--2);
      }
    </style>

    <nav>${List(navData)}</nav>
  `
}
