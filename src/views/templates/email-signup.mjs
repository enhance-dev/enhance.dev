export default function EmailSignup({ html }) {
  return html`
    <div
      class="
        font-sans
        text-center
      ">
      <form
        method="POST"
        action="/email/interest/add"
        class="
          flex
          flex-col
          flex-row-lg
          justify-between
          border-solid
          border1
          border-gradient
          mb0
        ">
        <label
          for="email-address"
          class="
            flex
            flex-grow
            overflow-hidden
          ">
          <input
            name="email-address"
            type="email"
            autocomplete="email"
            required
            class="
              flex-grow
              p0
              text0
            "
            placeholder="Add your email to the waitlist" />
        </label>
        <button
          type="submit"
          class="
            text0
            color-hover-white
            bg-purple
            bg-hover-dark-purple
            p0
            color-light
            font-bold
            radius-l-none
          ">
          Sign up
        </button>
      </form>
      <p class="text-1">*We hate SPAM. You won't get any from us.</p>
    </div>
  `
}
