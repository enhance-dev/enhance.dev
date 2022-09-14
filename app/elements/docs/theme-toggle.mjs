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
        color: var(--black-princess);
      }
      input:checked + svg {
        border-bottom: 2px solid var(--black-princess);
      }
    </style>

    <div class="flex gap-2 items-center pt-4 pb-4 pr-3 pl-3">
      <label title="Light theme" class="cursor-pointer">
        <input
          id="use-light"
          class="hidden"
          type="checkbox"
          name="light-toggle"
          value="light"
          aria-label="Use light theme" />
        <svg width="${size}" height="${size}">
          <use xlink:href="#svg-sun"></use>
        </svg>
      </label>
      <label title="Dark theme" class="cursor-pointer">
        <input
          id="use-dark"
          class="hidden"
          type="checkbox"
          name="dark-toggle"
          value="dark"
          aria-label="Use dark theme" />
        <svg width="${size}" height="${size}">
          <use xlink:href="#svg-moon"></use>
        </svg>
      </label>
    </div>

    <script type="module">
      class DocsThemeToggle extends HTMLElement {
        inputs = { light: null, dark: null }

        constructor() {
          super()

          this.inputs.dark = this.querySelector('input#use-dark')
          this.inputs.light = this.querySelector('input#use-light')

          const modeOverride = window.localStorage.getItem('theme-mode')
          if (typeof modeOverride === 'string') this.changeMode(modeOverride)
          else this.changeMode('system')

          for (const input in this.inputs) {
            this.inputs[input].addEventListener('change', (e) => {
              this.changeMode(e.target.checked ? input : 'system')
            })
          }
        }

        changeMode(newMode) {
          if (['dark', 'light', 'system'].includes(newMode)) {
            this.mode = newMode

            if (['dark', 'light'].includes(newMode)) {
              const notMode = newMode === 'dark' ? 'light' : 'dark'
              const newModeInput = this.inputs[newMode]
              const notModeInput = this.inputs[notMode]

              newModeInput.checked = true
              newModeInput.parentElement.title = 'Use system theme'

              notModeInput.checked = false
              notModeInput.parentElement.title =
                notMode[0].toUpperCase() + notMode.slice(1) + ' theme'

              document.documentElement.setAttribute('data-force-theme', newMode)
              window.localStorage.setItem('theme-mode', newMode)
            } else if (newMode === 'system') {
              this.inputs.light.parentElement.title = 'Light theme'
              this.inputs.dark.parentElement.title = 'Dark theme'

              document.documentElement.removeAttribute('data-force-theme')
              window.localStorage.removeItem('theme-mode')
            }
          }
        }

        attributeChangedCallback(name, oldValue, newValue) {
          if (name === 'mode') this.changeMode(newValue)
        }
      }

      customElements.define('docs-theme-toggle', DocsThemeToggle)
    </script>
  `
}
