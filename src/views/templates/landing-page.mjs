export default function LandingPage({ html }) {
  return html`
    <style scope="global">
      body {
        height: 100vh;
        background-color: #C1FFFB;
        background-image: linear-gradient(180deg, #74F1FF 71.87%, #C1FFFB 100%);
        background-attachment: fixed;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
      }
    </style>
    <style>
      :host {
        min-width: 17rem;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr auto;
        grid-template-areas:
          'header'
          'main'
          'footer';
        --navy: #003451;
      }

      :host > header {
        grid-area: header;
      }

      :host > footer {
        grid-area: footer;
      }

      :host > main {
        grid-area: main;
      }

      :host > main > .heading > h1  {
        font-size: 3rem;
        font-weight: 700;
        color: var(--navy);
      }

      :host > main > .heading > h2  {
        font-size: 1.5rem;
        font-weight: 200;
      }

      :host > main > section {
        color: var(--light);
        background-color: var(--navy);
        border-radius: 4px;
      }

      :host > main > section > email-signup {
        color: initial;
      }


      @media only screen and (min-width:48em) {
        :host > main {
          grid-template-columns: repeat(5, 1fr);
          grid-template-rows: 15rem 5rem 11rem 1fr;
        }

        :host > main > .heading {
          width: 50rem;
          grid-column: 1 / 6;
        }

        :host > main > .heading > h1  {
          font-size: 6rem;
          font-weight: 700;
        }

        :host > main > .heading > h2  {
          font-size: 2.5rem;
          font-weight: 100;
        }

        :host > main > section {
          grid-row: 3;
          grid-column: 2 / 5;
        }

        :host > main > cherub-mascot {
          grid-row: 3;
          grid-column: 5;
          margin-top: -6rem;
          margin-left: -4rem;
        }
      }

    </style>
    <header
      class="
        mb5
        mb-none-lg
        pl3
        pt1
      "
    >
      <div
        class="
         flex
         justify-start
         items-center
        "
      >
        <cherub-head class="mr0"></cherub-head>
        <h2 class="text1 pt-3 font-bold">
          Enhance
        </h2>
      </div>
    </header>
    <main
        class="
          flex
          flex-col
          grid-lg
          justify-start
          m-auto
        "
      >
      <div
        class="
          heading
          text-center
          self-center
          mb5
          m-none-lg
        "
      >
        <h1 class="tracking-1">
          Enhance
        </h1>
        <h2>
          A framework for HTML
        </h2>
      </div>
      <section
        class="
          flex
          flex-col
          justify-center
          p1
          p3-lg
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
         ✨ Sign up for the waitlist?
        </h1>
        <email-signup
          class="
            block
            self-end
            w-full
          "
         ></email-signup>
      </section>
        <cherub-mascot
          class="
            block
            self-end
            self-start-lg
            pt5
            p-none-lg
          "
        ></cherub-mascot>
    </main>
    <footer>
      <enhance-land></enhance-land>
    </footer>
  `
}
