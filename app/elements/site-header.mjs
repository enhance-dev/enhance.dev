export default function SiteHeader ({ html, state }) {
  const { store } = state
  const { path } = store

  const checkActive = route => path.split('/')[1] === route ? 'active' : ''

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
        border-block-end: 1px solid color-mix(in srgb, var(--background) 90%, black);
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

        /* Reset mobile styles */
        #site-header-links {
          background: transparent;
          border-block-end: none;
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
        border-radius: 0.25em;
        transition: color 0.125s linear;
      }

      a:hover {
        color: var(--magenta);
      }

      a.active {
        color: var(--rift);
        position: relative;
      }

      .active:before {
        content: '⏺';
        scale: 0.66;
        position: absolute;
        inline-size: 2ch;
        inset-inline-start: -2ch;
      }

      @media (min-width: 56em) {
        .active:before {
          scale: 0.5;
          inset-inline-start: unset;
          inset-inline-end: -0.5ch;
          inset-block-start: 0;
          text-align: right;
        }
      }

      /* Mobile menu + toggle UI */
      @media (width < 56em) {
        label[for="mobile-menu-toggle"] figure:after {
          content: url("data:image/svg+xml;utf8,<svg width='24px' height='24px' stroke-width='2' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' color='currentColor'><path d='M3 5H21' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path><path d='M3 12H21' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path><path d='M3 19H21' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path></svg> "); /* burger icon */
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: end;
          inline-size: 2.75em;
          aspect-ratio: 1 / 1;
        }

        #mobile-menu-toggle:checked ~ label[for="mobile-menu-toggle"] figure:after {
          content: url("data:image/svg+xml;utf8,<svg width='24px' height='24px' stroke-width='2' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' color='currentColor'><path d='M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path></svg>"); /* close icon */
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
        gap-2-lg
        mis-auto-lg
        align-items-center-lg
      ">
        <li>
          <a href="/" class="p-4 ${checkActive('')}">Home</a>
        </li>
        <li>
          <a href="/docs" class="p-4 ${checkActive('docs')}">Docs</a>
        </li>
        <li>
          <a href="/cookbook" class="p-4 ${checkActive('cookbook')}">Cookbook</a>
        </li>
        <li>
          <a href="/blog" class="p-4 ${checkActive('blog')}">Blog</a>
        </li>
        <li>
          <a href="/showcase" class="p-4 ${checkActive('showcase')}">Showcase</a>
        </li>
        <li>
          <a href="/wasm" class="p-4 ${checkActive('wasm')}">WASM</a>
        </li>
        <li>
          <a href="/why-enhance" class="p-4 ${checkActive('why-enhance')}">Why Enhance?</a>
        </li>
      </ul>
    </nav>
  `
}
