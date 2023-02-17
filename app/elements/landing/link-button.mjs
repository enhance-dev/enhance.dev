export default function LandingLinkButton({ html, state }) {
  const { attrs } = state
  const { href } = attrs

  return html`
    <style>
      :host {
        display: block;
      }

      a {
        background-color: var(--mid-purple);
        border-radius: 5px;
        color: var(--pale-cyan);
        font-size: var(--text-0);
      }
    </style>
    <a
      class="inline-block uppercase tracking1 pt0 pb0 pr5 pl5 font-medium"
      href="${href}">
      <slot></slot>
    </a>
  `
}
