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
          <tabs-tabs style="width:100vw; height:100vh;">
            <p slot="tab1" style="background:red;">tab1</p>
            <div slot="content-1" style="background:red;">Content 1</div>
            <p slot="tab2" style="background:green;">tab2</p>
            <div slot="content-2" style="background:green;">Content 2</div>
            <p slot="tab3" style="background:blue;">tab3</p>
            <div slot="content-3" style="background:blue;">Content 3</div>
          </tabs-tabs>
        </div>
        <div slot="one">test</div>
      </app-wrap>`
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      html: html`<error-page error=${err}></error-page>`
    }
  }
}
