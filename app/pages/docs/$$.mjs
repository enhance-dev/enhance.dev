/* eslint-disable filenames/match-regex */

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
  console.log(state)
  return html`
    <style scope="global">
      @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&family=Rubik:wght@200;300;400;500;600;700&display=swap');

      /* Colors */
      body {
        background-color: var(--white-denim);
        color: var(--rift-white);
        font-family: rubik;
      }
      a {
        color: var(--purple-princess);
      }

      /* Scrollbars */
      body {
        scrollbar-color: var(--grey-greyer) transparent;
      }
      ::-webkit-scrollbar {
        height: 8px;
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background-color: transparent;
      }
      ::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background-color: var(--grey-greyer);
      }
    </style>

    <docs-symbols></docs-symbols>
    <docs-layout></docs-layout>
    <google-analytics code="${ state.store.gacode }"></google-analytics>
  `
}
