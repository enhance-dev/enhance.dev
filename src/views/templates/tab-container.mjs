export default function TabContainerTemplate({ html, state = {} }) {
  const addTabs = state?.attrs['add-tabs']
  const id = Math.random().toString(32).slice(2)
  const quantity = parseInt(state?.attrs?.quantity, 10) || 1
  const defaultTab = parseInt(state?.attrs['default-tab'], 10) || 1
  const tabStateForm = state.attrs?.['tab-state-form'] || ''
  const tabGroupNameAttr = state.attrs?.['tab-group-name'] || ''
  const tabGroupName = `${
    tabGroupNameAttr ? tabGroupNameAttr : `tab-group-${id}`
  }`
  const replKey = state.store?.replKey || ''
  return html`
    <style>
      :host {
        display: grid;
        overflow: hidden;
        /*height: 100%;
        width: 100%;*/
      }

      ::slotted([slot^='title']) {
        color: var(--p2);
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
          Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
          'Noto Color Emoji';
        font-size: 1rem;
      }

      .tabs {
        position: relative;
        display: grid;
        grid-template-columns: repeat(6, 1fr) auto;
        height: auto;
        min-height: 300px;
        /*margin: 25px 0;*/
      }
      .tab {
        white-space: nowrap;
      }
      .tab > input[type='radio'] + label {
        background: white;
        display: grid;

        grid-template-columns: auto auto;

        justify-content: space-around;
        grid-gap: 0.2rem;
        padding: 0.5rem;
        border: 1px solid red;
        cursor: pointer;
        margin-left: -1px;

        justify-items: center;
        align-items: center;
        text-align: center;
      }
      .tab input[type='radio'] + label * {
        justify-self: start;
      }
      .tab:first-child input[type='radio'] + label {
        margin-left: 0;
      }
      .tab input[type='radio'] {
        position: absolute;
        opacity: 0;
      }

      .tab-content {
        position: absolute;
        overflow-y: scroll;
        top: 2rem;
        left: 0;
        right: 0;
        bottom: 0;
        background: white;
        border: 1px solid #ccc;
        display: none;
      }
      ::slotted([slot^='content']) {
        display: grid;
      }
      input[type='radio'][name='${tabGroupName}']:checked + label {
        background: white;
        border-bottom: 1px solid white;
      }

      input[type='radio'][name='${tabGroupName}']:not(:checked) + label {
        background: gray;
        border-bottom: 1px solid white;
      }
      input[type='radio'][name='${tabGroupName}']:checked
        + label
        + .tab-content {
        display: block;
      }
      .inline-icon {
        width: 16px;
        height: 16px;
      }
      .js-add-tab {
        align-self: start;
      }
    </style>

    <div class="tabs">
      ${[...Array(quantity)]
        .map(
          (_, i) => /* html*/ `
            <div class="tab">
              <input
                type="radio"
                id="tab${i + 1}-${id}"
                name="${tabGroupName}"
                value="${i + 1}"
                ${tabStateForm ? `form="${tabStateForm}" ` : ''}
                ${i + 1 === defaultTab ? 'checked' : ''} />
              <label for="tab${i + 1}-${id}"
                ><slot name="title${i + 1}">tab${i + 1}</slot>
                ${
                  addTabs && i > 0
                    ? /* html*/ ` <modal-dialog>
                  <span class="text0 inline-icon" slot="trigger">
                    <svg
                      class="inline-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </span>
                  <button
                    class=" text0 border1 border-dark border-solid radius0 p-4 "
                    slot="action"
                    form="run-repl"
                    formmethod="POST"
                    formaction="/playground?${
                      replKey ? `key=${replKey}` : ''
                    }&deleteTab=${i}"
                    type="submit">
                    Delete Tab
                  </button>
                  <span slot="message"
                    >Do you want to delete this tab and it's contents? This
                    cannot be undone.</span
                  >
                </modal-dialog>`
                    : ''
                }
              </label>
              <div class="tab-content">
                <slot name="content${i + 1}">text ${i + 1}</slot>
              </div>
            </div>
          `
        )
        .join('')}
      ${addTabs
        ? /* html*/ ` <button
            form="run-repl"
            formmethod="POST"
            formaction="/playground?${
              replKey ? `key=${replKey}` : ''
            }&addTab=true"
            type="submit"
            class="js-add-tab border-solid font-extrabold p-5 ml0 border border-solid radius3">
            <svg
              width="1.5rem"
              height="1.5rem"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4v16m8-8H4" />
            </svg>
          </button>`
        : ''}
      <slot name="add-tab-content"></slot>
    </div>

    <script type="module">
      class TabContainer extends HTMLElement {
        constructor() {
          super()
          this.addTab = this.addTab.bind(this)
          this.newTabTemplate = this.querySelector(
            'div[slot="add-tab-content"]'
          )
          this.newTabButton = this.querySelector('button.js-add-tab')
          this.tabs = this.querySelector('div.tabs')
          this.newTitle = this.newTabTemplate?.querySelector('[slot="title"]')
          this.newContent =
            this.newTabTemplate?.querySelector('[slot="content"]')
          if (this.addTabs) {
            this.newTabButton?.addEventListener('click', this.addTab)
          }
        }
        get addTabs() {
          return this.getAttribute('add-tabs')
        }
        connectedCallback() {}
        addTab() {
          console.log('trying to add')
          const id = Math.random().toString(32).slice(2)
          const group = this.querySelector('input').getAttribute('name')
          //TODO: Fix replKey
          const newTabHTML = (
            id,
            title,
            content,
            group,
            replKey = 'no-key'
          ) => \`
      <div class="tab">
        <input type="radio" id="tab-\${id}" name="\${group}"  />
        <label for="tab-\${id}">
          \${title}
            <modal-dialog>
              <span class="text0 inline-icon" slot="trigger">
                <svg class="inline-icon" xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </span>
              <button
              class=" text0 border1 border-dark border-solid radius0 p-4 "
              slot="action"
              form="run-repl"
              formmethod="POST"
              formaction="/playground?\${
                replKey ? \`key=\${replKey}\` : ''
              }&deleteTab=\${id}"
              type="submit"
             >Delete Tab</button>
             <span slot="message">Do you want to delete this tab and it's contents? This cannot be undone.</span>
              </modal-dialog>
        </label>
        <div class="tab-content">
          \${content}
        </div>
      </div>
      \`

          const title = this.newTitle.outerHTML
          const content = this.newContent.outerHTML
          const newTab = newTabHTML(id, title, content, group)
          this.newTabButton.insertAdjacentHTML('beforebegin', newTab)
        }
      }
      customElements.define('tab-container', TabContainer)
    </script>
  `
}
