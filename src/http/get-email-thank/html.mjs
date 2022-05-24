import { initRender } from '@architect/views/render.mjs'
import data from '@begin/data'
import importTransform from '@enhance/import-transform'
import tempImportTransform from '@architect/shared/script-regex-transform.mjs'
import map from '@architect/views/_bundles/map.mjs'
const transform = importTransform({ map })
let html = initRender({
  scriptTransforms: [tempImportTransform({ map })]
})

export default async function HTML() {
  try {
    return {
      statusCode: 200,
      html: html`<email-thank-page></email-thank-page>`
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      html: html`<error-page error=${err}></error-page>`
    }
  }
}
