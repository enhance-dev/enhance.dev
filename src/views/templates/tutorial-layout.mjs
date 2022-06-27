export default function TutorialLayout({ html, state = {} }) {
  const { store = {} } = state
  return html`
    <style>
      :host {
        display: block;
        overflow: hidden;
      }
      :host > .wrapper > label {
        align-self: center;
        justify-self: center;
      }

      input[name='show-docs'] {
        grid-area: docs-input;
        display: block;
      }
      label[for='show-docs'] {
        grid-area: docs-label;
        display: block;
      }
      input[name='show-source'] {
        grid-area: source-input;
        display: block;
      }
      label[for='show-source'] {
        grid-area: source-label;
        display: block;
      }
      input[name='show-output'] {
        grid-area: output-input;
        display: block;
      }
      label[for='show-output'] {
        grid-area: output-label;
        display: block;
      }
      ::slotted([slot='docs']) {
        grid-area: docs;
        overflow-y: scroll;
        padding: 1.5rem;
      }
      ::slotted([slot='code-source']) {
        grid-area: code-source;
        overflow-y: scroll;
      }
      ::slotted([slot='code-output']) {
        grid-area: code-output;
        overflow-y: scroll;
      }

      :host > div.wrapper > div.container {
        grid-area: container;
        overflow: hidden;
      }
      :host > div.wrapper {
        display: grid;
        /*min-height: calc(100vh - var(--header-height));*/
        height: 100%;
        grid-template-columns: 1px 1fr 1px 1fr 1px 1fr;
        grid-template-rows: 1fr minmax(2rem, auto);
        grid-template-areas:
          'container container container container container container'
          'docs-input docs-label source-input source-label output-input output-label';
      }
      :host > div.wrapper > input {
        opacity: 0%;
      }
      :host > div.wrapper > div.container {
        display: grid;
        height: 100%;
        /*min-height: calc(100vh - var(--header-height) - 2rem);*/

        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        grid-template-areas: 'docs ';
      }
      input#show-docs:checked ~ div.container {
        grid-template-areas: 'docs';
      }
      input#show-source:checked ~ div.container {
        grid-template-areas: 'code-source';
      }
      input#show-output:checked ~ div.container {
        grid-template-areas: 'code-output';
      }
      input#show-docs:checked ~ div.container > ::slotted([slot='docs']),
      input#show-source:checked
        ~ div.container
        > ::slotted([slot='code-source']),
      input#show-output:checked
        ~ div.container
        > ::slotted([slot='code-output']) {
        display: block;
      }
      input#show-docs:not(:checked) ~ div.container > ::slotted([slot='docs']),
      input#show-source:not(:checked)
        ~ div.container
        > ::slotted([slot='code-source']),
      input#show-output:not(:checked)
        ~ div.container
        > ::slotted([slot='code-output']) {
        display: none;
      }
      input#show-docs:checked ~ div.container > ::slotted([slot='docs']) {
        display: block;
      }
      input#show-source:checked
        ~ div.container
        > ::slotted([slot='code-source']),
      input#show-output:checked
        ~ div.container
        > ::slotted([slot='code-output']) {
        display: grid;
      }
      @media (min-width: ${store.theme?.['lg-screen'] || '960px'}) {
        input#show-docs:not(:checked)
          ~ div.container
          > ::slotted([slot='docs']) {
          display: block;
        }
        input#show-source:not(:checked)
          ~ div.container
          > ::slotted([slot='code-source']),
        input#show-output:not(:checked)
          ~ div.container
          > ::slotted([slot='code-output']) {
          display: grid;
        }
        :host > div.wrapper > label {
          display: none;
        }
        :host > div.wrapper > input {
          display: none;
        }
        :host > div.wrapper > div.container {
          /*min-height: calc(100vh - var(--header-height));*/
          grid-template-columns: minmax(450px, 33%) auto;
          overflow-y: scroll;
          grid-template-rows: 1fr 1fr;
          grid-template-areas:
            'docs code-source'
            'docs code-output';
        }
        /* below adds the input with id to increase specificity */
        :host > div.wrapper > input#show-docs ~ div.container.container {
          grid-template-areas:
            'docs code-source'
            'docs code-output';
        }
        :host > div.wrapper {
          grid-template-columns: 1fr;
          grid-template-rows: 1fr;
          grid-template-areas: 'container';
        }
      }
    </style>
    <div class="wrapper">
      <label class="text0" for="show-docs">Docs</label>
      <input name="show-group" id="show-docs" type="radio" checked />
      <label class="text0" for="show-source">Source</label>
      <input name="show-group" id="show-source" type="radio" />
      <label class="text0" for="show-output">Output</label>
      <input name="show-group" id="show-output" type="radio" />
      <div class="container">
        <slot name="docs"></slot>
        <slot name="code-source"></slot>
        <slot name="code-output"></slot>
      </div>
    </div>

    <script type="module">
      class TutorialLayout extends HTMLElement {
        constructor() {
          super()
        }
        connectedCallback() {}
      }
      customElements.define('tutorial-layout', TutorialLayout)
    </script>
  `
}
