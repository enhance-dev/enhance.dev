export default function LandingPage({ html }) {
  return html`
    <style scope="global">
      body {
        height: 100vh;
        background: linear-gradient(180deg, #74F1FF 71.87%, #C1FFFB 100%) no-repeat center center fixed;
        background-size: cover;
      }
    </style>
    <style>
      :host {
        height: 100vh;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr auto;
        grid-template-areas:
          'header'
          'main'
          'footer';
        padding-top: 1.5rem;
      }

      :host > header {
        grid-area: header;
      }

      :host > footer {
        grid-area: footer;
      }

      :host > main {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        grid-area: main;
        padding: 3rem;
      }

      :host > main > section {
        color: var(--light);
        background-color: #003451;
      }

      :host > main > section > email-signup {
        color: initial;
      }


      @media only screen and (min-width:48em) {

        :host > main {
          grid-template-columns: repeat(6, 1fr);
          grid-template-rows: repeat(3, 1fr);
        }

        :host > main > section {
          background-color: #003451;
          grid-row: 2;
          grid-column: 2 / 6;
        }

        :host > main > cherub-mascot {
          grid-row: 2;
          grid-column: 5;
          margin: -6rem -3rem 0rem 2rem;
        }
      }

    </style>
    <header
      class="
       flex
       justify-center
       items-center
      "
    >
    <cherub-head class="mr0"></cherub-head>
    <h2 class="text1 pt-3 font-bold">
      Enhance
    </h2>
    </header>
    <main
        class="
          m-auto
          p2
        "
      >
      <section
        class="
          flex
          flex-col
          p3
          radius1
        "
      >
      <h1
        class="
          mb2
          text2
          text3-lg
          text-center
          font-light
        "
      >
         ✨ Sign up for the waitlist!
        </h1>
        <email-signup
          class="
            block
            self-end
            w-full
          "
         ></email-signup>
      </section>
      <cherub-mascot></cherub-mascot>
    </main>
    <footer>
      <enhance-land></enhance-land>
    </footer>
  `
}
