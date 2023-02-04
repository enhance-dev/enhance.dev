export default function CtaQrcode({ html, state }) {
  const { store } = state
  const { dataUrl } = store
  return html`<img src="${dataUrl}" />`
}
