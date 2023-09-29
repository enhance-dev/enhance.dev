export default function Cta({ html, state }) {
  return html`<style scope="global">
      body {
        height: 100vh;
        background-color: #c1fffb;
        background-image: url('/_public/img/svg/background.svg');
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        --navy: #003451;
        --lilac: #ad6ef9;
      }

      main {
        min-width: 17rem;
        max-width: 52rem;
        height: 100%;
      }

      .welcome {
        max-width: 26rem;
      }

      .color-light {
        color: var(--light);
      }

      .color-lilac {
        color: var(--lilac);
      }

      .color-navy {
        color: var(--navy);
      }

      .border-lilac {
        border-color: var(--lilac);
      }

      .bg-navy {
        background-color: var(--navy);
      }

      .bg-lilac {
        background-color: var(--lilac);
      }

      .link-btn {
        height: 4rem;
      }

      .discord-logo {
        width: 1.75rem;
      }

      .radius5 {
        border-radius: 5px;
      }

      @media only screen and (min-width: 48em) {
        :host > main {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          grid-template-rows: repeat(5, 1fr);
        }

        :host > main {
          width: 50rem;
          grid-column: 1 / 6;
        }
      }

      .axol {
        width: 180px;
      }

      .cta {
        width: 275px;
      }
    </style>

    <main
      class="
      mi-auto
      pt4
      pr2
      pb2
      pl2
      color-light
      font-sans
    ">
      <div
        class="
        mi-auto
        pr2
        pl2
        mbe0
     ">
        <cherub-mascot class="axol mi-auto"></cherub-mascot>
      </div>
      <div
        class="
        pr1
        pl1
        mb2
      ">
        <img src="/_public/img/svg/enhance-type.svg" alt="Enhance" />
      </div>
      <div class="pr1 pl1 mb2 font-semibold color-lilac text3 text-center">
        <h2>The HTML framework</h2>
      </div>
      <section
        class="
        p2
        mb1
        text0
        text1-lg
        bg-lilac
        radius5
        font-bold
        leading5
        flex
        justify-content-center
      ">
        <div class="inline-block">
          <p class="mb-1">
            <span class="inline-block cta">Read the Docs:</span>
            <a class="" href="https://enhance.dev/docs/">enhance.dev/docs</a>
          </p>
          <p class="mb-1">
            <span class="inline-block cta">Join our Discord:</span>
            <a href="https://enhance.dev/discord">enhance.dev/discord</a>
          </p>
          <p>
            <span class="inline-block cta">Follow us on Mastodon:</span>
            <a href="https://fosstodon.org/@enhance_dev" rel="me"
              >fosstodon.org/@enhance_dev</a
            >
          </p>
        </div>
      </section>
      <section class="flex justify-content-center">
        <cta-qrcode></cta-qrcode>
      </section>
    </main>
    <google-analytics code="${state.store.gacode}"></google-analytics>`
}
