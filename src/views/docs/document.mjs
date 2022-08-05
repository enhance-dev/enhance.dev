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
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@docsearch/css@3" />
    <link
      rel="stylesheet"
      href="https://unpkg.com/highlight.js@11.5.1/styles/github.css" />
    <link
      rel="stylesheet"
      href="https://unpkg.com/highlight.js@11.5.1/styles/github-dark-dimmed.css"
      media="(prefers-color-scheme: dark)" />
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&family=Rubik:wght@200;300;400;500;600;700&display=swap');

      /* Colors */
      body {
        background-color: var(--white-denim);
        color: var(--rift-white);
        font-family: 'Rubik', sans-serif;
      }
      a {
        color: var(--purple-white);
      }
    </style>
  </head>
  <body class="">
    <docs-layout></docs-layout>
  </body>
</html>
  `
}
