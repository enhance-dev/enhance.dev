export default function CyanToIndigo ({ html }) {
  return html`
    <style>
      :host {
        display: block;
        background: linear-gradient(to bottom, #c9ecff, #7e60f3, #4327af);
      }
    </style>
    <slot></slot>
  `
}
