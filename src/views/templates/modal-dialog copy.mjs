import buildScoper from '../scope-css.mjs'
export default function ModalDialogTemplate({ html, state = {} }) {
  const id = Math.random().toString(32).slice(2)
  const scope = buildScoper({
    instance: id,
    scopeTo: 'modal-dialog',
    disable: !state?.store?.scopedCSS
  })
  return html`
    ${scope`
    <style enh-scope="component">
      

.modal[open] .modal__toggle {
    left: calc(50vw + 140px);
    top: calc(15vh + 20px);
    position: fixed;
    z-index: 2;
    width:100px;
    height:100px;
    background:red;
}
.modal[open] .modal__toggle:focus {
    outline: 2px solid #00f;
}

.modal__toggle::before {
    content: 'Open Modal';
}
.modal[open] .modal__toggle::before {
    content: '✖';
    
}
.modal__toggle {
    color: #00f;
    list-style: none;
}
.modal__toggle::-webkit-details-marker {
    display: none;
}

.modal__toggle:hover {
    cursor: pointer;
    opacity: .8;
}
.modal__background {
    background-color:rgba(0, 0, 0, .25);
    display: flex;
    height: 100vh;
    justify-content: center;
    left: 0;
    opacity: .8;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 1;
}

.modal__body {
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, .25);
    font-size: 1rem;
    font-weight: 700;
    padding: 40px 20px;
    position: fixed;
    text-align: center;
    top: 15vh;
    width: 300px;
    z-index: 1;
}

    </style>
      `}

    <details class="modal">
      <summary class="modal__toggle"></summary>
      <div class="modal__background">
        <div
          class="modal__body"
          tabindex="-1"
          role="dialog"
          aria-labelledby="modal__label_${id}"
          aria-live="assertive"
          aria-modal="true">
          <p id="modal__label_${id}">The modal is open! 🎉</p>
        </div>
      </div>
    </details>

    <script type="module">
      class ModalDialog extends HTMLElement {
        constructor() {
          super()
        }
        connectedCallback() {}
      }
      customElements.define('modal-dialog', ModalDialog)
    </script>
  `
}
