export default function LowerSection ({ html }) {
  return html`
    <style>
      :host {
        display: block;
        background-color: var(--indigo);
        padding-block: var(--space-4) var(--space-8);
      }
    </style>
    <a id="cta"></a>
    <slot></slot>
  `
}
