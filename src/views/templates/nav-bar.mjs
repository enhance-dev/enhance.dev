export default function NavBarTemplate({ html, state = {} }) {
  const { menuLinks = [], location = '/' } = state.store

  return html`
    <style>
      .mobile-menu-items a {
        text-decoration: none;
      }

      .menu-toggle {
        display: block;
        position: relative;
        user-select: none;
      }

      .menu-toggle input {
        display: block;
        width: 30px;
        height: 30px;
        position: absolute;
        top: -7px;
        left: -5px;
        padding: 0;
        cursor: pointer;
        opacity: 0;
        z-index: 3;
        -webkit-touch-callout: none;
      }

      .menu-toggle label {
        position: relative;
        display: block;
        width: 30px;
        height: 30px;
        z-index: 2;
      }
      .menu-toggle label span {
        display: none;
      }

      .menu-toggle input:checked + label {
        color: var(--p0);
      }

      .mobile-menu-items {
        position: absolute;
        width: 100vw;
        margin: -100px 0 0 0;
        padding: 50px;
        padding-top: 125px;
        list-style-type: none;
        left: 100px;
        -webkit-transition: left 0.3s ease;
        transition: left 0.3s ease;
      }

      .mobile-menu-items li {
        padding: 10px 0;
        font-size: 22px;
      }

      .menu-toggle ul {
        z-index: 1;
      }

      .menu-toggle input:checked ~ ul {
        left: calc(-100vw + 50px);
      }
    </style>

    <header class="bg-p0">
      <nav class="m-auto p0">
        <div
          class="mobile-menu hidden-lg w-full flex items-center justify-between border-b border-p1">
          <div>
            <a
              style="height:2rem;"
              href="/"
              class="text-P2 flex no-underline font-sans font-extrabold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </a>
          </div>
          <div class="text-p2 menu-toggle">
            <input name="toggle" type="checkbox" />
            <label for="toggle">
              <span>menu</span>
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
            <ul class="bg-p2 font-sans font-bold mobile-menu-items">
              ${menuLinks
                .map(
                  (l) => `
              <a class="text-p1 text2 font-bold" ${
                l.location !== location ? `href="${l.location}"` : ''
              }><li>${l.name}</li></a>
              `
                )
                .join('')}
            </ul>
          </div>
        </div>
        <div class="hidden flex-lg flex-row justify-between">
          <div>
            <a
              style="height:2rem;"
              href="/"
              class="text-P2 flex no-underline font-sans font-extrabold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span class="text2">Enhance</span>
            </a>
          </div>
          <div class="">
            <div class="flex flex-row">
              ${menuLinks
                .map(
                  (l) => `
              <div  class="text-p2 text1 font-sans  font-bold mr0 ml0"><a class="text-p2 no-underline"${
                l.location !== location ? `href="${l.location}"` : ''
              }>${l.name}</a></div>
              `
                )
                .join('')}
            </div>
          </div>
        </div>
      </nav>
    </header>

    <script type="module">
      class NavBar extends HTMLElement {
        constructor() {
          super()
        }
        connectedCallback() {}
      }
      customElements.define('nav-bar', NavBar)
    </script>
  `
}
