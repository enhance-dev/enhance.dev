import buildScoper from '../scope-css.mjs'
export default function TabContainerTemplate({ html, state = {} }) {
  const id = Math.random().toString(32).slice(2)
  const quantity = parseInt(state?.attrs?.quantity, 10) || 1
  const defaultTab = parseInt(state?.attrs['default-tab'], 10) || 1
  const scope = buildScoper({
    instance: id,
    scopeTo: 'tab-container',
    disable: !state?.store?.scopedCSS
  })
  return html`
    ${scope`
    <style enh-scope="component">
      :host {
        display:block;
      }

      ::slotted([slot^="title"]){
        color:var(--p2);
       font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      }

      .tabs {
        position: relative;
        height: 100vh;
        width: 100%;
        margin: 25px 0;
      }
      .tab {
        float: left;
      }
      .tab label {
        background: white; 
        padding: .5rem; 
        border: 1px solid red;
        cursor: pointer;
        margin-left: -1px; 
      }
      .tab:first-child label {
        margin-left: 0;
      }
      .tab input[type=radio] {
       position: absolute;
       opacity:0;
      }

    
      .tab-content {
        position: absolute;
        top: 2rem;
        left: 0;
        right: 0;
        bottom: 0;
        background: white;
        border: 1px solid #ccc;
        display: none;
      }
      input[type=radio][name="tab-group-${id}"]:checked ~ label {
        background: white;
        border-bottom: 1px solid white;
      }
    
     
       input[type=radio][name="tab-group-${id}"]:not(:checked) ~ label {
        background: gray;
        border-bottom: 1px solid white;
      }
      input[type=radio][name="tab-group-${id}"]:checked ~ label ~ .tab-content {
        display: block;
      }
    </style>
      `}
    <link rel="stylesheet" href="/components/styles.css" />

    <div class="tabs">
      ${[...Array(quantity)]
        .map(
          (_, i) => `
      <div class="tab">
        <input type="radio" id="tab${i + 1}-${id}" name="tab-group-${id}" ${
            i + 1 === defaultTab ? 'checked' : ''
          } />
        <label for="tab${i + 1}-${id}"><slot name="title${i + 1}">tab${
            i + 1
          }</slot></label>
        <div class="tab-content">
          <slot name="content${i + 1}">text ${i + 1}</slot>
        </div>
      </div>
      `
        )
        .join('')}
    </div>

    <script type="module">
      class TabContainer extends HTMLElement {
        constructor() {
          super()
        }
      }
      customElements.define('tab-container', TabContainer)
    </script>
  `
}
