const logos = [
  'deno',
  'django',
  'dot-net',
  'go',
  'java',
  'node',
  'php',
  'python',
  'rails',
  'ruby',
  'rust',
  'wordpress',
]

export default function Implementations ({ html }) {
  const images = logos.map(name => `<img class="object-contain" src="/_public/img/wasm-landing/logo-${name}.svg" alt="${name} logo" />`).join('')

  return html`
    <style>
      :host {
        display: block;
        position: relative;
        z-index: -3;
      }

      .axol-banner {
        inline-size: clamp(250px, 33vw, 450px);
        translate: 0 -100%;
      }

      .cloud-top,
      .cloud-bottom {
        max-inline-size: none;
      }

      .cloud-top {
        margin-block-start: -27.5%;
      }

      figure {
        background-color: #e5f7ff;
      }

      .logo-grid {
        gap: var(--space-6) var(--space-0);
      }

      .logo-grid img {
        inline-size: clamp(100px, 16.667vw, 16rem);
        max-block-size: 5rem;
      }
    </style>
    <section>
      <img class="cloud-top si-100vw" src="/_public/img/wasm-landing/cloud-divider-top.svg" alt="" />
      <figure class="relative pbs4">
        <img class="absolute inset-bs-0 inset-i-0 mi-auto axol-banner" src="/_public/img/wasm-landing/axol-wasm-banner.svg" alt="Every server, any language" />
        <wasm-container>
          <div class="logo-grid flex flex-wrap align-items-center justify-content-center">
            ${images}
          </div>
        </wasm-container>
      </figure>
      <img class="cloud-bottom si-100vw" src="/_public/img/wasm-landing/cloud-divider-bottom.svg" alt="" />
    </section>
  `
}
