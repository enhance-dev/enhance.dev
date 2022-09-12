function readNext(nextLink) {
  if (nextLink && nextLink.label && nextLink.path) {
    return /* html */ `
      <doc-callout level="none" mark="${nextLink.mark || 'none'}">
        <a class="font-medium" href="${nextLink.path}">${nextLink.label} →</a>
        ${
          nextLink.description
            ? `<p class="mt-4 leading2">${nextLink.description}</p>`
            : ''
        }
      </doc-callout>
    `
  } else {
    return ''
  }
}

function communityResources(communityLinks) {
  if (communityLinks?.length > 0) {
    const links = communityLinks
      .map((link) => {
        const url = link?.url || ''
        const label = link?.label || ''
        const description = link?.description || ''

        return /* html */ `
          <dt>
            <a href="${url}" target="_blank">${label}</a>
          </dt>
          <dd class="mb-4">
            ${description}
          </dd>
        `
      })
      .join('')

    return /* html */ `
      <footer class="p0">
        <h3 class="mb-2">Community Resources</h3>
        <dl class="ml-2 list-none leading2">${links}</dl>
      </footer>
    `
  } else {
    return ''
  }
}

export default function Footer({ html, state }) {
  const {
    store: { doc, otherLinks },
  } = state

  return html`
    <style>
      :host {
        display: block;
      }

      :host > footer {
        color: var(--inky-lily);
        background-color: var(--cloud-ateneo);
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
          rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
      }
    </style>

    ${readNext(doc.frontmatter?.['read-next'])}

    <hr class="block mt3 mb3 border1" />

    <docs-pager></docs-pager>

    ${communityResources(otherLinks?.community?.items)}
  `
}
