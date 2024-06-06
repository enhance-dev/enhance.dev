export default function CookbookHeader ({ html }) {
  return html`
    <style>
      :host {
        display: block;
        background: linear-gradient(to bottom, #e9d6fa, white);
        padding-block: var(--space-6);
      }

      @media (prefers-color-scheme: dark) {
        :host {
          background: linear-gradient(to bottom, var(--dark-purple), var(--denim));
        }
      }

      h1 {
        color: var(--purple-princess);
      }

      figure {
        max-inline-size: clamp(150px, 12vw, 250px);
      }

      figure:after {
        content: '';
        position: absolute;
        inset: -100%;
        background: radial-gradient(closest-side, var(--princess), transparent);
        mix-blend-mode: multiply;
        opacity: 0.15;
        z-index: -1;
      }

      p {
        max-inline-size: 48ch;
      }
    </style>
    <div class="leading4 pi0">
      <div class="flex justify-content-center">
        <figure class="relative inline-block z1">
          <img
            src="/_public/img/cookbook/axol-chef.svg"
            id="chef-axol"
            alt="Axol wearing a chef hat"
          />
        </figure>
      </div>

      <h1 class="leading1 text5 text6-lg font-semibold tracking-2 text-center mb6">
        Let’s get cooking!
      </h1>

      <p class="text1-lg text-center mi-auto">
        Learning new things can be fun — but also challenging. The Enhance Cookbook is here to show you around the kitchen and help you get your hands dirty.
      </p>
    </div>
  `
}
