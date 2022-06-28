export default {
  entry: `export default async function handler() {

     return {
       document: html\`<div style="color:red;">"hello" "goodbye" </div>
      \`
      // <my-div>test</my-div>
       //<login-page></login-page>
     }
 }
`,
  'tab-1': `
 export default function LoginPage({html,state = {}}) {
   return  html\`
     <a href="#">
       <button>Login with GitHub</button>
     </a>
     <pre><code>

 </code></pre>

     <script type="module">
       class LoginPage extends HTMLElement {
         constructor() {
           super()
         }

         connectedCallback() {}
       }

       customElements.define('login-page', LoginPage)
     </script>
   \`
 }
 `,
  'tab-2': `
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
    <script>
    /*
    //customElements.define('my-div',MyDiv)
    */
   </script>
  \`
  }
`
}
