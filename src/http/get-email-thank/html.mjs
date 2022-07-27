import html from '@architect/views/render.mjs'

export default async function HTML() {
  try {
    return {
      statusCode: 200,
      html: html`<email-thank-page></email-thank-page>`,
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      html: html`<error-page error=${err}></error-page>`,
    }
  }
}
