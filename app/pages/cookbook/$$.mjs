export default function CookbookPage ({ html, state }) {
  const { store } = state
  const { recipe } = store
  const { title, html: recipeHtml } = recipe

  return html`
    <site-header active="/cookbook"></site-header>
    <site-container>
      <cookbook-article>
        <h1 class="text5 leading1 font-bold tracking-1 mb4">${title}</h1>
        ${recipeHtml}
      </cookbook-article>
    </site-container>
  `
}
