import arc from '@architect/functions'
import { getStyles } from '@enhance/arc-plugin-styles'

/** @type {import('@enhance/types').EnhanceHeadFn} */
export default function Head (state) {
  const { req, store } = state
  const {
    doc = {},
    pageTitle = '',
    pageDescription = '',
    pageImage = '',
    activeRoute = ''
  } = store
  const { title: docTitle } = doc

  const title = (docTitle || pageTitle) ? `${docTitle || pageTitle} — Enhance` : 'Enhance'
  const description = pageDescription ? pageDescription : 'The HTML first full stack web framework'
  const ogImage = pageImage ? pageImage : '/_public/img/enhance-open-graph.png'

  store.path = req.path || ''

  let extraBlogMeta = []

  if (activeRoute === 'blog') {
    if (store.post?.frontmatter?.author) {
      extraBlogMeta.push(`<meta property="article:author" content="${store.post.frontmatter.author}" />`)
    }
    if (store.post?.frontmatter?.published) {
      let pubDate = new Date(store.post.frontmatter.published)
      pubDate.setHours(13)
      let dateString = pubDate.toISOString().replace('Z', '-0:00')
      extraBlogMeta.push(`<meta property="article:published_time" content="${dateString}" />`)
    }
    if (store.post?.frontmatter?.category) {
      store.post.frontmatter.category.split(',').forEach(item => extraBlogMeta.push(`<meta property="article:tag" content="${item.trim()}">`))
    }
  }

  const indexMe = process.env.ARC_ENV === 'production'
    ? ''
    : `<meta name="robots" content="noindex">`

  return /* html */ `
<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset="UTF-8">
    <link rel="apple-touch-icon" sizes="180x180" href="${arc.static(
    '/img/favicon/apple-touch-icon.png'
  )}">
    <link rel="icon" type="image/png" sizes="32x32" href="${arc.static(
    '/img/favicon/favicon-32x32.png'
  )}">
    <link rel="icon" type="image/png" sizes="16x16" href="${arc.static(
    '/img/favicon/favicon-16x16.png'
  )}">
    <link href="https://fosstodon.org/@enhance_dev" rel="me">

    <link rel="stylesheet" href="${arc.static('/css/docs-colors.css')}" />
    <link rel="stylesheet" href="${arc.static('/css/docs-highlight.css')}" />
    <link rel="stylesheet" href="${arc.static('/bundles/docsearch-css.css')}" />

    <meta name="og:type" content="website" />

    <link rel="manifest" href="${arc.static('/img/favicon/site.webmanifest')}">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    ${getStyles.styleTag()}

    <title>${title}</title>
    <meta name='description' content="${description}"/>

    <!-- Open Graph -->
    <meta name="og:title" content="${title}" />
    <meta name="og:description" content="${description}" />
    <meta name="og:image" content="${ogImage}" />
    <meta name="og:site_name" content="Enhance" />
    <meta name="og:type" content="website" />

    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:site_name" content="Enhance" />
    <meta property="og:type" content="website" />

    <!-- Twitter -->
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image:src" content="${ogImage}" />

    ${extraBlogMeta.join('\n')}
    ${indexMe}

    <style>
      @font-face {
        font-family: "Montserrat";
        src: url("/_public/fonts/montserrat-subset-var.woff2") format("woff2-variations");
        font-weight: 300 900;
      }

      @font-face {
        font-family: "Montserrat";
        src: url("/_public/fonts/montserrat-italic-subset-var.woff2") format("woff2-variations");
        font-weight: 400 700;
        font-style: italic;
      }

      html,
      body {
        font-family: Montserrat, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        text-rendering: optimizeLegibility;
        font-weight: 450;
        overflow-x: hidden;
        overflow-y: auto;
      }

      body {
        margin-block-start: var(--nav-height); /* set in site-header.mjs */
      }

      em {
        font-weight: 400;
      }

      @media (prefers-reduced-motion: no-preference) {
        html {
          scroll-behavior: smooth;
        }
      }

      .clip {
        clip: rect(1px, 1px, 1px, 1px);
        clip-path: inset(50%);
        height: 1px;
        width: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
      }
    </style>
  </head>
`
}
