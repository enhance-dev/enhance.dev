export default function EmailThankPage({ html }) {
  return html`
    <style scope="global">
      body {
        height: 100vh;
        background-color: #c1fffb;
        background-image: linear-gradient(180deg, #74f1ff 71.87%, #c1fffb 100%);
        background-attachment: fixed;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
      }
    </style>
    <style>
      :host {
        min-width: 17rem;
        --navy: #003451;
      }

      :host > main {
        min-width: 17rem;
        margin: 0 auto;
      }

      :host > main > h1 {
        font-size: 3rem;
        font-weight: 700;
        color: var(--navy);
      }

      :host > main > h2 {
        font-size: 1.5rem;
        font-weight: 200;
        color: var(--navy);
      }

      :host > main > axol-wink {
        max-width: 20rem;
      }

      @media only screen and (min-width: 48em) {
        :host > main > h1 {
          font-size: 6rem;
          font-weight: 700;
        }

        :host > main > h2 {
          font-size: 2.5rem;
          font-weight: 100;
        }
      }
    </style>
    <main class="flex flex-col align-items-center p3">
      <h1 class="mbe-2">Thanks!</h1>
      <h2 class="mbe5">We'll be in touch</h2>
      <axol-wink></axol-wink>
    </main>
    <script type="module">
      window.setTimeout(() => {
        window.location.href = '/'
      }, 3000)
    </script>
  `
}
