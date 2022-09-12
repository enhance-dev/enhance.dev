export default function LoginPage(state = {}) {
  const { href } = state
  return /* html*/ `
    <a href="${href}">
      <button>Login with GitHub</button>
    </a>
    <pre><code>
  ${href}
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
  `
}
