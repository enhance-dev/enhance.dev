export default function DocCode({ html /* state */ }) {
  // const { attrs = {} } = state
  // let {
  //   lang = 'javascript',
  //   editable = false,
  //   'line-start': lineStart = 1,
  //   'active-lines': activeLines,
  // } = attrs

  // editable = typeof editable === 'string'
  // lineStart = Number(lineStart)
  // activeLines = activeLines ? activeLines.split('-') : []

  return html`
    <style>
      :host .editor {
        display: none;
      }
    </style>

    <slot></slot>
    <div class="editor"></div>

    <script type="module">
      import '/_static/js/elements/doc-code.mjs'
    </script>
  `
}
