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
          'secondary'
          'main'
          'docs-nav';
      }

      #logo {
        grid-area: logo;
        display: flex;
      }

      #main-nav {
        grid-area: main;
        display: none;
      }

      #secondary-nav {
        grid-area: secondary;
        display: none;
      }

      #docs-nav {
        grid-area: docs-nav;
        display: none;
      }

      #burger-control {
        display: none;
      }
      #burger-control:checked ~ #main-nav,
      #burger-control:checked ~ #docs-nav {
        display: block;
      }
      #burger-control:checked ~ #secondary-nav {
        display: flex;
      }

      @media only screen and (min-width: 48em) {
        /* 2-col + */
        :host {
          grid-template-columns: 16rem 4fr 1fr;
          grid-template-areas: 'logo main secondary';
        }
        #main-nav {
          display: flex;
        }
        #secondary-nav {
          display: flex;
        }
        #hamburger,
        #docs-nav {
          display: none !important; /* even when :checked */
        }
      }
    </style>

    <style>
      /* Basic syles */
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

      #main-nav ul li a {
        color: var(--rift-white);
      }
      #main-nav ul li:hover:after {
        content: '';
        display: block;
        margin: 0 auto;
        width: 1em;
        padding-top: 0.25em;
        border-bottom: 2px solid var(--purple-princess);
      }
      #main-nav ul li.active a {
        color: var(--purple-princess);
      }
      #main-nav ul li.active:after {
        content: '';
        display: block;
        margin: 0 auto;
        width: 1em;
        padding-top: 0.25em;
        border-bottom: 2px solid var(--purple-princess);
      }
    </style>

    <input
      id="burger-control"
      type="checkbox"
      name="open-burger"
      aria-label="Open navigation" />

    <div id="logo" class="flex gap-1 justify-start items-end">
      <img src="${arc.static('img/svg/chibi.svg')}" />
      <h1 class="text1 mb-2">
        <a href="/" class="enhance-link inline-block font-semibold">Enhance</a>
        <a href="/docs/" class="docs-link inline-block">Docs</a>
      </h1>
      <label
        id="hamburger"
        class="curosr-pointer"
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

    <nav id="main-nav" class="flex items-center">
      <ul class="flex-auto flex justify-center list-none">
        ${navItems.join('\n')}
      </ul>
    </nav>

    <nav id="secondary-nav" class="flex gap-1 justify-end">
      <div id="search" class=""></div>
      <!-- GitHub -->
      <!-- Discord -->
      <docs-theme-toggle></docs-theme-toggle>
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
