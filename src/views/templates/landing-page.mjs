export default function LandingPage({ html }) {
  return html`
    <style>
      :host {
        display: block;
        height: 100vh;
        background: linear-gradient(180deg, #74F1FF 71.87%, #C1FFFB 100%) no-repeat center center fixed;
        background-size: cover;
      }
    </style>
    <div>
        <enhance-type></enhance-type>
        <cherub-mascot></cherub-mascot>
        <email-signup
          class="
            max-w-form
            block
            m-auto
          "></email-signup>
      </div>
    </div>
  `
}
