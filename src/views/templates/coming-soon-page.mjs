export default function ComingSoon({ html }) {
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
      <nav-bar></nav-bar>
      <div class="m-auto max-w-lg h-screen ">
        <page-header>
          <span slot="title">Enhance</span>
          <span slot="subtitle">
            An HTML first framework for building Functional Web Apps.
            <br />
            Stop chasing breaking changes in your framework and build apps that
            will work as long as the web does.
          </span>
        </page-header>
      </div>
    </div>
  `
}
