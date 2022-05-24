import { initRender } from '@architect/views/render.mjs'
const html = initRender()
// import map from '@architect/views/_bundles/map.mjs'

export default async function HTML() {
  // return {
  //   statusCode: 200,
  //   html: `
  //   <div>HELLO WORLD</div>
  //   <script type="module">
  //     import Store from '${map['/_bundles/store.mjs']}'
  //     import API from '${map['/_bundles/api.mjs']}'
  //     import enhance from '${map['/_bundles/enhance.mjs']}'
  //     import beautify from '${map['/_bundles/beautify.mjs']}'
  //     import Prism from '${map['/_bundles/prism.mjs']}'
  //     import {javascript} from '${map['/_bundles/codemirror.mjs']}'

  //     console.log("javascript loaded")
  //   </script>
  //   `
  // }
  try {
    return {
      statusCode: 200,
      html: html`<modal-dialog> </modal-dialog>`
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      html: html`<error-page error=${err}></error-page>`
    }
  }
}
