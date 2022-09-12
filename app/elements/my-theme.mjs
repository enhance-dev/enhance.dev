export default function MyTheme({ html, state = {} }) {
  const { store = {} } = state
  return html`
    <style>
      /*set display none so it does not end up in the layout grid.*/
      :host {
        display: none;
      }
    </style>
    <style scope="global">
      :root {
        --header-height: 72px; /* measured height of header */
        --lg-screen: ${store.theme?.['lg-screen']};
        --focus-border: '1px dotted red';
        --primary-color: red;
        --secondary-color: blue;
        --primary-hover: pink;
      }
    </style>
  `
}
