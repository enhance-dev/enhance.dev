export default function BlogPosts({ html, state }) {
  const { store } = state
  const { posts = [], offset, limit } = store

  const cards = posts
    .sort((a, b) =>
      new Date(a.frontmatter.published) < new Date(b.frontmatter.published)
        ? 1
        : -1
    )
    .slice(offset, offset + limit)
    .map((o, i) =>
      i !== 0 || parseInt(offset) !== 0
        ? `<blog-card key="${i + offset}">post</blog-card>`
        : `<blog-featured-card key="${i + offset}">
             featured post
           </blog-featured-card>`
    )
    .join('')

  return html`
    <style>
      section {
        max-width: 60rem;
        color: var(--dark);
      }
    </style>
    <section class="mi-auto pb0 pb2-sm pb4-md grid gap2">
      ${cards}
    </section>
  `
}
