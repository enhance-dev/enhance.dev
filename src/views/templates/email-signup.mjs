import buildScoper from '../scope-css.mjs'
export default function EmailSignup({ html, state = {} }) {
  const scope = buildScoper({
    scopeTo: 'email-signup',
    disable: !state?.store?.scopedCSS
  })
  return html`
    ${scope`
    <style enh-scope="component">
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
      <form
        method="POST"
        action="/email/interest/add"
        class="mb0"
      >
        <label
          for="email-address"
          class="visually-hidden"
        >
          Email address
        </label>
        <div
          class="
            flex
            justify-center
          "
        >
          <input
            name="email-address"
            type="email"
            autocomplete="email"
            required
            class="
              p0
              text0
              radius0
              border-solid
              border1
              border-gradient
            "
            placeholder="Add your email to the wait list"
          />
          <button
            type="submit"
            class="
              text0
              bg-purple
              p0
              color-light
              font-bold
              radius-l-none
            "
          >
            Sign up
          </button>
        </div>
      </form>
      <p class="text-1">
        * We hate SPAM. You won't get any from us.
      </p>
    </div>
  `
}
