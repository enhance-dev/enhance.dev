export default function AxolUnlessYouWantIt({ html }) {
  return html`
    <style>
      .axol {
        width: 12vw;
        transform: translateY(-18%) translateX(-30%);
      }

      .banner {
        background: var(--pale-cyan);
        color: var(--mid-purple);
        font-size: max(1rem, 3.75vw);
        padding-block: 0.5vw;
        padding-inline: 3vw;
      }
    </style>
    <div class="flex items-center">
      <p class="banner font-bold italic uppercase flex-none">
        Unless you want it
      </p>
      <img src="/_public/img/landing/axol-wink.svg" alt="" class="axol" />
    </div>
  `
}
