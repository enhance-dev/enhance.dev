export default function Container ({ html }) {
  return html`
    <style>
      :host {
        display: block;
        margin-inline: auto;
        max-inline-size: var(--editorial-width);
      }
    </style>
    <slot></slot>
  `
}
