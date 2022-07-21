export default function DocsHeader({ html, state }) {
  const { store } = state
  const { sidebarData } = store

  const navItems = []
  if (sidebarData?.length > 0) {
    sidebarData
      .filter((i) => i.type === 'tab')
      .forEach((tab) => {
        navItems.push(
          `<li ${tab.active ? 'class="active"' : ''}>
            <a href="${tab.path}/">${tab.label}</a>
          </li>`
        )
      })
  }

  return html`
    <style>
      /* Layout */

      :host {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-areas:
          'logo'
          'secondary-nav'
          'main-nav'
          'docs-nav';
      }

      /* mobile first */

      #logo {
        grid-area: logo;
        order: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      #main-nav {
        grid-area: main-nav;
        display: none;
      }

      #secondary-nav {
        grid-area: secondary-nav;
        display: none;
        justify-content: space-around;
        align-items: center;
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
          grid-template-columns: 16rem 1fr 10rem;
          grid-template-areas: 'logo main-nav secondary-nav';
        }
        #main-nav {
          display: block;
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
      #logo h1 {
      }
      #logo a {
        display: inline-block;
        transition: transform ease 0.2s;
      }
      #logo a:hover {
        transform: rotate(5deg);
      }
      #main-nav {
        text-align: center;
      }
      #main-nav ul {
        list-style: none;
        padding: 0;
      }
      #main-nav ul li {
        display: inline-block;
        cursor: pointer;
        text-align: center;
        font-weight: bold;
        font-size: 1.15rem;
        padding: 0 0.75rem 0.25rem;
        margin-bottom: 0.25rem;
        border-bottom: 2px solid var(--color-charlie-lightest);
      }
      #main-nav ul li a {
        color: var(--color-charlie);
      }
      #main-nav ul li.active {
        border-bottom: 2px solid var(--color-charlie-lighter);
      }
      #secondary-nav input {
        width: 75%;
      }
      #hamburger {
        cursor: pointer;
      }
    </style>

    <input
      id="burger-control"
      type="checkbox"
      name="open-burger"
      aria-label="Open navigation" />

    <div id="logo">
      <h1>
        ✨
        <a href="/" class="enhance-link">Enhance</a>
        <a href="/docs/" class="docs-link">Docs</a>
      </h1>
      <label id="hamburger" for="burger-control" title="Open navigation">
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

    <nav id="main-nav">
      <ul>
        ${navItems.join('\n')}
      </ul>
    </nav>

    <nav id="secondary-nav">
      <input type="search" placeholder="Search..." />
      <docs-theme-toggle></docs-theme-toggle>
    </nav>

    <nav id="docs-nav">
      <docs-nav></docs-nav>
    </nav>
  `
}
