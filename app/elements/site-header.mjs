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
        background-color: var(--background);
        display: block;
        padding-inline: var(--space-0);
        position: fixed;
        inset-block-start: 0;
        inset-inline: 0;
        z-index: 4;
      }

      #site-header-links {
        background-color: var(--background);
        inset-block-start: var(--nav-height);
      }

      @media screen and (min-width: 56em){
        /* On larger screens, use a semitransparent, tinted, blurred background */
        /* We don't do this on smaller screens because the stacked mobile menu inheriting
         * the background/backdrop filter is broken in Chrome (their bug) and glitchy on Safari + FF */
        :host {
          background-color: color-mix(in srgb, var(--background) 75%, transparent);
          backdrop-filter: blur(10px);
        }

        #site-header-links {
          background: transparent;
          inset-block-start: unset;
        }
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

      /* Mobile menu + toggle UI */
      @media (width < 56em) {
        label[for="mobile-menu-toggle"] figure:after {
          content: url("data:image/svg+xml,%3Csvg width='22' height='21' viewBox='0 0 22 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.830078' y='-0.00317383' width='21.0552' height='2.95288' rx='1.47644' fill='%23003451'/%3E%3Crect x='0.830078' y='8.60938' width='21.0552' height='2.95288' rx='1.47644' fill='%23003451'/%3E%3Crect x='0.830078' y='17.2219' width='21.0552' height='2.95288' rx='1.47644' fill='%23003451'/%3E%3C/svg%3E%0A"); /* burger icon */
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: end;
          inline-size: 2.75em;
          aspect-ratio: 1 / 1;
        }

        #mobile-menu-toggle:checked ~ label[for="mobile-menu-toggle"] figure:after {
          content: url("data:image/svg+xml,%3Csvg width='15' height='16' viewBox='0 0 15 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.3717 11.8736L3.64752 4.14941' stroke='%23003451' stroke-width='4.86818' stroke-miterlimit='10' stroke-linecap='square' stroke-linejoin='round'/%3E%3Cpath d='M11.3067 4.21436L3.58252 11.9385' stroke='%23003451' stroke-width='4.86818' stroke-miterlimit='10' stroke-linecap='square' stroke-linejoin='round'/%3E%3C/svg%3E%0A"); /* close icon */
        }

        #mobile-menu-toggle:checked ~ label .expanded { display: inline; }
        #mobile-menu-toggle:checked ~ label .collapsed { display: none; }
        #mobile-menu-toggle:not(:checked) ~ label .expanded { display: none; }
        #mobile-menu-toggle:not(:checked) ~ label .collapsed { display: inline; }

        #mobile-menu-toggle ~ #site-header-links {
          display: none;
        }

        #mobile-menu-toggle:checked ~ #site-header-links {
          display: flex;
        }

        #site-header-links li {
          margin-inline-start: calc(var(--space-4) + var(--space-0));
        }
      }
    </style>

    <nav class="
      flex
      align-items-center
      gap0
      mi-auto
    ">
      <a href="/">
        <h1 class="text0 font-semibold flex gap0 align-items-center uppercase tracking2">
          <axol-portrait></axol-portrait>
          Enhance
        </h1>
      </a>

      <!-- Mobile menu toggle -->
      <input
        type="checkbox"
        role="button"
        aria-haspopup="true"
        id="mobile-menu-toggle"
        name="mobile menu toggle"
        class="clip absolute opacity-0 hidden-lg"
        autocomplete="off"
      />
      <label
        for="mobile-menu-toggle"
        class="mis-auto hidden-lg"
      >
        <figure aria-hidden="true"></figure>
        <span class="clip">Site navigation</span>
        <span class="clip expanded">expanded</span>
        <span class="clip collapsed">collapsed</span>
      </label>

      <!-- Site links -->
      <ul id="site-header-links" class="
        list-none
        text-1
        font-semibold
        uppercase
        tracking2
        fixed
        inset-i-0
        static-lg
        p0
        pbe2
        p-none-lg
        flex
        flex-col
        flex-row-lg
        gap2
        mis-auto-lg
        align-items-center-lg
      ">
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
