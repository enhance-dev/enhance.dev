import arc from '@architect/functions'
import { getStyles } from '@enhance/arc-plugin-styles'

/** @type {import('@enhance/types').EnhanceHeadFn} */
export default function Head(state) {
  const { req, store } = state
  const { doc = {} } = store
  const { title: docTitle } = doc

  const title = docTitle ? `${docTitle} — Enhance` : 'Enhance'

  store.path = req.path || ''

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

    <meta name="image" content="/_public/img/enhance-open-graph.png" />
    <meta name="og:image" content="/_public/img/enhance-open-graph.png" />
    <meta name="og:type" content="website" />

    <link rel="manifest" href="${arc.static('/img/favicon/site.webmanifest')}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${getStyles.styleTag()}
    <title>${title}</title>
    <meta name='description' content='The HTML first full stack web framework.' />
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

      begin-masthead {
        --inline-padding: var(--space-0);
        --max-inline-size: 100vw;
        --accent: var(--mid-purple);
        font-size: var(--text-0);
      }

      @media screen and (min-width: 56em) {
        begin-masthead {
          --max-inline-size: var(--docs-max-width);
        }
      }
    </style>
  </head>
`
}
