import buildScoper from '../scope-css.mjs'
export default function PlaygroundPage({ html, state }) {
  const scope = buildScoper({
    scopeTo: 'playground-page',
    disable: !state?.store?.scopedCSS
  })
  return html`
    ${scope`
    <style>
      .min-row-height-playground {
        min-height: 18rem;
      }
    </style>
      `}
    <div class="bg-p2 text-p1">
      <nav-bar></nav-bar>
      <div class="m-auto ">
        <noscript>
          <button form="run-repl" type="submit">Run REPL</button>
        </noscript>
        <modal-dialog></modal-dialog>
        <div
          class="grid  col-1  col-2-lg flow-row text1 m1 m-none-lg justify-between">
          <tab-container quantity="3" add-tabs="true" class=" w-full h-screen ">
            <span slot="title1">index</span>
            <code-editor
              slot="content1"
              form-name="run-repl"
              doc-name="entrySrc">
            </code-editor>
            <span slot="title2">template-1</span>
            <code-editor
              slot="content2"
              form-name="run-repl"
              doc-name="component1Src"></code-editor>
            <span slot="title3">template-2</span>
            <code-editor
              slot="content3"
              form-name="run-repl"
              doc-name="component2Src">
            </code-editor>
            <div style="display:none" slot="add-tab-content">
              <span slot="title">component</span>
              <code-editor slot="content"> </code-editor>
            </div>
          </tab-container>
          <tab-container quantity="2" class=" w-full h-screen ">
            <span slot="title1">Preview</span>
            <enhance-preview slot="content1" doc-src="previewDoc">
            </enhance-preview>
            <span slot="title2">HTML</span>
            <markup-preview
              slot="content2"
              doc-name="enhancedMarkup"></markup-preview>
          </tab-container>
          <enhance-runner></enhance-runner>
        </div>
      </div>
      <noscript>
        <button form="run-repl" type="submit">Run REPL</button>
        <form id="run-repl" action="/repl" method="POST"></form>
      </noscript>
    </div>
  `
}
