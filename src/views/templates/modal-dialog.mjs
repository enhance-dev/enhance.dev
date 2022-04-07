import buildScoper from '../scope-css.mjs'
export default function ModalDialogTemplate({ html, state }) {
  const id = Math.random().toString(32).slice(2)
  const scope = buildScoper({
    instance: id,
    scopeTo: 'modal-dialog',
    disable: !state.store?.scopedCSS
  })
  return html`
    ${scope`
    <style enh-scope="component">
      
      input#modal-${id} {
        position: fixed;
        opacity: 0%;
      }
      input#modal-${id}:focus + label {
         outline: 1px dashed red;

      }
      input:not(:checked) + label + button {
        display:none;
      }
      input:checked + label + button {
        color: transparent;
        opacity: 10%;
        background:var(--dark);
        position: fixed;
        top: -100vh;
        left: -100vw;
        z-index: 1000;
        width: 200vw;
        height: 200vh;
      }
      
      input:not(:checked) + label + button + div.modal-body {
      display:none;
    }
      
      div.modal-body {
        position: fixed;
        background:white;
        display: grid;
        
        left: calc(50vw - 100px );
        top: calc(15vh - 100px);
        z-index: 1000;
        min-width:200px;
        min-height:200px;
        
      }

     

    </style>
      `}

    <input id="modal-${id}" type="checkbox" form="form-${id}" />
    <label for="modal-${id}"><slot name="trigger">open model</slot></label>
    <button
      part="modal-backdrop"
      tabindex="-1"
      form="form-${id}"
      type="reset"></button>
    <div
      part="modal-body"
      class="modal-body text0 border2 border-dark border-solid radius0">
      <button
        class=" text1 border1 border-dark border-solid  radius0 p-4 "
        part="cancel-1"
        tabindex="-1"
        form="form-${id}"
        type="reset">
        x
      </button>
      <slot name="message">Default Message</slot>
      <slot name="action"></slot>
      <button
        class=" text0 border1 border-dark border-solid radius0 p-4"
        part="cancel-2"
        form="form-${id}"
        type="reset">
        dismiss
      </button>
      <form id="form-${id}"></form>
    </div>

    <script type="module">
      class ModalDialog extends HTMLElement {
        constructor() {
          super()
          this.dialog = this.querySelector('.modal-body')
          this.trapFocus = this.trapFocus.bind(this)
          this.untrapFocus = this.untrapFocus.bind(this)
          this.focusLoop = this.focusLoop.bind(this)
          this.radioButton = this.querySelector('input[type="radio"]')
          this.radioButton.addEventListener('input',(e)=>{
            if(e.target.value==='checked'){ // modal closes
          this.removeEventListener('keydown', this.focusLoop)
            }
            if(e.target.value==='unchecked'){ // modal opens
              this.trapFocus()
            }
          })
        }
        connectedCallback() {
        }
        get isOpen(){

        }
        set isOpen(value){

        }
        disconnectedCallback(){
          this.removeEventListener('keydown', this.focusLoop)
        }
        }
        trapFocus function(){
          const  focusableElements =
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
          const modal = this.dialog

          const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
          const focusableContent = modal.querySelectorAll(focusableElements);
          const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal


          this.addEventListener('keydown', this.focusLoop)

        firstFocusableElement.focus();
        }
          focusLoop function(e) {
            let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

            if (!isTabPressed) {
              return;
            }

            if (e.shiftKey) { // if shift key pressed for shift + tab combination
              if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus(); // add focus for the last focusable element
                e.preventDefault();
              }
            } else { // if tab key is pressed
              if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
                firstFocusableElement.focus(); // add focus for the first focusable element
                e.preventDefault();
              }
            }
          }

      }
       customElements.define('modal-dialog', ModalDialog)
    </script>
  `
}
