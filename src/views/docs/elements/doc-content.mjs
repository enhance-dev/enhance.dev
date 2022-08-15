function CommunityLinks(links) {
  const items = links.map((link) => {
    return /* html */ `
<dt><a href="${link.url}" target="_blank">${link.label}</a></dt>
<dd class="mb-4">${link.description}</dd>
      `
  })

  return /* html */ `
<aside class="community-links">
  <h3 class="mb-2">Community Resources</h3>
  <dl class="ml-2 list-none leading2">
    ${items.join('')}
  </dl>
</aside>
    `
}

export default function DocContent({ html, state }) {
  const {
    store: { otherLinks },
  } = state

  return html`
    <style>
      :host {
        padding: 1rem;
      }
      :host > * {
        max-width: 52rem;
        margin: auto;
      }
      li {
        list-style-position: inside;
      }

      :host > ::slotted([slot]) > * {
        margin-bottom: 1rem;
        /* margin-x for everything except code blocks */
        /* margin: 0 5rem 1.25rem 5rem; */
      }

      h1 {
        font-size: 1.953rem;
        font-weight: 500;
      }

      h2 {
        font-size: 1.563rem;
        font-weight: 500;
      }

      h3 {
        font-size: 1.25rem;
        font-weight: 500;
      }

      h4 {
        font-size: 1rem;
      }

      strong {
        color: var(--black-white);
      }
      small {
        color: var(--inky-lily);
      }

      blockquote {
        padding: 0.8rem 0.6rem 0.6rem;
        background-color: var(--smoke-indigo);
        box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 1px 0px;
        border-radius: 0.333rem;
      }

      :not(pre) > code {
        padding: 0.1rem 0.2rem;
        line-height: 1rem;
        overflow-wrap: break-word;
        background-color: var(--smoke-denim4);
        font-family: Menlo, Monaco, Consolas, monospace;
        border-radius: 0.25rem;
      }

      blockquote :not(pre) > code {
        background-color: var(--smoke-denim4);
      }

      .community-links {
        opacity: 0.8; /* TODO: not this */
        width: 100%;
        /*margin: 5rem auto 0;*/
        padding: 1rem;
        background-color: var(--cloud-ateneo);
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
          rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
      }
    </style>

    <slot name="doc"></slot>

    ${otherLinks?.community?.items?.length > 0
      ? CommunityLinks(otherLinks.community.items)
      : ''}
  `
}
