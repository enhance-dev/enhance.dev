export default function Features({ html }) {
  return html`
    <style>
      :host {
        color: var(--dark-purple);
        display: block;
        position: relative;
      }

      .container {
        max-width: 80vw;
      }

      h2 {
        font-size: min(16rem, 16vw);
        margin-top: var(--space-l);
        margin-bottom: var(--space-m);
        margin-left: -0.025em;
      }
    </style>
    <section class="container m-auto">
      <h2 class="uppercase font-extrabold tracking-1">It's all here</h2>
      <ul class="grid gap1 text3 list-none">
        <li>File based routing</li>
        <li>APIs</li>
        <li>Web Components</li>
        <li>HTML Includes</li>
      </ul>
    </section>
  `
}
