export default function TheGround({ html }) {
  return html`
    <style>
      :host {
        color: var(--denim);
      }

      .ground-bottom {
        background-color: #1aff1a;
        background-image: url('/_public/img/landing/ground-bottom.svg');
        background-size: 100vw auto;
        background-position: top;
        background-repeat: no-repeat;
      }

      h2,
      form {
        max-width: 50rem;
      }

      h2 {
        font-size: var(--text-3);
        margin-bottom: var(--space-m);
      }

      form {
        border-bottom: 1px solid var(--denim);
        margin-bottom: var(--space-xl);
      }

      .form-layout {
        grid-template-columns: 1fr 3rem;
        gap: var(--space-3xs);
      }

      input {
        background: transparent;
        padding-block: var(--space-xs);
        transition: background 100ms linear;
      }

      input::placeholder {
        color: var(--denim);
        opacity: 0.5;
      }

      input:focus {
        background: rgba(255, 255, 255, 0.66);
        outline: none;
      }

      button {
        background: var(--mid-purple);
        border-radius: 5px;
        margin-block: var(--space-3xs);
      }

      button:after {
        content: '';
        position: absolute;
        inset: -2px;
        box-shadow: 0 0 0 2px var(--mid-purple);
        border-radius: 6px;
        opacity: 0;
        transform: scale(0.75);
        transition: opacity 150ms linear, transform 150ms linear;
      }

      button:focus {
        outline: none;
      }

      button:hover:after,
      button:focus:after {
        opacity: 1;
        transform: scale(1);
      }

      landing-axol-gills-down {
        width: min(20vw, 12rem);
      }

      h2:nth-of-type(2) {
        margin-bottom: var(--space-l);
      }

      figure {
        gap: var(--space-m);
        padding-bottom: var(--space-2xl);
      }

      figure img {
        transform: scale(0.75);
      }

      @media screen and (min-width: 48em) {
        figure img {
          transform: scale(1);
        }
      }

      .arc-logo {
        aspect-ratio: 177 / 33;
      }

      .begin-logo {
        aspect-ratio: 142 / 42;
      }

      .footer-trim {
        aspect-ratio: 1515 / 25;
        width: 100vw;
      }
    </style>
    <section class="ground-bottom">
      <div class="pl0 pr0">
        <h2 class="uppercase font-extrabold tracking-1 text-center m-auto">
          <svg viewBox="0 0 672 48" xmlns="http://www.w3.org/2000/svg">
            <text
              fill="#003451"
              font-family="Rubik"
              font-size="65"
              font-weight="800"
              letter-spacing="0em"
              class="uppercase">
              <tspan x="-3.62354" y="46.7625">Don't miss out!</tspan>
            </text>
          </svg>
        </h2>

        <form name="enhance-newsletter-signup" class="m-auto">
          <label for="email" class="inline-block mb-2 font-medium">
            Stay informed via email:
          </label>
          <div class="form-layout grid flow-col">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@your-email.com"
              class="block w-full pt0 pb0" />
            <button
              type="submit"
              class="flex items-center justify-center relative">
              <span class="clip">Submit</span>
              <img src="/_public/img/landing/submit-arrow.svg" alt="" />
            </button>
          </div>
        </form>

        <landing-axol-gills-down class="m-auto"></landing-axol-gills-down>

      <img
        src="/_public/img/landing/footer-background-trim.png"
        alt=""
        class="footer-trim" />
    </section>
  `
}
