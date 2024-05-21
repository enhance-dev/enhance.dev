export default function CodeCompare ({ html }) {
  return html`
      <style>
        :host {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: 1fr;
          gap: var(--space-0);
          width: 100%;
        }
      </style>
      <slot></slot>
    `
}
