import arc from '@architect/functions'

/** @type {import('@enhance/types').EnhanceHeadFn} */
export default function Head() {
  const title = 'Enhance docs'
  return `
<!DOCTYPE html>
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
  <link rel="manifest" href="${arc.static('/img/favicon/site.webmanifest')}">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="${arc.static('/css/styles.css')}"/>
  <link rel="stylesheet" href="${arc.static('/css/docs-colors.css')}" />
  <link rel="stylesheet" href="${arc.static('/css/docs-highlight.css')}" />
  <link rel="stylesheet" href="${arc.static('/bundles/docsearch-css.css')}" />
  <title>${title}</title>
</head>
`
}
