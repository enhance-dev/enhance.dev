export default function LandingLinkButton({ html, state }) {
  const { attrs } = state
  const { href } = attrs

  return html`
    <style>
      :host {
        display: block;
      }

      a {
        background: var(--dark-purple);
        border-radius: 5px;
        color: white;
      }

      a:after {
        content: '';
        position: absolute;
        inset: -2px;
        box-shadow: 0 0 0 2px var(--dark-purple);
        border-radius: 6px;
        opacity: 0;
        transform: scale(0.75);
        transition: opacity 150ms linear, transform 150ms linear;
      }

      a:focus {
        outline: none;
      }

      a:hover:after,
      a:focus:after {
        opacity: 1;
        transform: scale(1);
      }
    </style>
    <a
      class="inline-block relative uppercase tracking1 pt0 pb0 pr5 pl5 font-medium"
      href="${href}">
      <slot></slot>
    </a>
  `
}
