export default function Header({ html, state }) {
  const { store } = state
  const { path, searchTerm } = store

  // check if today is Nov 30: Blue Beanie Day
  const today = new Date()
  const isBlueBeanieDay = today.getMonth() === 11 - 1 && today.getDate() === 30

  function createLink(route, label) {
    const isActive = path.includes(route)
    return isActive
      ? `<span class="font-medium">${label}</span>`
      : `<a href="${route}" class="global-nav-link">${label}</a>`
  }

  const globalNavItems = `
    <ul class="list-none flex flex-col flex-row-lg gap-1 gap1-xl p-2 p-none-lg">
      <li>${createLink('/docs', 'Docs')}</li>
      <li>${createLink('/showcase', 'Showcase')}</li>
      <li>${createLink('/why-enhance', 'Why Enhance?')}</li>
    </ul>
  `

  const isDocs = path.includes('docs')

  const darkModeExtras = `
    --docsearch-footer-background: var(--smoke-halite);
    --docsearch-hit-background: var(--white-denim);
    --docsearch-hit-color: var(--rift);
    --docsearch-modal-background: var(--smoke-halite);
    --docsearch-searchbox-background: hsla(0deg 0% 0% / 0.5);
    --docsearch-searchbox-focus-background: var(--white-denim);
    --docsearch-text-color: var(--rift-white);
    --mobile-nav-background: hsla(0deg 0% 0% / 0.33);
  `

  const docsExtras = isDocs
    ? `<style scope="global">
      :root[data-force-theme='dark'] {${darkModeExtras}}
      @media (prefers-color-scheme: dark) {:root {${darkModeExtras}}}
    </style>`
    : ''

  return html`
    <style scope="global">
      /* Docsearch overrides */
      :root {
        --docsearch-footer-background: var(--smoke);
        --docsearch-footer-shadow: none;
        --docsearch-highlight-color: var(--purple);
        --docsearch-hit-background: var(--white);
        --docsearch-hit-color: var(--rift);
        --docsearch-hit-shadow: 0 1px 2px hsla(0deg 0% 0% / 0.125);
        --docsearch-modal-background: var(--smoke);
        --docsearch-modal-shadow: 0 2px 6px hsla(0deg 0% 0% / 0.5);
        --docsearch-searchbox-background: hsla(0deg 0% 0% / 0.075);
        --docsearch-searchbox-focus-background: var(--white);
        --docsearch-searchbox-shadow: inset 0 0 0 2px var(--purple);
        --docsearch-text-color: var(--rift);
        --mobile-nav-background: hsla(0deg 0% 100% / 0.85);
      }

      .DocSearch-Button {
        font-weight: 400;
        margin-inline-start: var(--space--1);
      }

      .DocSearch-Button:focus {
        box-shadow: none;
        outline: 2px auto Highlight;
        outline: 2px auto -webkit-focus-ring-color;
      }

      /* Docsearch media query */
      @media screen and (max-width: 768px) {
        .DocSearch-Button {
          background: transparent;
        }
      }

      .DocSearch-Button-Keys {
        min-inline-size: calc(32px + 0.8em);
      }

      .DocSearch-Button-Key {
        font-weight: 400;
        font-size: 0.75em;
        inline-size: 16px;
      }

      .DocSearch-Container {
        backdrop-filter: blur(2px) contrast(50%);
        font-size: var(--text-0);
      }

      .DocSearch-Hit-content-wrapper {
        font-weight: 400;
      }

      .DocSearch-Hit[aria-selected='true'] a {
        background: var(--dark-purple);
      }

      .DocSearch-Hits mark {
        font-weight: 600;
      }
    </style>

    ${docsExtras}

    <style>
      :host {
        position: relative;
        z-index: 3;
      }

      header {
        box-shadow: ${isDocs ? '0px 1px 2px var(--smoke-indigo)' : 'none'};
        block-size: var(--nav-height);
      }

      .offset {
        translate: 0 -6.25%;
      }

      #logo-axol {
        inline-size: 3rem;
        aspect-ratio: 56 / 51;
      }

      #beanie {
        inline-size: 2.5rem;
        aspect-ratio: 100 / 62;
        inset-block-start: 0.25rem;
        inset-inline-start: 0.66rem;
      }

      figure a {
        color: unset;
      }

      #navToggle {
        border-radius: 4px;
        cursor: pointer;
      }

      #navToggle:hover {
        background: hsla(0deg 0% 0% / 0.125);
      }

      #navToggleInput {
        appearance: none;
      }

      /* Show outline on entire #navToggle when its (invisible) input is focused */
      #navToggle:has(#navToggleInput:focus-visible) {
        outline: 2px auto Highlight;
        outline: 2px auto -webkit-focus-ring-color;
        outline-offset: 2px;
      }

      #mobileNav {
        background: var(--mobile-nav-background);
        backdrop-filter: blur(8px);
        box-shadow: 0 2px 6px hsla(0deg 0% 0% / 0.25);
        inset-block-start: var(--nav-height);
        display: none;
      }

      @media screen and (width < 48em) {
        :host:has(#navToggleInput:checked) #mobileNav {
          display: block;
        }
      }

      @media screen and (min-width: 48em) {
        #header-logo {
          inline-size: var(--docs-nav-width);
          /* Negative margin accounts for padding on header */
          margin-inline-end: calc(var(--space--2) * -1);
        }
      }

      .global-nav-link {
        color: ${isDocs ? 'var(--purple-princess)' : 'var(--purple)'};
        transition: 0.15s color ease;
      }

      .global-nav-link:hover {
        color: ${isDocs ? 'var(--denim-white)' : 'var(--denim)'};
      }
    </style>
    <header class="relative z1 flex align-items-center ${isDocs ? 'p-2' : ''}">
      <figure id="header-logo">
        <a href="/" class="flex align-items-center gap-1">
          <div class="relative offset">
            <img
              id="logo-axol"
              src="/_public/img/svg/enhance-axol.svg"
              alt="" />
            ${isBlueBeanieDay &&
            `<img
                id="beanie"
                class="absolute"
                src="/_public/img/bluebeanie.png"
                alt="Axol's blue beanie" />`}
          </div>

          <h1 class="font-medium text0 text1-lg">Enhance</h1>
        </a>
      </figure>

      <nav class="hidden block-lg text0">${globalNavItems}</nav>

      <div class="mis-auto flex align-items-center text0">
        ${isDocs
          ? '<docs-theme-toggle class="hidden block-lg"></docs-theme-toggle >'
          : ''}
        <article id="search"></article>
        <label
          id="navToggle"
          class="hidden-lg mis-auto flex align-items-center gap-5 pb-3 pi-2">
          <svg height="24" width="24">
            <use xlink:href="#svg-hamburger"></use>
          </svg>
          Menu
          <input
            id="navToggleInput"
            type="checkbox"
            aria-label="Toggle site navigation" />
        </label>
      </div>
    </header>

    <!-- mobile nav -->
    <nav
      id="mobileNav"
      class="hidden-lg text0 fixed inset-i-0 pb0 overflow-auto ${isDocs
        ? 'inset-be-0'
        : ''}">
      ${isDocs
        ? '<docs-theme-toggle class="block mbe-2"></docs-theme-toggle>'
        : ''}
      ${globalNavItems} ${path.includes('docs') ? `<docs-nav></docs-nav >` : ''}
    </nav>

    <script type="module">
      import docsearch from '/_static/bundles/docsearch-js.mjs'

      docsearch({
        appId: '1QR8CXPN0C',
        apiKey: '781b7bc665ad54b682ab4a31a5ccb55e',
        indexName: 'enhance',
        container: '#search',
        initialQuery: ${searchTerm ? `'${searchTerm}'` : 'null'},
      })
    </script>
  `
}
