import arc from '@architect/functions'

export default function document(title = '') {
  return /* html */ `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta
      name="viewport"
      content="width=device-width, minimum-scale=1, initial-scale=1" />
    <title>Enhance Docs${` - "${title}"` || ''}</title>
    <link rel="icon" href="https://fav.farm/✨" />
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
    </style>
  </head>
  <body class="font-rubik">
    <docs-layout></docs-layout>
  </body>
</html>
  `
}
