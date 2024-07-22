export default function BeginH1 ({ html }) {
  return html`
    <style>
      :host {
        display: block;
      }

      h1 {
        letter-spacing: -0.025em;
      }
    </style>
    <h1
      class="font-bold font-normal text2 text6-lg leading2"
    >
      <slot></slot>
    </h1>
  `
}
