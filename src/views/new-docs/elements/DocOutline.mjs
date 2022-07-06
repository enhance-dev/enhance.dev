export default function DocsOutline({ html }) {
  return html`
    <style>
      #outline {
        display: none;
      }
      #outline > * {
        margin-bottom: 2rem;
      }
      @media (min-width: 72rem) {
        #outline {
          display: block;
        }
      }
    </style>

    <aside id="outline">
      <strong>On this page</strong>
      <slot name="toc"></slot>

      <strong>Further Reading</strong>
      <ul class="list-none">
        <li>@enhance/ssr Reference</li>
      </ul>

      <strong>Contribute</strong>
      <ul class="list-none">
        <li>Edit this page</li>
      </ul>

      <strong>Community</strong>
      <ul class="list-none">
        <li>Blog</li>
        <li>Discord</li>
      </ul>
    </aside>
  `
}
