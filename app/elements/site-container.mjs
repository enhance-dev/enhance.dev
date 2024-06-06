export default function SiteContainer ({ html }) {
  return html`
    <style>
      :host {
        display: block;
        max-inline-size: var(--docs-max-width);
        margin-inline: auto;
        padding-inline: var(--space-0);
      }
    </style>
    <slot></slot>
  `
}
