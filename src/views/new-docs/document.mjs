import arc from '@architect/functions'

export default function document(doc, mountedRoute, activePath) {
  return /* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1">
  <title>Enhance Docs - "${doc.title || ''}"</title>
  <link rel="stylesheet" href="https://unpkg.com/highlight.js@11.5.1/styles/night-owl.css">
  <link rel="stylesheet" href="${arc.static('css/docs.css')}">
</head>
<body>
  <docs-header></docs-header>

  <docs-sidebar
    docs-route="${mountedRoute}"
    active-path="${activePath}"
  ></docs-sidebar>

  <main>
    <article>
      ${doc.title ? `<h1>${doc.title}</h1>` : ''}
      ${doc.html}
    <article>
  </main>

  <docs-doc-outline>
    <div class="toc" slot="toc">${doc.tocHtml}</div>
  </docs-doc-outline>
</body>
</html>
      `
}
