function FurtherReading(links) {
  const items = links.map((link) => {
    let item
    for (const label in link) {
      item = `<li class="mb-4"><a href="${link[label]}" target="_blank">${label}</a></li>`
    }
    return item
  })

  return /* html */ `
    <h3 class="mb-2 font-semibold">Further Reading</h3>
    <ul class="mb2 ml-2 list-none leading2">
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
      h3 {
        color: var(--purple-white);
      }
      ul {
        list-style: none;
      }
      li > ul {
        list-style: none;
        padding-left: 0.7rem;
      }
      li a {
        color: var(--rift-princess);
      }

      nav.toc ul li {
        margin-bottom: 0.7rem;
      }
      nav.toc li > ul {
        margin-top: 0.7rem;
      }
    </style>

    <aside>
      <slot name="toc"></slot>

      ${doc?.frontmatter?.links?.length > 0
        ? FurtherReading(doc.frontmatter.links)
        : ''}

      <h3 class="mb-2 font-medium">Contribute</h3>
      <ul role="list" class="mb2 ml-2 list-none leading2">
        <li>Edit this page</li>
      </ul>

      <h3 class="mb-2 font-medium">Community</h3>
      <ul role="list" class="mb2 ml-2 list-none leading2">
        <li class="mb-4">
          <a href="https://github.com/orgs/enhance-dev" target="_blank"
            >GitHub</a
          >
        </li>
        <li class="mb-4">Blog</li>
        <li class="mb-4">
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
