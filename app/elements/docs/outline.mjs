function FurtherReading(links) {
  const items = links.map((link) => {
    let item
    for (const label in link) {
      item = `<li class="mbe-4"><a href="${link[label]}" target="_blank">${label}</a></li>`
    }
    return item
  })

  return /* html */ `
    <h3 class="mbe-2 font-semibold">Further Reading</h3>
    <ul class="mbe2 mis-2 list-none leading2">
      ${items.join('')}
    </ul>
  `
}

function CommunityLinks(links) {
  const items = links.map((link) => {
    return `<li class="mbe-4"><a href="${link.url}" target="_blank" ${
      link.rel ? `rel=${link.rel}` : ''
    }>${link.label}</a></li>`
  })

  return /* html */ `
    <h3 class="mbe-2 font-semibold">Community</h3>
    <ul class="mbe2 mis-2 list-none leading2">
      ${items.join('')}
    </ul>
  `
}

export default function DocOutline({ html, state }) {
  const {
    store: { doc, otherLinks, gitHubLink },
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

      <!-- "Further Reading" -->
      ${doc?.frontmatter?.links?.length > 0
        ? FurtherReading(doc.frontmatter.links)
        : ''}

      <!-- "Edit this page" -->
      ${gitHubLink
        ? /* html  */ `
        <p class="mbe2">
          <a href="${gitHubLink}" target="_blank">Edit this page</a>
        </p>
          `
        : ''}

      <!-- "Community" -->
      ${otherLinks?.community?.items?.length > 0
        ? CommunityLinks(otherLinks.community.items)
        : ''}
    </aside>
  `
}
