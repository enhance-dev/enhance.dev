export default {
  entry: ` html\`
  <my-div>I'm Red</my-div>
  <div>but I'm not</div>
  \`
`,
  'tab-1': `
  export default function({html}){
  return html\`
    <style>
      div.container {
        color:red;
      }
    </style>
    <div class="container>
      <slot></slot>
    </div>
  \`
  }
`
}
