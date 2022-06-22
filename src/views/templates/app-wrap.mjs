export default function AppWrap({ html, state = {} }) {
  // const modals = Array(Math.parseInt(state.attrs?.quantity || 1)).fill(0)
  // space or comma separated values for modal names "one,two three"
  const modals = state?.attrs?.modals?.split(/[\s*,?\s*]/) || []
  return html`
    <style>
      :host{
        display:block;
        position:relative;
      }
      :host > ::slotted([slot='main']) {
        display: block;
        height: 100vh;
        width: 100vw;
        position: absolute;
      }
      :host > input {
        display:block;
        opacity: 0;
        position: absolute;
        height: 1px;
        width: 1px;
        overflow: hidden;
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
      }
      :host > .modal-container {
        display: none;
        height:100vh;
        width:100vw;
        position: absolute;
      }
      :host > .modal-container > button.overlay {
        height: 100vh;
        width: 100vw;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        opacity: 0.6;
        background-color: black;
      }
      :host > .modal-container > .modal-message {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        padding: 1rem;
        background:white;
      }
      .screen-reader-only {
        opacity: 0;
        position: absolute;
        height: 1px;
        width: 1px;
        overflow: hidden;
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
      }


      ${modals
        .map(
          (modalName) => /* css*/ `
            /* Hide main content when modal opens. Hidden from screen readers and traps focus */
            :host
              > input[name='group-click-${modalName}']:not(:checked)
              ~ ::slotted([slot='main']),
            :host
              > input[name='group-key-${modalName}']:checked
              ~ ::slotted([slot='main']) {
              visibility: hidden;
            }
            /* Show dialog content */
            :host
              > input[name='group-click-${modalName}']:not(:checked)
              ~ #modal-container-${modalName},
              :host
              > input[name='group-key-${modalName}']:checked
              ~ #modal-container-${modalName} {
              display: block;
            }
          `
        )
        .join('\n')}
    </style>
    ${modals
      .map(
        (modalName) => /* html*/ `
            <input
              tabindex="-1"
              aria-hidden="true"
              form="modal-form-${modalName}"
              name="group-click-${modalName}"
              checked
              type="radio"
              />
            <input
              tabindex="-1"
              aria-hidden="true"
              form="modal-form-${modalName}"
              name="group-key-${modalName}"
              type="radio" />
          `
      )
      .join('')}

    <slot name="main"></slot>
    ${modals
      .map(
        (modalName) => /* html*/ `
            <div class="modal-container" id="modal-container-${modalName}">
              <button
                class="overlay"
                aria-hidden="true"
                tabindex="-1"
                type="reset"
                form="modal-form-${modalName}"></button>
              <div role="dialog" class="modal-message">
                <p class="screen-reader-only" id="cancel-${modalName}">
                  cancel
                </p>
                <button
                  aria-labelledby="cancel-${modalName}"
                  type="reset"
                  form="modal-form-${modalName}">
                  X
                </button>
                <slot name="${modalName}"></slot>
              </div>
            </div>
          <form id="modal-form-${modalName}"></form>
          `
      )
      .join('')}
    <script>
      // TODO: set aria-hidden on main
      // TODO: change main to inert and not display none when dialog open
      // TODO: change trigger to activate with space or enter rather than arrow and change role to button
      //TODO: add return to last focussed element on close
      class AppWrap extends HTMLElement {
        constructor() {
          super()
          //TODO: fix selector below to pick the open dialog
          this.dialog = this.querySelector('.modal-container')
          this.trapFocus = this.trapFocus.bind(this)
          this.checkbox = this.querySelector('input[type="checkbox"]')
          this.form = this.querySelector('form')
        }
        connectedCallback() {
          this.checkbox.addEventListener('change', this.trapFocus)
        }
        disconnectedCallback() {
          this.checkbox.removeEventListener('change', this.trapFocus)
        }
        trapFocus(e) {
          const focusableElements =
            'button:not([tabindex="-1"], [href]:not([tabindex="-1"], input:not([tabindex="-1"], select:not([tabindex="-1"], textarea:not([tabindex="-1"], [tabindex]:not([tabindex="-1"])'

          const modal = this.dialog

          const firstFocusableElement =
            modal.querySelectorAll(focusableElements)[0] // get first element to be focused inside modal
          const focusableContent = modal.querySelectorAll(focusableElements)
          const lastFocusableElement =
            focusableContent[focusableContent.length - 1] // get last element to be focused inside modal

          const closeModal = () => this.form.reset()
          this.addEventListener('keydown', (e) => focusLoop(e, closeModal))

          firstFocusableElement.focus()

          function focusLoop(e, closerModal) {
            let isEscapePressed = e.key === 'Escape'
            let isTabPressed = e.key === 'Tab' || e.keyCode === 9

            if (isEscapePressed) closeModal()

            if (!isTabPressed) {
              return
            }

            if (e.shiftKey) {
              // if shift key pressed for shift + tab combination
              if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus() // add focus for the last focusable element
                e.preventDefault()
              }
            } else {
              // if tab key is pressed
              if (document.activeElement === lastFocusableElement) {
                // if focused has reached to last focusable element then focus first focusable element after pressing tab
                firstFocusableElement.focus() // add focus for the first focusable element
                e.preventDefault()
              }
            }
          }
        }
      }
      customElements.define('modal-dialog', ModalDialog)
    </script>
  `
}
