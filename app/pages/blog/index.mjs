/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
  const { store } = state
  const { limit, offset, total } = store

  return html`
    <style scope="global">
      body {
        background-color: var(--accent-transparent);
        color: var(--blue-900);
        margin-block-start: var(--global-bar-height);
      }

      @font-face {
        font-family: "Source Code";
        src: url("/_public/fonts/SourceCodeVF.otf.woff2") format("woff2-variations");
        font-weight: 400 700;
      }
    </style>
    <site-masthead active="blog"></site-masthead>
    <main class="pbs2 pi-2">
      <begin-container>
        <blog-posts></blog-posts>
        <blog-pagination
          limit="${limit}"
          offset="${offset}"
          total="${total}"
          class="pbe3 pbe5-lg"
        ></blog-pagination>
      </begin-container>
    </main>
    <site-footer></site-footer>
  `
}
