export default function BlogPagination ({ html, state }) {
  const { store } = state
  const { limit = 20, offset = 0, total = 1 } = store

  if (limit >= total) {
    return ``
  }

  const currentIndex = Math.floor(offset / limit)
  const totalPages = Math.ceil(total / limit)

  const buttons = new Array(totalPages)
    .fill('')
    .map((_, index) => index) // populate array values with indexes
    .filter(pageIndex => pageIndex >= currentIndex - 2 && pageIndex <= currentIndex + 2) // trim to 2 indexes before and after active index
    .map(
      pageIndex =>
        `<blog-pagination-button
           index="${pageIndex}"
           label="${pageIndex + 1}"
           ${pageIndex === currentIndex ? 'active' : ''}
         ></blog-pagination-button>`
    )

  const prevButton = currentIndex !== 0
    ? `<blog-pagination-button class="mie-auto mie-0-lg" index="${currentIndex - 1}" label="‹ Prev"></blog-pagination-button>`
    : ''

  const nextButton = currentIndex + 1 !== totalPages
    ? `<blog-pagination-button class="mis-auto mis-0-lg" index="${currentIndex + 1}" label="Next ›"></blog-pagination-button>`
    : ''

  const firstButton = currentIndex > 3
    ? '<blog-pagination-button class="hidden block-lg" index="0" label="« First"></blog-pagination-button>'
    : ''

  const lastButton = currentIndex < totalPages - 3
    ? `<blog-pagination-button class="hidden block-lg" index="${totalPages - 1}" label="Last »"></blog-pagination-button>`
    : ''

  return html`
    <style>
      :host {
        display: block;
      }

      @media screen and (min-width: 48em) {
        :host {
          display: flex;
          justify-content: center;
        }
      }

      nav {
        max-width: 60rem;
        background-color: white;
      }

      .squiggle3 {
        width: 120px;
        height: auto;
        top: 30px;
        left: -90px;
        pointer-events: none;
      }
    </style>
    <nav class="block inline-block-lg text-center p0">
      <ul class="flex justify-content-between">
        ${firstButton}
        ${prevButton}
        <div class='pages hidden flex-lg justify-content-center overflow-x-hidden'>
          ${buttons.join('')}
        </div>
        ${nextButton}
        ${lastButton}
      </ul>
    </nav>
  `
}
