export default function Document(body = '', arcStatic = () => '') {
  return /* html */ `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link rel="apple-touch-icon" sizes="180x180" href="${arcStatic(
      '/img/favicon/apple-touch-icon.png'
    )}">
    <link rel="icon" type="image/png" sizes="32x32" href="${arcStatic(
      '/img/favicon/favicon-32x32.png'
    )}">
    <link rel="icon" type="image/png" sizes="16x16" href="${arcStatic(
      '/img/favicon/favicon-16x16.png'
    )}">
    <link rel="manifest" href="${arcStatic('/img/favicon/site.webmanifest')}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="${arcStatic('/css/styles.css')}"/>
    <link rel="stylesheet" href="${arcStatic('/css/syntax.css')}"/>
    <style>
      .bg-hover-dark-purple:hover {
        background-color: var(--dark-purple);
      }
      .bg-purple,
      .bg-purple:active {
        background-color: var(--purple);
      }
      .color-hover-white:hover {
        color: var(--white);
      }
      .color-light {
        color: var(--light);
      }
      .border-gradient {
        border-color: var(--purple);
      }
      .border-dark{
        border-color: var(--dark);
      }
    </style>
  </head>
  <body class="font-sans">
  ${body}
  </body>
</html>
  `
}
