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
          `<li class="inline-block whitespace-no-wrap pl1 pr1 pb-4 ml-4 mr-4 ${
            tab.active ? 'active' : ''
          }">
            <a class="text-center font-semibold" href="${tab.path}/">${
            tab.label
          }</a>
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

      @media only screen and (min-width: 50em) {
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
      #logo h1 a:hover {
        transform: rotate(5deg);
      }
      #logo a.enhance-link {
        color: var(--white);
      }
      #logo a.docs-link {
        color: #f57aff;
      }
      #main-nav ul li {
        border-bottom: 2px solid var(--color-charlie-lightest);
      }
      #main-nav ul li a {
        color: var(--color-charlie);
      }
      #main-nav ul li.active {
        border-bottom: 2px solid var(--color-charlie-lighter);
      }
    </style>

    <input
      id="burger-control"
      type="checkbox"
      name="open-burger"
      aria-label="Open navigation" />

    <div id="logo" class="flex gap-1 justify-start items-center">
      <img src="${arc.static('img/svg/chibi.svg')}" />
      <h1 class="text1 font-bold">
        <a href="/" class="enhance-link inline-block ">Enhance</a>
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

    <nav id="main-nav" class="flex gap-1 items-center ml1">
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
