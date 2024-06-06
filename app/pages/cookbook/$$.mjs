export default function CookbookPage ({ html, state }) {
  const { store } = state
  const { recipe } = store
  const { title, html: recipeHtml } = recipe

  return html`
    <style scope="global">
      /* Colors */
      body {
        background-color: var(--white-denim);
        color: var(--rift-white);
      }
      a {
        color: var(--purple-princess);
      }
    </style>
    <site-header active="/cookbook"></site-header>
    <site-container>
      <cookbook-article>
        <h1 class="text5 leading1 font-bold tracking-1 mb4">${title}</h1>
        ${recipeHtml}
      </cookbook-article>
    </site-container>
  `
}
