export default function CookbookArticle ({ html }) {
  return html`
    <style>
      article,
      aside,
      hr {
        max-inline-size: 86ch;
      }
      
      article > * + * {
        margin-block-end: var(--space-0);
      }

      h2,
      h3,
      h4 {
        font-weight: 600;
        margin-block-end: var(--space--2);
        letter-spacing: -0.025em;
      }

      h2 {
        margin-block-start: var(--space-2);
        font-size: var(--text-3);
      }

      h3 {
        font-size: var(--text-2);
      }

      h4 {
        font-size: var(--text-1);
      }

      aside h1 {
        color: var(--dark-purple);
      }

      a {
        text-decoration: underline;
      }

      strong {
        font-weight: 650;
        color: var(--black-white);
      }

      small {
        color: var(--inky-lily);
      }

      ul li {
        list-style-position: inside;
      }

      li > ul {
        padding-left: var(--space-0);
      }

      ol {
        padding-left: var(--space-0);
      }

      ol li {
        list-style-position: outside;
      }

      dt {
        font-weight: 600;
        margin-block-end: var(--space-4);
      }

      dd + dt {
        margin-block-start: var(--space-2);
      }

      dd {
        border: 2px solid var(--cloud-ateneo);
        border-radius: 0.25rem;
        font-size: var(--text--1);
        padding-block: var(--space--1);
        padding-inline: var(--space-0);
      }

      dd > *:not(:last-child) {
        margin-block-end: var(--space-0);
      }

      table {
        width: 100%;
        border: 1px solid var(--cloud-ateneo);
      }

      table thead th,
      table tfoot th {
        color: var(--inky-lily);
        background: var(--cloud-ateneo);
      }

      table caption {
        padding: var(--space--2);
      }

      table th,
      table td {
        padding: var(--space--2);
        border: 1px solid var(--cloud-ateneo);
      }

      blockquote {
        padding-block: var(--space--1);
        padding-inline: var(--space-0);
        background-color: var(--cloud-ateneo);
        box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 1px 0px;
        border-radius: 0.25rem;
      }

      :not(pre) > code {
        padding: 0.1rem 0.2rem;
        line-height: 1rem;
        overflow-wrap: break-word;
        background-color: var(--cloud-ateneo);
        font-family: Menlo, Monaco, Consolas, monospace;
        border-radius: 0.25rem;
      }

      :not(pre, dt) > code {
        font-size: 0.9375em; /* Fixed width fonts tend to have larger x height */
      }

      blockquote :not(pre) > code {
        background-color: var(--smoke-denim);
      }

      pre code {
        display: block;
        max-width: 100%;
        min-width: 100px;
        padding: var(--space-0);
        font-family: 'Roboto Mono', monospace;
        color: var(--hl-color);
        background-color: var(--cloud-ateneo);
        border-radius: 0.25rem;
        white-space: pre;
        tab-size: 2;
        -webkit-overflow-scrolling: touch;
        overflow-x: auto;
      }

      pre button {
        display: none;
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        width: 1rem;
        height: 1rem;
        opacity: 0.5;
        color: var(--inky-lily);
      }

      pre:hover button {
        display: block;
      }

      pre button:hover {
        opacity: 1;
      }

      pre button svg {
        width: 1rem;
        height: 1rem;
        pointer-events: none;
      }

      hr {
        border-color: var(--gray-200);
      }

      .backButton,
      .linkButton {
        background-color: var(--cloud);
        border-radius: 99em;
        box-shadow: 0 4px 6px hsla(0deg 0% 0% / 0.125);
        color: var(--dark-purple);
        transition: color 0.15s linear;
      }

      .backButton:hover,
      .linkButton:hover {
        color: var(--magenta);
      }

      .backButton svg {
        transition: translate 0.15s ease-in-out;
      }

      .backButton:hover svg,
      .backButton:focus svg {
        translate: -0.25em 0;
      }
    </style>
    <article class="leading4 mi-auto pbe4">
      <a class="backButton inline-flex align-items-center pis0 pie2 pb-2 mbs4 font-semibold no-underline" href="/cookbook/">
        <svg class="inline-block mie-6" width="16px" height="16px" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M15 6L9 12L15 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        More recipes
      </a>
      <slot></slot>
    </article>

    <hr class="mbs4 pbs4 border-bs1 border-solid mi-auto" />

    <aside class="mi-auto leading4 mbe6">
      <h2 class="text3 leading1 tracking-1 font-bold mbe2">Find more recipes in the Enhance Cookbook!</h2>
      <p class="text1 mbe4">Learning new things can be fun — but also challenging. The Enhance Cookbook is here to show you around the kitchen and help you get your hands dirty.</p>

      <a class="linkButton pi2 pb0 font-semibold no-underline" href="/cookbook/">
        Explore the Cookbook!
      </a>
    </aside>
  `
}
