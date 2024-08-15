export default function SiteHeader ({ html, state }) {
  const { attrs } = state
  const { active = '' } = attrs

  const checkActive = href => active === href ? 'active' : ''

  const productPageLabels = {
    '/': 'Home',
    '/docs': 'Docs',
    '/cookbook': 'Cookbook',
    '/wasm': 'WASM',
    '/why-enhance': 'Why Enhance',
    '/blog': 'Blog',
  }

  return html`
    <style scope="global">
      :root {
        --nav-height: var(--space-6);
      }
    </style>

    <style>
      :host {
        --background: var(--site-header-background, var(--cloud));
        background-color: color-mix(in srgb, var(--background) 75%, transparent);
        backdrop-filter: blur(10px);
        display: block;
        padding-inline: var(--space-0);
        position: fixed;
        inset-block-start: 0;
        inset-inline: 0;
        z-index: 3;
      }

      nav {
        max-inline-size: var(--docs-max-width);
        block-size: var(--nav-height);
      }

      h1 {
        color: var(--rift);
      }

      axol-portrait {
        block-size: var(--space-4);
        aspect-ratio: 1 / 1;
        translate: 0 -3px;
      }

      a {
        color: var(--dark-purple);
        transition: color 0.125s linear;
      }

      a:hover {
        color: var(--magenta);
      }
    </style>

    <nav class="flex align-items-center gap0 mi-auto">
      <a href="/">
        <h1 class="text0 font-semibold flex gap0 align-items-center uppercase tracking2">
          <axol-portrait></axol-portrait>
          Enhance
        </h1>
      </a>

      <ul class="mis-auto flex gap2 align-items-center list-none font-semibold text-1 uppercase tracking2">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/docs">Docs</a>
        </li>
        <li>
          <a href="/cookbook">Cookbook</a>
        </li>
        <li>
          <a href="/blog">Blog</a>
        </li>
        <li>
          <a href="/showcase">Showcase</a>
        </li>
        <li>
          <a href="/wasm">Enhance WASM</a>
        </li>
        <li>
          <a href="/why-enhance">Why Enhance?</a>
        </li>
      </ul>
    </nav>
  `
}
