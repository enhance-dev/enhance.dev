export default function BeginH2 ({ html }) {
  return html`
    <style>
      :host {
        display: block;
      }

      h2 {
        letter-spacing: -0.02em;
      }
    </style>
    <h2 class="font-serif font-normal text1 text2-sm text3-lg leading1">
      <slot></slot>
    </h2>
  `
}
