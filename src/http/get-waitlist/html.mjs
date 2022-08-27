import enhance from '@enhance/ssr'
import elements from '@architect/views/elements.mjs'
import Head from '@architect/views/head.mjs'
import styleTransform from '@enhance/enhance-style-transform'

const html = enhance({
  elements,
  styleTransforms: [styleTransform],
})

export default async function HTML() {
  try {
    return {
      html: html`
      ${Head()}
      <landing-page></landing-page>
      `,
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      html: html`
      ${Head()}
      <error-page error=${err}></error-page>
      `,
    }
  }
}

