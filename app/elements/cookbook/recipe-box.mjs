export default function RecipeBox ({ html }) {
  return html`
    <style>
      :host {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(max(20%, 280px), 1fr));
        grid-auto-rows: 1fr;
        gap: var(--space-0);
      }
    </style>
    <slot></slot>
  `
}
