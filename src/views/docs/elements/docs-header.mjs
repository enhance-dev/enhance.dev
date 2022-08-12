import arc from '@architect/functions'

export default function DocsHeader({ html, state }) {
  const { store } = state
  const { sidebarData } = store

  const navItems = []
  if (sidebarData?.length > 0) {
    sidebarData
      .filter((i) => i.type === 'tab')
      .forEach((tab) => {
        navItems.push(
          `<li class="inline-block whitespace-no-wrap ml3 mr3 ${
            tab.active ? 'active font-semibold' : ''
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
        top: 147px;
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
      }
      #burger-control:focus-visible ~ #logo > #hamburger {
        /*TODO: fix the styles here to match focus*/
        outline: 2px solid white;
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
      }
    </style>

    <style>
      /* Basic styles */
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
      class="absolute block opacity-0 z-1"
      type="checkbox"
      name="open-burger"
      aria-label="Open navigation" />
    <div id="logo" class="flex gap-1 justify-between items-center">
      <div class="flex flex-row items-center">
        <img src="${arc.static('img/svg/chibi.svg')}" />
        <h1 class="text1 ml1">
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
        <svg
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </label>
    </div>

    <nav id="menu" class="flex gap-1 justify-end ">
      <docs-theme-toggle></docs-theme-toggle>
      <!-- GitHub -->
      <!-- Discord -->
      <div id="search" class="flex-grow flex-grow-0-lg"></div>
    </nav>

    <nav id="docs-nav">
      <docs-nav></docs-nav>
    </nav>

    <script src="https://cdn.jsdelivr.net/npm/@docsearch/js@3"></script>
    <script type="text/javascript">
      docsearch({
        appId: '1QR8CXPN0C',
        apiKey: '781b7bc665ad54b682ab4a31a5ccb55e',
        indexName: 'enhance',
        container: '#search',
        debug: true, // Set debug to true if you want to inspect the modal
      })
    </script>
  `
}
