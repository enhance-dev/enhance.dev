import { initRender } from '@architect/views/render.mjs'
const html = initRender()
// import map from '@architect/views/_bundles/map.mjs'

export default async function HTML() {
  try {
    return {
      statusCode: 200,
      html: html` <app-wrap modals="one">
        <div slot="main">
          <modal-trigger name="one">test</modal-trigger>
          <tab-container quantity="3" style="width:100vw; height:100vh;">
            <p slot="title1" style="background:red;">tab1</p>
            <div slot="content1" style="background:red;">Content 1</div>
            <p slot="title2" style="background:green;">tab2</p>
            <div slot="content2" style="background:green;">Content 2</div>
            <p slot="title3" style="background:blue;">tab3</p>
            <div slot="content3" style="background:blue;">Content 3</div>
          </tab-container>
        </div>
        <div slot="one">test</div>
      </app-wrap>`,
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      html: html`<error-page error=${err}></error-page>`,
    }
  }
}
