import arc from '@architect/functions'
import { getStyles } from '@enhance/arc-plugin-styles'

/** @type {import('@enhance/types').EnhanceHeadFn} */
export default function Head(state) {
  const { store } = state
  const { doc = {} } = store
  const { title: docTitle } = doc

  const title = docTitle ? `${docTitle} — Enhance` : 'Enhance'

  const docsCSS = docTitle
    ? `
      <link rel="stylesheet" href="${arc.static('/css/docs-colors.css')}" />
      <link rel="stylesheet" href="${arc.static('/css/docs-highlight.css')}" />
      <link rel="stylesheet" href="${arc.static(
        '/bundles/docsearch-css.css'
      )}" />
    `
    : ''

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

    <meta name="image" content="/_public/img/enhance-open-graph.png" />
    <meta name="og:image" content="/_public/img/enhance-open-graph.png" />
    <meta name="og:type" content="website" />
    ${docsCSS}
    <link rel="manifest" href="${arc.static('/img/favicon/site.webmanifest')}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${getStyles.styleTag()}
    <title>${title}</title>
    <meta name='description' content='The HTML first full stack web framework.' />
    <style>
      @font-face {
        font-family: "Rubik";
        src: url("/_public/font/rubik-var.woff2") format("woff2-variations");
        font-weight: 400 900;
      }
      @font-face {
        font-family: "Rubik";
        src: url("/_public/font/rubik-italic-var.woff2") format("woff2-variations");
        font-weight: 400 900;
        font-style: italic;
      }
    </style>
  </head>
`
}
