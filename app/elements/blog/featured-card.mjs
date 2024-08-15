export default function BlogFeaturedPost ({ html, state }) {
  const { attrs, store } = state
  const { key } = attrs
  const { href, frontmatter } = store.posts[key]
  const { author, avatar, description, image, readtime, title } = frontmatter
  return html`
    <style>
      :host {
        display: block;
        background-color: var(--white-denim);
        border-radius: 0.5em;
      }

      blog-image {
        border-radius: 0.5em 0.5em 0 0;
        overflow: hidden;
      }

      .avatar {
        width: 40px;
        aspect-ratio: 1 / 1;
      }

      @media screen and (min-width: 56em) {
        blog-image {
          border-radius: 0.25em;
        }

        img {
          width: 100%;
        }

        .avatar {
          width: 60px;
        }

        .description {
          max-width: 62ch;
        }
      }
    </style>
    <a href="${href}" class="no-underline">
      <article class="p0-lg">
        <blog-image src="${image}" alt="${title}" class="block" fetchpriority="high"></blog-image>
        <div class="pi0 pi-2-lg pb2 pbs1-lg">
          <h1 class="font-bold leading2 text3 text4-lg mbe0">${title}</h1>
          <p class="mbe2 description">${description}</p>
          <div class="flex align-items-center">
            <img
              src="/_public/blog/${avatar}"
              alt="${author}’s avatar"
              class="radius-pill mie-1 flex-shrink-0 avatar"
            />
            <p class="flex-grow text0 tracking1 tracking0-lg">
              <span class="font-bold">${author}</span><br />
              ${readtime} to read
            </p>
          </div>
        </div>
      </article>
    </a>
  `
}
