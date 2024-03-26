import arc from '@architect/functions'

export default function DocCodeMirror ({ html /* state */ }) {
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
      import '${arc.static('js/elements/doc-code-mirror.mjs')}'
    </script>
  `
}
