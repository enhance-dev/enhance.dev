export default function EmailThankPage({ html }) {
  return html`
    <style>
      .max-h-sm {
        max-height: 16rem;
      }
      .max-w-lg {
        max-width: 48rem;
      }
    </style>
    <link rel="stylesheet" href="/components/styles.css" />
    <div class="bg-p2 text-p1">
      <div
        class="
          m-auto
          max-w-lg
          h-screen
          pt2
          pt4-lg
        ">
        <page-header>
          <span slot="title">Thanks!</span>
          <span slot="subtitle"> We'll keep you posted </span>
        </page-header>
      </div>
    </div>
  `
}
