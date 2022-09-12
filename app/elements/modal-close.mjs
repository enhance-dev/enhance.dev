export default function ModalClose({ html, state = {} }) {
  const { name = '' } = state.attrs
  return html`
    <button type="reset" form="modal-form-${name}">
      <slot></slot>
    </button>
  `
}
