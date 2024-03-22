export default function Container({ html }) {
  return html`
    <style>
      :host {
        display: block;
        margin-inline: auto;
        max-inline-size: var(--editorial-width);
        padding-inline: var(--space-0);
      }
    </style>
    <slot></slot>
  `
}
