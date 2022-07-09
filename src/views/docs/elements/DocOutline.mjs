function FurtherReading(links) {
  const items = links.map((link) => {
    let item
    for (const label in link) {
      item = `<li><a href="${link[label]}" target="_blank">${label}</a></li>`
    }
    return item
  })

  return /* html */ `
    <strong>Further Reading</strong>
    <ul class="list-none">
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
      #outline {
        display: none;
      }
      #outline > * {
        margin-bottom: 2rem;
      }
      @media (min-width: 72rem) {
        #outline {
          display: block;
        }
      }
    </style>

    <aside id="outline">
      <strong>On this page</strong>
      <slot name="toc"></slot>

      ${doc?.frontmatter?.links?.length > 0
        ? FurtherReading(doc.frontmatter.links)
        : ''}

      <strong>Contribute</strong>
      <ul class="list-none">
        <li>Edit this page</li>
      </ul>

      <strong>Community</strong>
      <ul class="list-none">
        <li>Blog</li>
        <li>Discord</li>
      </ul>
    </aside>
  `
}
