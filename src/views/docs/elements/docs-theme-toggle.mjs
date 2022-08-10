export default function DocsThemeToggle({ html }) {
  const size = 20

  return html`
    <style>
      label {
        height: ${size}px;
        width: ${size}px;
      }
      input + svg {
        opacity: 0.3;
        padding-bottom: 2px;
      }
      input:hover + svg,
      input:checked + svg {
        opacity: 1;
        border-bottom: 2px solid var(--black-princess);
        color: var(--black-princess);
      }
    </style>

    <div class="flex gap-2 items-center radius-pill pt-4 pb-4 pr-3 pl-3">
      <label title="Use light theme" class="cursor-pointer">
        <input
          id="use-light"
          class="hidden"
          type="checkbox"
          name="light-toggle"
          value="light"
          aria-label="Use light theme" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="${size}"
          height="${size}"
          viewBox="0 0 ${size} ${size}"
          fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clip-rule="evenodd"></path>
        </svg>
      </label>
      <label title="Use dark theme" class="cursor-pointer">
        <input
          id="use-dark"
          class="hidden"
          type="checkbox"
          name="dark-toggle"
          value="dark"
          aria-label="Use dark theme" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="${size}"
          height="${size}"
          viewBox="0 0 ${size} ${size}"
          fill="currentColor">
          <path
            d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
      </label>
    </div>

    <script type="module">
      class DocsThemeToggle extends HTMLElement {
        constructor() {
          super()

          this.inputDark = this.querySelector('input#use-dark')
          this.inputLight = this.querySelector('input#use-light')

          const modeOverride = window.localStorage.getItem('theme-mode')
          const hasModeOverride = typeof modeOverride === 'string'
          if (hasModeOverride) {
            this.changeMode(modeOverride)
            if (modeOverride === 'dark') this.inputDark.checked = true
            if (modeOverride === 'light') this.inputLight.checked = true
          } else {
            this.changeMode('system')
          }

          this.inputDark.addEventListener('change', (e) => {
            this.changeMode(e.target.checked ? 'dark' : 'system')
            this.inputLight.checked = false
          })

          this.inputLight.addEventListener('change', (e) => {
            this.changeMode(e.target.checked ? 'light' : 'system')
            this.inputDark.checked = false
          })
        }

        changeMode(newMode) {
          if (['dark', 'light', 'system'].includes(newMode)) {
            this.mode = newMode

            if (['dark', 'light'].includes(newMode)) {
              document.documentElement.setAttribute('data-force-theme', newMode)

              window.localStorage.setItem('theme-mode', newMode)
            } else if (newMode === 'system') {
              document.documentElement.removeAttribute('data-force-theme')
              window.localStorage.removeItem('theme-mode')
            }
          }
        }

        attributeChangedCallback(name, oldValue, newValue) {
          if (name === 'mode') this.changeMode(newValue)
        }

        connectedCallback() {
          //
        }
      }

      customElements.define('docs-theme-toggle', DocsThemeToggle)
    </script>
  `
}
