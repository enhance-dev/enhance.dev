import buildScoper from '../scope-css.mjs'
export default function PlaygroundPage({ html, state }) {
  const scope = buildScoper({
    scopeTo: 'playground-page',
    disable: !state?.store?.scopedCSS
  })
  const key = state.store?.replKey || ''
  const openEditor = state.store?.repl?.openEditor || 1
  const openPreview = state.store?.repl?.openPreview || 1
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
          <button
            class=" text0 border1 border-dark border-solid radius0 p-4 "
            form="run-repl"
            type="submit">
            Run REPL
          </button>
        </noscript>
        <button
          type="submit"
          class=" text0 border1 border-dark border-solid radius0 p-4 "
          form="run-repl"
          formmethod="POST"
          formaction="/playground?key=${key}">
          Save
        </button>
        <div
          class="grid  col-1  col-2-lg flow-row text1 m1 m-none-lg justify-between">
          <tab-container
            quantity="3"
            tab-group-name="openEditor"
            tab-state-form="run-repl"
            add-tabs="true"
            default-tab="${openEditor}"
            class=" w-full h-screen ">
            <span slot="title1">index</span>
            <code-editor
              slot="content1"
              form-name="run-repl"
              doc-name="entrySrc">
            </code-editor>
            <span slot="title2">Comp-1</span>
            <code-editor
              slot="content2"
              form-name="run-repl"
              doc-name="component1Src"></code-editor>
            <span slot="title3">Comp-2</span>
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

          <tab-container
            tab-group-name="openPreview"
            default-tab="${openPreview}"
            tab-state-form="run-repl"
            quantity="2"
            class=" w-full h-screen ">
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
