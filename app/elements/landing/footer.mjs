export default function Footer({ html }) {
  return html`
    <style>
      :host {
        background-color: var(--denim);
        display: block;
        color: #32ff47;
        font-size: var(--text--0);
      }

      footer {
        max-width: 80vw;
        padding-block: var(--space-2xl);
      }

      h2 img {
        aspect-ratio: 44 / 43;
        width: 2.75rem;
        transform: translateY(25%);
      }

      .social-logo {
        height: 1.25rem;
      }
    </style>
    <footer class="pl0 pr0 m-auto">
      <h2 class="font-semibold text-center mb4">
        <img
          src="/_public/img/landing/axol-face.svg"
          alt=""
          class="inline"
          loading="lazy" />
        <span class="pl0">Enhance</span>
      </h2>
      <div class="flex items-center justify-center">
        <a href="/docs" class="inline-block font-medium uppercase p0">Docs</a>

        <a href="https://fosstodon.org/@enhance_dev" class="inline-block p0">
          <img
            src="/_public/img/landing/mastodon-logo.svg"
            class="social-logo m-auto"
            loading="lazy"
            alt="Mastodon" />
        </a>

        <a href="/discord" class="inline-block p0">
          <img
            src="/_public/img/landing/discord-logo.svg"
            class="social-logo m-auto"
            loading="lazy"
            alt="Discord" />
        </a>

        <a href="https://github.com/enhance-dev" class="inline-block p0">
          <img
            src="/_public/img/landing/github-logo.svg"
            class="social-logo m-auto"
            loading="lazy"
            alt="GitHub" />
        </a>
      </div>

      <div class="mt4 text-center">
        <a href="#top" class="underline text0">Back to the top!</a>
      </div>
    </footer>
  `
}
