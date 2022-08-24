export default function EmailSignup({ html }) {
  return html`
    <style scope="global">
      .radius1 {
        border-radius: 2px;
      }
    </style>
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
          mb0
          border-solid
          border1
          border-gradient
          radius1
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
            placeholder="you@email.com"
            />
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
    </div>
  `
}
