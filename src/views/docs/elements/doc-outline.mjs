function FurtherReading(links) {
  const items = links.map((link) => {
    let item
    for (const label in link) {
      item = `<li><a href="${link[label]}" target="_blank">${label}</a></li>`
    }
    return item
  })

  return /* html */ `
    <h3 class="mb-2 font-semibold">Further Reading</h3>
    <ul class="mb2 list-none leading2">
      ${items.join('')}
    </ul>
  `
}

export default function DocOutline({ html, state }) {
  const {
    store: { doc },
  } = state

  return html`
    <style>
      ul {
        list-style: none;
      }
      li > ul {
        list-style: none;
        padding-left: 0.7rem;
      }
    </style>

    <aside>
      <h3 class="mb-2 font-semibold">On this page</h3>
      <slot name="toc"></slot>

      ${doc?.frontmatter?.links?.length > 0
        ? FurtherReading(doc.frontmatter.links)
        : ''}

      <h3 class="mb-2 font-semibold">Contribute</h3>
      <ul role="list" class="mb2 list-none leading2">
        <li>Edit this page</li>
      </ul>

      <h3 class="mb-2 font-semibold">Community</h3>
      <ul role="list" class="mb2 list-none leading2">
        <li>
          <a href="https://github.com/orgs/enhance-dev" target="_blank"
            >GitHub</a
          >
        </li>
        <li>Blog</li>
        <li>
          <a
            href="https://github.com/orgs/enhance-dev/discussions"
            target="_blank"
            >Discussions</a
          >
        </li>
        <li>Discord</li>
      </ul>
    </aside>
  `
}
