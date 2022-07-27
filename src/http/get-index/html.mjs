import html from '@architect/views/render.mjs'

export default async function HTML() {
  try {
    return {
      statusCode: 200,
      html: html`<landing-page></landing-page>`,
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      html: html`<error-page error=${err}></error-page>`,
    }
  }
}
