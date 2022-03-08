export default function LandingPage({ html }) {
  return html`
    <style>
      .max-h-sm {
        max-height: 16rem;
      }
      .max-w-lg {
        max-width: 48rem;
      }
    </style>
    <link rel="stylesheet" href="/components/styles.css" />
    <div class="bg-p2 text-p1">
      <nav-bar></nav-bar>
      <div class="m-auto max-w-lg">
        <page-header>
          <span slot="title">Enhance</span>
          <span slot="subtitle">
            An HTML first framework for building Functional Web Apps.
            <br />
            Stop chasing breaking changes in your framework and build apps that
            will work as long as the web does.
          </span>
        </page-header>
        <email-signup></email-signup>
        <div class="grid col-1 gap1 col-2-lg font-sans text1 m1 m-none-lg">
          <div>
            <h2>HTML First</h2>
            <hr class="border border-solid border0 border-t1" />
            <p class="font-thin">
              Build fully dynamic Functional Web Apps that work with no
              Javascript.
            </p>
          </div>
          <div>
            <h2>SSR Web Components</h2>
            <hr class="border border-solid border0 border-t1" />
            <p class="font-thin">
              Build server rendered component with no FOUC that seamlessly
              upgrade to powerful custom elements.
            </p>
          </div>
          <div>
            <h2>Progressive by design</h2>
            <hr class="border border-solid border0 border-t1" />
            <p class="font-thin">
              Enhance makes the right way the easy way. Some frameworks claim
              progressive enhancement but deliver empty app shells and spinners.
              Start with a version that works everywhere for everyone.
              Incrementally add advanced features from there.
            </p>
          </div>
          <div>
            <h2>Web Native</h2>
            <hr class="border border-solid border0 border-t1" />
            <p class="font-thin">
              Build using web standards so you don't have to constantly chase
              breaking changes. When you learn enhance you are learning native
              web standards that will last as long as the web does.
            </p>
          </div>
          <div>
            <h2>DOM Updates but good</h2>
            <hr class="border border-solid border0 border-t1" />
            <p>
              No more JQuery Spaghetti code. All the tools you need to use the
              platform in a performant and maintainable way.
            </p>
          </div>
        </div>
      </div>
    </div>
  `
}
