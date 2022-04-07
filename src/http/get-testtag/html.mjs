import initRender from '@architect/views/render.mjs'
const html = initRender()

export default async function HTML() {
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
