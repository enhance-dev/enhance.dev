import arc from '@architect/functions'

export default function document(title = '') {
  return /* html */ `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta
      name="viewport"
      content="width=device-width, minimum-scale=1, initial-scale=1" />
    <title>Enhance docs${` - ${title}` || ''}</title>
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
    <link rel="stylesheet" href="${arc.static('css/styles.css')}" />
    <link rel="stylesheet" href="${arc.static('css/docs-colors.css')}" />
    <link rel="stylesheet" href="${arc.static('css/docs-highlight.css')}" />
    <link rel="stylesheet" href="${arc.static('css/algolia-styles.css')}" />
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&family=Rubik:wght@200;300;400;500;600;700&display=swap');

      /* Colors */
      body {
        background-color: var(--white-denim);
        color: var(--rift-white);
      }
      a {
        color: var(--purple-princess);
      }

      /* Scrollbars */
      body {
        scrollbar-color: var(--grey-greyer) transparent;
      }
      ::-webkit-scrollbar {
        height: 8px;
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background-color: transparent;
      }
      ::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background-color: var(--grey-greyer);
      }
    </style>
  </head>
  <body class="font-rubik">
    <docs-symbols></docs-symbols>
    <docs-layout></docs-layout>
  </body>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-FQHNPN78V3"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-FQHNPN78V3');
  </script>
</html>
  `
}
