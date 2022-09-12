export default function ErrorPage({ html, state = {} }) {
  const { error = '' } = state.attrs
  return html`
    <h1>Oops, something went wrong 😕</h1>
    <p>${error?.message || error}</p>
    <pre><code>
${JSON.stringify(error, null, 2)}
</code></pre>
  `
}
