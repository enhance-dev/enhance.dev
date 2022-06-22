export default function ModalTrigger({ html, state = {} }) {
  const { name = '' } = state.attrs
  return html`
    <style>
      .mostly-hidden {
        opacity: 0;
        position: absolute;
        height: 1px;
        width: 1px;
        overflow: hidden;
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
      }
      input:focus + label[key='key-open-${name}'] {
        border: var(--focus-border, '1px dotted red');
      }
    </style>
    <input
      aria-hidden="true"
      tabindex="-1"
      class="mostly-hidden"
      name="group-click-${name}"
      id="click-open-${name}"
      type="radio"
      form="modal-form-${name}" />
    <label for="click-open-${name}">
      <slot></slot>
    </label>
    <input
      class="mostly-hidden"
      name="group-key-${name}"
      id="key-open-${name}"
      type="radio"
      checked
      form="modal-form-${name}" />
    <label class="mostly-hidden" for="key-open-${name}">
      <slot name="screen-reader">open</slot>
    </label>
  `
}
