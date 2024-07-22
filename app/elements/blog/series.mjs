export default function BlogSeries({ html, state }) {
  const { store } = state
  const { post: activePost, series } = store

  const seriesMarkup = series.map((seriesPost, index) => `<blog-series-entry ${seriesPost.title === activePost.frontmatter.title ? "active" : ""} index="${index + 1}" href="${seriesPost.href}" title="${seriesPost.title}"></blog-series-entry>`).join('')

  return html`
    <style>
      nav {
        background-color: var(--smoke);
        border-color: var(--green);
      }

      ol {
        list-style: none;
        counter-reset: number-counter;
      }

      ol li {
        counter-increment: number-counter;
      }

      ol li:before {
        font-family: var(--font-mono);
        display: inline-block;
        padding-right: 0.5ch;
        content: counter(number-counter) '.';
        font-weight: 600;
      }

    </style>
    <nav class="mb3 p0 border-solid border-is3">
      <h1 class="text1 font-semibold">${activePost.frontmatter.series}</h1>
      <p class="text-1 uppercase tracking2 mbe0">A ${series.length} part series</p>
      <ol>
        ${seriesMarkup}
      </ol>
    </nav>
  `
}
