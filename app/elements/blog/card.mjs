export default function BlogPost ({ html, state }) {
  const { attrs, store } = state
  const { key } = attrs
  const { href, frontmatter } = store.posts[key]
  const { author, avatar, description, image, readtime, title } =
    frontmatter
  return html`
    <style>
      :host {
        display: block;
        background-color: var(--cloud-ateneo);
        border-radius: 0.5em;
      }

      blog-thumbnail {
        border-radius: 0.25em;
        overflow: hidden;
      }

      .avatar {
        width: 40px;
        aspect-ratio: 1 / 1;
      }
    </style>
    <a href="${href}" class="no-underline">
      <article
        class="p2-lg grid gap2-lg align-items-center-lg col-3-lg col-5-xl"
      >
        <blog-thumbnail
          src="${image}"
          alt="${title}"
          loading="lazy"
          class="m-2 m-none-lg order-2-lg col-span-1-lg col-span-2-xl"
        ></blog-thumbnail>
        <div class="p0 p-none-lg col-span-2-lg col-span-3-xl">
          <h1 class="font-bold leading2 text1 mbe0">${title}</h1>
          <p class="mbe2 text0">${description}</p>
          <div class="flex align-items-center">
            <img
              src="/_public/blog/${avatar}"
              alt="${author}’s avatar"
              class="radius-pill mie-1 flex-shrink-0 avatar"
            />
            <p class="flex-grow text0 tracking1">
              <span class="font-bold">${author}</span><br />
              ${readtime} to read
            </p>
          </div>
        </div>
      </article>
    </a>
  `
}
