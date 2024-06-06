export default function ProductNav ({ html }) {
  return html`
    <masthead-slice>
      <h2 class="semibold">
        <a href="/">Home</a>
      </h2>
    </masthead-slice>
    <masthead-slice>
      <h2 class="semibold">
        <a href="/why-enhance">Why Enhance?</a>
      </h2>
    </masthead-slice>
    <masthead-slice>
      <h2 class="semibold">
        <a href="/wasm">Enhance WASM</a>
      </h2>
    </masthead-slice>
    <masthead-slice>
      <h2 class="semibold">
        <a href="/docs">Docs</a>
      </h2>
      <docs-nav searchid="search-mobile"></docs-nav>
    </masthead-slice>
  `
}
