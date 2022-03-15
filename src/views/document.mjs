export default function Document(body='') {
  return /* html */`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII=" rel="icon" type="image/x-icon">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/_static/css/styles.css"/>
    <style>
      .bg-gradient {
        background-image: var(--bg-gradient)
      }
      .heading-size {
        font-size: clamp(2.5rem, 15vw, 8rem);
      }
      .subheading-size {
        font-size: clamp(1rem, 2vw, 3rem);
      }
      .bg-purple {
        background-color: var(--purple);
      }
      .color-light {
        color: var(--light);
      }
      .border-gradient {
        border-image: var(--bg-gradient);
        border-image-slice: 1;
      }

    </style>
  </head>
  <body class="font-sans">
  ${body}
  </body>
</html>
  `
}