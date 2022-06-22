export default function TabsTabs({ html, state = {} }) {
  const id = Math.random().toString(32).slice(9)
  const addTabs = true
  const replKey = ''
  return html`
    <style>
      :host {
        display: block;
      }
      label[for$='${id}'] > ::slotted([slot*='tab']) {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
      }

      label[for$='${id}'],
      input[name='group-${id}'] {
        display: block;
      }
      input#show-1-${id} {
        grid-area: show-1-${id}-input;
      }
      label[for='show-1-${id}'] {
        grid-area: show-1-${id}-label;
      }
      input#show-2-${id} {
        grid-area: show-2-${id}-input;
      }
      label[for='show-2-${id}'] {
        grid-area: show-2-${id}-label;
      }
      input#show-3-${id} {
        grid-area: show-3-${id}-input;
      }
      label[for='show-3-${id}'] {
        grid-area: show-3-${id}-label;
      }
      :host > div.wrapper > div.container > ::slotted([slot='content-1']) {
        grid-area: content-1;
      }
      :host > div.wrapper > div.container > ::slotted([slot='content-2']) {
        grid-area: content-2;
      }
      :host > div.wrapper > div.container > ::slotted([slot='content-3']) {
        grid-area: content-3;
      }

      :host > div.wrapper > div.container {
        grid-area: container;
        display: grid;
        height: 100%;
        width: 100%;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        grid-template-areas: 'content-1';
      }
      :host > div.wrapper {
        display: grid;
        height: 100%;
        width: 100%;
        grid-template-columns:
          0px minmax(5rem, auto) 0px minmax(5rem, auto) 0px minmax(5rem, auto)
          1fr;
        grid-template-rows: minmax(1.5rem, auto) 1fr;
        grid-template-areas:
          'show-1-${id}-input show-1-${id}-label show-2-${id}-input show-2-${id}-label show-3-${id}-input show-3-${id}-label . '
          'container container container container container container container';
      }
      :host > div.wrapper > input {
        opacity: 0%;
      }

      input#show-1-${id}:checked ~ div.container {
        grid-template-areas: 'content-1';
      }
      input#show-2-${id}:checked ~ div.container {
        grid-template-areas: 'content-2';
      }
      input#show-3-${id}:checked ~ div.container {
        grid-template-areas: 'content-3';
      }
      input#show-1-${id}:checked
        ~ div.container
        > ::slotted([slot='content-1']),
      input#show-2-${id}:checked
        ~ div.container
        > ::slotted([slot='content-2']),
      input#show-3-${id}:checked
        ~ div.container
        > ::slotted([slot='content-3']) {
        display: block;
      }
      input#show-1-${id}:not(:checked)
        ~ div.container
        > ::slotted([slot='content-1']),
      input#show-2-${id}:not(:checked)
        ~ div.container
        > ::slotted([slot='content-2']),
      input#show-3-${id}:not(:checked)
        ~ div.container
        > ::slotted([slot='content-3']) {
        display: none;
      }
    </style>
    <div class="wrapper">
      <label part="tab" for="show-1-${id}"><slot name="tab1"></slot></label>
      <input name="group-${id}" id="show-1-${id}" type="radio" checked />
      <label part="tab" for="show-2-${id}"><slot name="tab2"></slot></label>
      <input name="group-${id}" id="show-2-${id}" type="radio" />
      <label part="tab" for="show-3-${id}"><slot name="tab3"></slot></label>
      <input name="group-${id}" id="show-3-${id}" type="radio" />
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
      <div class="container">
        <slot name="content-1"></slot>
        <slot name="content-2"></slot>
        <slot name="content-3"></slot>
      </div>
    </div>

    <script type="module">
      class TabsTabs extends HTMLElement {
        constructor() {
          super()
        }
        connectedCallback() {}
      }
      customElements.define('tabs-tabs', TabsTabs)
    </script>
  `
}
