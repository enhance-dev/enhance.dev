export default function EditorialHeader({ html }) {
  return html`
    <style>
      enhance-header {
        inline-size: var(--editorial-width);
      }
    </style>
    <enhance-header class="block mi-auto font-medium"></enhance-header>
  `
}
