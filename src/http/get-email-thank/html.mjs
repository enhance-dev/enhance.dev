import enhance from '@enhance/ssr'
import layout from '@architect/views/page-layout.mjs'
const { top, bottom } = layout
import elements from '@architect/views/elements.mjs'
let html = enhance()

export default async function HTML() {
  try {
    html = enhance({
      elements
      // initialState: {
      //   loggedIn: false,
      //   location: '/',
      //   menuLinks: [
      //     { name: 'Docs', location: '/docs' },
      //     { name: 'Tutorial', location: '/tutorial' },
      //     { name: 'Playground', location: '/playground' }
      //   ]
      // }
    })
    return {
      statusCode: 200,
      html: html` ${top()}
        <email-thank-page></email-thank-page>
        ${bottom}`
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      html: html`<error-page error=${err}></error-page>`
    }
  }
}
