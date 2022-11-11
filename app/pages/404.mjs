export default function FourOh4({ html, state }) {
  const hasSearchTerm = state.store?.searchTerm

  if (hasSearchTerm) return html`<docs-layout></docs-layout>`

  return html`
    <style>
      button {
        color: var(--white-denim);
        background-color: var(--purple-princess);
      }
      a {
        color: var(--purple-princess);
      }
    </style>

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

      .bg-hover-dark-purple:hover {
        background-color: var(--dark-purple);
      }
      .bg-purple,
      .bg-purple:active {
        background-color: var(--purple);
      }
      .color-hover-white:hover {
        color: var(--white);
      }
      .color-light {
        color: var(--light);
      }
      .border-gradient {
        border-color: var(--purple);
      }
      .border-dark {
        border-color: var(--dark);
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

      :host > main > .heading > h1 {
        font-size: 3rem;
        font-weight: 700;
        color: var(--navy);
      }

      :host > main > .heading > h2 {
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

      @media only screen and (min-width: 48em) {
        :host > main {
          grid-template-columns: repeat(5, 1fr);
          grid-template-rows: 15rem 5rem 11rem 1fr;
        }

        :host > main > .heading {
          width: 50rem;
          grid-column: 1 / 6;
        }

        :host > main > .heading > h1 {
          font-size: 6rem;
          font-weight: 700;
        }

        :host > main > .heading > h2 {
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
        font-sans
      ">
      <div
        class="
         flex
         justify-start
         items-center
        ">
        <cherub-head class="mr0"></cherub-head>
        <h2 class="text1 pt-3 font-bold">Enhance</h2>
      </div>
    </header>
    <main
      class="
          flex
          flex-col
          grid-lg
          justify-start
          m-auto
          font-sans
        ">
      <div
        class="
          heading
          text-center
          self-center
          mb5
          m-none-lg
        ">
        <h1 class="tracking-1">Not Found - 404</h1>
        <h2>Sorry we can't find that.</h2>
      </div>
      <section
        class="
          flex
          flex-col
          justify-center
          p1
          p3-lg
        ">
        <p
          class="
          mb2
          text2
          text3-lg
          text-center
          font-light
        ">
          Do you want to see the <a href=/docs/>Docs</a>?
        </p>
      </section>
      <cherub-mascot
        class="
            block
            self-end
            self-start-lg
            pt5
            p-none-lg
          "></cherub-mascot>
    </main>
    <footer>
      <enhance-land></enhance-land>
    </footer>
  `
}
