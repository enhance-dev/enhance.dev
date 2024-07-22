import { parseDate }  from '../../../lib/parseDate.mjs'

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
    <style>
      :host {
        display: block;
        padding-block-start: var(--space-0);
      }

      begin-container {
        background-color: white;
        border-radius: 0.5em;
      }

      .avatar {
        width: 40px;
        aspect-ratio: 1 / 1;
      }

      @media screen and (min-width: 56em) {
        article {
          max-width: 58rem;
        }

        .avatar {
          width: 60px;
        }
      }

      @media screen and (min-width: 76em) {
        article {
          max-width: 64rem;
        }
      }

    </style>
    <link rel="stylesheet" href="/_public/css/docs-colors.css" />

    <site-header active="/blog"></site-header>

    <div class="mi0">
      <begin-container class="relative">
        <article
          class="h-entry font-sans leading4 mi-auto mb0 mb4-lg p0 p5-lg pi6-xl"
        >
          <begin-h1 class="p-name mbe2-lg">${post.frontmatter.title}</begin-h1>

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
      </begin-container>
    </div>
    <site-footer></site-footer>
  `
}
