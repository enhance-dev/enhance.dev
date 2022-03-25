export default function Document(body = '', arcStatic = () => '') {
  return /* html */ `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII=" rel="icon" type="image/x-icon">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="${arcStatic('/css/styles.css')}"/>
    <style>
      .bg-gradient {
        background-image: var(--bg-gradient)
      }
      .heading-size {
        font-size: clamp(2.5rem, 15vw, 8rem);
      }
      .sparkle-size {
        font-size: clamp(0rem, 10vw, 4rem);
      }

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
      .max-w-form {
        max-width: 21.78rem;
      }
    </style>
  </head>
  <body class="font-sans">
  ${body}
  </body>
</html>
  `
}
