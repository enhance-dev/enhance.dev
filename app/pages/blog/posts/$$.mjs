import { parseDate } from '../../../lib/parseDate.mjs'

function mastodonUrl (handle) {
  // create https://indieweb.social/@tbeseda from @tbeseda@indieweb.social
  const parts = handle.split('@')
  return `https://${parts[2]}/@${parts[1]}`
}

/** @type {import('@enhance/types').EnhanceElemFn} */
export default function ({ html, state }) {
  const { store } = state
  const { post, series, mentions } = store
  const { frontmatter } = post
  const { author, avatar, published, twitter = '', mastodon = '', description = '' } = frontmatter

  const date = new Date(parseDate(published))
  const dateAsIsoString = date.toISOString()

  const webmentions = mentions?.length ? `<webmention-list></webmention-list>` : ''

  return html`
    <style scope="global">
      body {
        background-color: var(--cloud-ateneo);
      }
    </style>
    <style>
      :host {
        display: block;
      }

      site-container {
        background-color: var(--white-denim);
        border-radius: 0.5em;
      }

      article {
        max-width: 86ch;
      }

      .avatar {
        width: 40px;
        aspect-ratio: 1 / 1;
      }

      @media screen and (min-width: 56em) {
        .avatar {
          width: 60px;
        }
      }
    </style>
    <link rel="stylesheet" href="/_public/css/docs-colors.css" />

    <site-header></site-header>

    <div class="mi0 mi4-lg">
      <site-container>
        <article
          class="h-entry leading4 mi-auto mb0 mb4-lg p0 p5-lg pi6-xl"
        >
          <h1 class="text4 text5-lg leading1 font-bold p-name mbe2-lg">${post.frontmatter.title}</h1>

          <div class="flex align-items-center mb0 mbe2-lg">
            <img
              src="/_public/blog/${avatar}"
              alt="${author}’s avatar"
              class="radius-pill mie-1 flex-shrink-0 avatar"
            />
            <p class="flex-grow text-1">
              by <span class="font-bold">${author}</span><br />
              ${twitter !== '' ? `<a class="underline" rel="noopener noreferrer" target="_blank" href="https://twitter.com/${twitter}">@${twitter}</a><br />` : ''}
              ${mastodon !== '' ? `<a class="underline" rel="noopener noreferrer" target="_blank" href="${mastodonUrl(mastodon)}">${mastodon}</a><br />` : ''}
              on <time class="dt-published" datetime="${dateAsIsoString}">${published}</time>
            </p>
          </div>

          <blog-hero-image class="mbe3"></blog-hero-image>

          ${series?.length > 1 ? '<blog-series></blog-series>' : ''}

          <markdown-content>
            <section class="e-content" slot="doc">${post.html}</section>
          </markdown-content>
          <section class="p-summary hidden">${description}</section>
          <h-card class="hidden" name="${author}" photo="/_public/blog/${avatar}" ${mastodon ? `url="${mastodonUrl(mastodon)}"` : ''}></h-card>
          ${webmentions}
        </article>
      </site-container>
    </div>
    <site-footer></site-footer>
  `
}
