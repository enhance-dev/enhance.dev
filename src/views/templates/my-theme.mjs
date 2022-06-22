export default function MyTheme({ html, state = {} }) {
  const { store = {} } = state
  return html`
    <style scope="global">
      :root {
        --header-height: 72px; /* measured height of header */
        --lg-screen: ${store.theme?.['lg-screen']};
        --focus-border: '1px dotted red';
      }
    </style>
  `
}
