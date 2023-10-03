import arc from '@architect/functions'

export default function DocsHeader({ html, state }) {
  const { store } = state
  const { searchTerm, sidebarData } = store

  // check if today is Nov 30: Blue Beanie Day
  const today = new Date()
  const isBlueBeanieDay = today.getMonth() === 11 - 1 && today.getDate() === 30

  const navItems = []
  if (sidebarData?.length > 0) {
    sidebarData
      .filter((i) => i.type === 'tab')
      .forEach((tab) => {
        navItems.push(
          `<li class="inline-block whitespace-no-wrap mi3 ${
            tab.activeTab ? 'active font-semibold' : ''
          }">
            <a class="text-center" href="${tab.path}/">${tab.label}</a>
          </li>`
        )
      })
  }

  return html`
    <style>
      /* Layout */
      /* mobile first */

      :host {
        display: grid;
        align-items: center;
        grid-template-columns: 1fr;
        grid-template-areas:
          'logo'
          'menu';
        box-shadow: 0px 1px 2px var(--smoke-indigo);
        position: relative;
        z-index: 3;
      }

      #logo {
        grid-area: logo;
        display: flex;
      }

      #menu {
        grid-area: menu;
        display: flex;
      }

      #docs-nav {
        grid-area: docs-nav;
        display: block;
        position: fixed;
        background: var(--white-denim);
        top: 130px;
        left: -100vw;
        bottom: 0;
        overflow-y: auto;
        width: 100vw;
        -webkit-transition: left 0.2s ease;
        transition: left 0.2s ease;
      }

      #burger-control {
        display: block;
        position: absolute;
        opacity: 0;
        height: 0.0001px;
        width: 0.0001px;
      }
      #burger-control:focus-visible ~ #logo > #hamburger {
        outline: 1px solid white;
        border: 2px solid var(--lt-blue);
        border-radius: 3px;
      }
      #burger-control:checked ~ #main-nav {
        display: block;
      }
      #burger-control:checked ~ #docs-nav {
        display: block;
        left: 0vw;
      }
      #burger-control:checked ~ #menu {
        display: flex;
      }

      @media only screen and (min-width: 48em) {
        /* 2-col + */
        :host {
          grid-template-columns: 1fr 1fr;
          grid-template-areas: 'logo menu';
        }
        #main-nav {
          display: flex;
        }

        #hamburger,
        #docs-nav {
          display: none !important; /* even when :checked */
        }

        #docs-nav {
          -webkit-transition: initial;
          transition: initial;
        }
      }
    </style>

    <style>
      /* Basic styles */

      .axol {
        margin-top: -0.65rem;
      }
      .axol-accessory {
        position: absolute;
      }
      .axol-accessory.bluebeanie {
        left: 12px;
        top: -3px;
        width: 38px;
      }

      #logo h1 a {
        transition: transform ease 0.2s;
      }
      #logo a.enhance-link {
        color: var(--denim-white);
      }
      #logo a.enhance-link:hover {
        transform: rotate(-3deg);
      }
      #logo a.docs-link {
        color: var(--purple-princess);
      }
    </style>

    <input
      id="burger-control"
      class="absolute opacity-0 z-1"
      type="checkbox"
      name="open-burger"
      autocomplete="off"
      aria-label="Open navigation" />
    <div
      id="logo"
      class="flex gap-1 justify-content-between align-items-center">
      <div class="flex align-items-center">
        <div class="relative axol-and-accessories">
          <img
            class="axol"
            src="${arc.static('img/svg/enhance-axol.svg')}"
            alt="Enhance mascot: Axol" />
          ${isBlueBeanieDay &&
          `<img
              class="axol-accessory bluebeanie"
              src="${arc.static('img/bluebeanie.png')}"
              alt="Axol's blue beanie" />`}
        </div>
        <h1 class="text1 mis-1">
          <a href="/" class="enhance-link inline-block font-semibold"
            >Enhance</a
          >
          <a href="/docs/" class="docs-link inline-block">Docs</a>
        </h1>
      </div>
      <label
        id="hamburger"
        class="cursor-pointer relative"
        for="burger-control"
        title="Open navigation">
        <svg height="24" width="24">
          <use xlink:href="#svg-hamburger"></use>
        </svg>
      </label>
    </div>

    <nav id="menu" class="flex gap-1 justify-content-end align-items-center">
      <!-- GitHub
      <svg height="24" width="24">
        <use xlink:href="#svg-github"></use>
      </svg> -->
      <!-- Discord
      <svg height="24" width="24">
        <use xlink:href="#svg-discord"></use>
      </svg> -->
      <docs-theme-toggle></docs-theme-toggle>
      <div id="search" class="flex-grow flex-grow-0-lg"></div>
    </nav>

    <nav id="docs-nav" class="z1">
      <docs-nav></docs-nav>
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
