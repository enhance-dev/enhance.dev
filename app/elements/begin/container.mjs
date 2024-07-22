export default function BeginContainer ({ html }) {
  return html`
      <style>
        :host {
          display: block;
          max-width: 90vw;
          margin-left: auto;
          margin-right: auto;
          max-inline-size: var(--site-max-width);
          color: var(--rift);
        }
      </style>

      <slot></slot>
    `
}
