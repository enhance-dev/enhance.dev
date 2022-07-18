export default function DocsHeader({ html, state }) {
  const { store } = state
  const { sidebarData } = store

  const navItems = []

  if (sidebarData?.length > 0)
    sidebarData
      .filter((i) => i.type === 'tab')
      .forEach((tab) => {
        navItems.push(
          `<li ${tab.active ? 'class="active"' : ''}>
            <a href="${tab.path}/">${tab.label}</a>
          </li>`
        )
      })

  return html`
    <style>
      :host header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      :host h1 a {
        display: inline-block;
        transition: transform ease 0.2s;
      }
      :host h1 a:hover {
        transform: rotate(5deg);
      }
      :host h1 a.enhance-link {
        color: DarkOrchid;
      }
      :host h1 a.docs-link {
        color: DarkSalmon;
      }

      :host nav ul {
        list-style: none;
      }
      :host nav ul li {
        display: inline-block;
        cursor: pointer;
        text-align: center;
        font-weight: bold;
        font-size: 1.15rem;
        padding: 0 1rem 0.25rem;
        margin-bottom: 0.25rem;
        border-bottom: 2px solid var(--color-charlie-lightest);
      }
      :host nav ul li a {
        color: var(--color-charlie);
      }
      :host nav ul li.active {
        border-bottom: 2px solid var(--color-charlie-lighter);
      }
    </style>

    <header>
      <h1>
        ✨
        <a href="/" class="enhance-link">Enhance</a>
        <a href="/docs/" class="docs-link">Docs</a>
      </h1>
      <nav>
        <ul>
          ${navItems.join('\n')}
        </ul>
      </nav>
      <input type="search" placeholder="Search..." />
    </header>
  `
}
