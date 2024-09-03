/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
  const { store } = state
  const { limit, offset, total } = store

  return html`
    <style scope="global">
      /* Colors */
      body {
        background-color: var(--cloud-ateneo);
        color: var(--rift-white);
      }

      site-header {
        --site-header-background: white;
      }
    </style>

    <site-header active="/blog"></site-header>

    <main class="pbs2 pi-2 leading4">
      <site-container>
        <blog-posts></blog-posts>
        <blog-pagination
          limit="${limit}"
          offset="${offset}"
          total="${total}"
          class="pbe3 pbe5-lg"
        ></blog-pagination>
      </site-container>
    </main>
    <site-footer></site-footer>
  `
}
