const exampleObjectShape = {
  replState: {
    enhanceMarkup: '',
    previewDoc: '',
    openEditor: 1,
    openPreview: 1,
    source: {
      entry: {
        type: 'handler' /* or 'html'*/,
        code: ''
      },
      components: [
        { name: 'tag-name', code: '' },
        { name: 'another-tag', code: '' }
      ]
    }
  },
  solutionState: {
    enhanceMarkup: '',
    previewDoc: '',
    openEditor: 1,
    openPreview: 1,
    source: {
      entry: {
        type: 'handler' /* or 'html'*/,
        code: ''
      },
      components: [
        { name: 'tag-name', code: '' },
        { name: 'another-tag', code: '' }
      ]
    }
  }
}

export default {
  replState: {
    enhanceMarkup: '',
    previewDoc: '',
    openEditor: 1,
    openPreview: 1,
    source: {
      entry: {
        type: 'handler' /* or 'html'*/,
        code: `
export default async function handler() {
  return {
    document: html\`<div style="color:red;">"hello" "goodbye" <div>\`
  }
}`
      },
      tabs: [
        {
          'login-page': `
export default function LoginPage({html,state = {}}) {
  return  html\`
    <button>Login</button>
    <script type="module">
      class LoginPage extends HTMLElement {
        constructor() {
          super()
        }
         connectedCallback() {}
      }
      customElements.define('login-page', LoginPage)
    </script>\`
      }`
        },
        {
          'my-div': `
export default function MyDiv({html,state = {}}) {
  return  html\`
    <style>
      :host > div {
        color:red;
      }
    </style>
    <div><slot></slot></div>
    \`
      }`
        }
      ]
    }
  },
  solutionState: {
    enhanceMarkup: '',
    previewDoc: '',
    openEditor: 1,
    openPreview: 1,
    source: {
      entry: {
        type: 'handler' /* or 'html'*/,
        code: `
export default async function handler() {
  return {
    document: html\`<div> Solved! <div>\`
  }
}`
      },
      tabs: [
        {
          'login-page': `
export default function LoginPage({html,state = {}}) {
  return  html\`
    <button>Login</button>
    <script type="module">
      class LoginPage extends HTMLElement {
        constructor() {
          super()
        }
         connectedCallback() {}
      }
      customElements.define('login-page', LoginPage)
    </script>\`
      }`
        },
        {
          'my-div': `
export default function MyDiv({html,state = {}}) {
  return  html\`
    <style>
      :host > div {
        color:red;
      }
    </style>
    <div><slot></slot></div>
    \`
      }`
        }
      ]
    }
  }
}
