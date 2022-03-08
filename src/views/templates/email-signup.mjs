import buildScoper from '../scope-css.mjs'
export default function EmailSignup({ html, state = {} }) {
  const scope = buildScoper({
    scopeTo: 'email-signup',
    disable: !state?.store?.scopedCSS
  })
  return html`
    ${scope`
    <style enh-scope="component">
    :host {
      display:block;
      margin: 3rem;
    }
    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap; /* added line */
      border: 0;
}
    </style>
   `}

    <div class=" font-sans text-center ">
      <div class="">
        <div class="">
          <h2>Sign up for the wait list.</h2>
          <p class="">
            We will let you know as soon as enhance is ready to try!
          </p>
        </div>
        <div class="">
          <form class="" method="POST" action="/email/interest/add">
            <label for="email-address" class="visually-hidden"
              >Email address</label
            >
            <div class="flex justify-center">
              <input
                name="email-address"
                type="email"
                autocomplete="email"
                required
                class="text0 bg-p1 m-1 pt-3 pb-3 pl0 pr0 radius0"
                placeholder="Enter your email" />
              <div class="">
                <button
                  type="submit"
                  class="text0 bg-p0 m-1 pt-3 pb-3 pl0 pr0 radius0">
                  Sign up
                </button>
              </div>
            </div>
          </form>
          <p class="text-1">* We all hate SPAM. You won't get any from us.</p>
        </div>
      </div>
    </div>
  `
}
