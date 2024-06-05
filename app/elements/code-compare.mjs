export default function CodeCompare ({ html }) {
  return html`
      <style>
        :host {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: 1fr;
          gap: var(--space-0);
          width: 100%;
        }

        @media (width >= 56em) {
          :host {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      </style>
      <slot></slot>
    `
}
