export default function PinkToCyan ({ html }) {
  return html`
    <style>
      :host {
        display: block;
        background: linear-gradient(
          to bottom,
          #f5eaff 42%,
          #74f1ff 72%,
          #c1fffb 100%
        );
      }
    </style>
    <slot></slot>
  `
}
