/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
  const { store } = state
  const { limit, offset, total } = store

  return html`
    <style scope="global">
      :root {
        --site-max-width: 1440px;
      }
      body {
        background-color: var(--denim);
        color: var(--rift);
        margin-block-start: var(--global-bar-height);
      }

      @font-face {
        font-family: "Source Code";
        src: url("/_public/fonts/SourceCodeVF.otf.woff2") format("woff2-variations");
        font-weight: 400 700;
      }
    </style>

    <site-header active="/blog"></site-header>

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
