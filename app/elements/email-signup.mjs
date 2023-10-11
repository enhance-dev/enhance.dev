export default function EmailSignup({ html }) {
  return html`
    <style scope="global">
      .radius1 {
        border-radius: 4px;
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
          justify-content-between
          mbe0
          border-solid
          border1
          border-gradient
          radius1
          overflow-hidden
          ">
        <label
          for="email"
          class="
            flex
            flex-grow
          ">
          <input
            name="email"
            type="email"
            autocomplete="email"
            required
            class="
              flex-grow
              p0
              text0
              text-center
              text-start-lg
              border-none
              radius0-lg
              radius-b-none
              radius-r-none-lg
            "
            placeholder="you@email.com" />
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
          Yes Please!
        </button>
      </form>
    </div>
  `
}
