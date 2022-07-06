export default function DocsHeader({ html }) {
  return html`
    <style>
      header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      header h1 a {
        display: inline-block;
        transition: transform ease 0.2s;
      }
      header h1 a:hover {
        transform: rotate(5deg);
      }
      header h1 a.enhance-link {
        color: DarkOrchid;
      }
      header h1 a.docs-link {
        color: DarkSalmon;
      }
    </style>

    <header>
      <nav>
        <h1>
          ✨
          <a href="/" class="enhance-link">Enhance</a>
          <a href="/docs/" class="docs-link">Docs</a>
        </h1>
      </nav>
      <input type="search" placeholder="Search..." />
    </header>
  `
}
