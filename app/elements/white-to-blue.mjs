export default function WhiteToBlue({ html }) {
  return html`
    <style>
      :host {
        display: block;
        background: linear-gradient(to bottom, white, #fff0fe 5%, #c9ecff);
      }
    </style>
    <slot></slot>
  `
}
