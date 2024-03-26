export default function NoJsRequired ({ html }) {
  return html`
    <style>
      :host {
        color: #5c2e94; /* darker dark-purple */
        display: block;
        position: relative;
      }

      .container {
        max-width: 80vw;
      }

      h2 {
        font-size: var(--landing-text-2);
        margin-left: -0.025em;
      }

      .accessible {
        font-size: min(var(--landing-text-3), 7vw);
        margin-top: var(--space-m);
        margin-bottom: var(--space-l);
        padding-block: var(--space-l);
      }

      .accessible:before {
        content: '';
        position: absolute;
        width: 60vw;
        aspect-ratio: 1 / 1;
        inset: 0;
        translate: -33% 0;
        margin: auto;
        background-image: radial-gradient(
          closest-side,
          hsla(0deg 0% 100% / 66%),
          transparent
        );
        z-index: -1;
      }

      .accessible:after {
        content: '';
        position: absolute;
        width: 80vw;
        aspect-ratio: 3 / 2;
        inset: 0;
        translate: 33% 10%;
        background-image: radial-gradient(
          closest-side,
          hsla(186deg 100% 82% / 66%),
          transparent
        );
        z-index: -1;
      }

      dd {
        font-size: 0.75em;
        margin-bottom: 1.5rem;
      }

      .cloud-pink {
        width: 25vw;
        aspect-ratio: 342 / 105;
        transform: translateX(-2%);
      }

      .get-productive {
        max-width: 48ch;
        padding-inline: 1rem;
      }

      @media screen and (min-width: 56em) {
        .features {
          padding-block: var(--space-3xl);
        }

        .get-productive {
          translate: 0 -25%;
          padding-inline: var(--space-m);
        }

        .cloud-features {
          translate: -10% 35%;
          scale: 120%;
        }
      }

      landing-star-filled {
        width: 3vw;
        left: 50%;
        transform: translateX(-50%) translateY(-100%);
      }

      .heart:after {
        content: '';
        position: absolute;
        z-index: -2;
        width: 50vw;
        aspect-ratio: 1 / 1;
        background-image: radial-gradient(
          closest-side,
          hsla(0deg 0% 100% / 33%),
          transparent
        );
      }

      .heart-left,
      .heart-right {
        width: 20vw;
      }

      /* Heart SVG split in half sometimes shows a gap in subpixel rendering depending on viewport size. */
      /*
       * To solve this, each SVG has a 1px overlap with its counterpart. Translating each half by 1/354 (1px over each full width)
       * creates a continuous shape while negating the subpixel rendering issue.
       */
      .heart-left {
        translate: 0.3% 0;
      }
      .heart-right {
        translate: -0.3% 0;
      }

      @media (prefers-reduced-motion: no-preference) {
        @keyframes heartbeat {
          0% {
            scale: 1;
          }
          33% {
            scale: 1.05;
          }
          66% {
            scale: 1;
          }
        }

        .heart-left,
        .heart-right {
          animation: heartbeat 3s linear infinite;
        }

        .heart-left {
          transform-origin: center right;
        }

        .heart-right {
          transform-origin: center left;
        }
      }

      .cloud-pink-thin-extra {
        z-index: -2;
        width: 25vw;
        right: -3vw;
      }

      .cloud-blue-wide {
        width: 42vw;
        aspect-ratio: 674 / 209;
        left: -12vw;
        transform: translateY(-3vw);
      }

      .unless {
        padding-top: var(--space-3xl);
        padding-bottom: var(--space-xl);
      }

      /* Custom properties manipulated when JS available and animation permitted; see media query and script tag below. */
      landing-axol-no-js-required {
        --initial-offset: -2vw;
        --active-offset: var(--initial-offset);
        translate: var(--active-offset) -2vw;
      }

      landing-axol-unless-you-want-it {
        --initial-offset: 17.5vw;
        --active-offset: var(--initial-offset);
        left: var(--active-offset);
        transform: translateY(10%);
      }

      @media (prefers-reduced-motion: no-preference) {
        landing-axol-no-js-required {
          --animation-offset: 56vw;
          transition: translate 4.5s ease-out;
        }

        landing-axol-unless-you-want-it {
          --animation-offset: -50%;
          transition: left 500ms ease-out;
        }
      }

      .unless .cloud-blue-chunky-left,
      .unless .cloud-blue-chunky-right {
        aspect-ratio: 945 / 508;
      }

      .unless .cloud-blue-chunky-left {
        width: 66vw;
        transform: translateX(-33%);
      }

      .unless .cloud-blue-small {
        width: 6vw;
        left: 21vw;
      }

      .unless .cloud-blue-chunky-right {
        bottom: var(--space-l);
        width: 30vw;
        transform: translateX(25%);
      }
    </style>

    <script type="module">
      const allowAnimation = window.matchMedia(
        '(prefers-reduced-motion: no-preference)'
      ).matches

      // This script handles animations. The following shouldn't be executed if the user has indicated they prefer reduced motion.
      if (allowAnimation) {
        // No JS Required
        const heartCloud = document.querySelector('.js-heart')
        const axolNoJS = document.querySelector('landing-axol-no-js-required')

        const noJSStyle = getComputedStyle(axolNoJS)
        const noJSInitialOffset = noJSStyle.getPropertyValue('--initial-offset')
        const noJSAnimationOffset =
          noJSStyle.getPropertyValue('--animation-offset')

        axolNoJS.style.setProperty('--active-offset', noJSAnimationOffset)

        const handleHeartObserver = (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              axolNoJS.style.setProperty('--active-offset', noJSInitialOffset)
            }
          })
        }

        const heartObserver = new IntersectionObserver(handleHeartObserver, {
          threshold: 0.33,
        })
        heartObserver.observe(heartCloud)

        // Unless you want it
        const cloud = document.querySelector('.js-unless-cloud')
        const axolUnless = document.querySelector(
          'landing-axol-unless-you-want-it'
        )

        const unlessStyle = getComputedStyle(axolUnless)
        const unlessInitialOffset =
          unlessStyle.getPropertyValue('--initial-offset')
        const unlessAnimationOffset =
          unlessStyle.getPropertyValue('--animation-offset')

        axolUnless.style.setProperty('--active-offset', unlessAnimationOffset)

        const handleCloudObserver = (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              axolUnless.style.setProperty(
                '--active-offset',
                unlessInitialOffset
              )
            }
          })
        }

        const cloudObserver = new IntersectionObserver(handleCloudObserver, {
          threshold: 0.66,
        })
        cloudObserver.observe(cloud)
      }
    </script>

    <h2 class="text-center uppercase leading1 relative accessible">
      Build your entire app <br />
      with <span class="font-bold">accessible</span> HTML
    </h2>

    <section
      class="
        grid
        gap4
        gap2-lg
        align-items-center
        col-1
        col-2-lg
        pb4
        features
      ">
      <div class="mi-auto get-productive">
        <h2
          class="
           mbe2
           uppercase
           font-extrabold
           tracking-1
         ">
          Get productive
        </h2>
        <p class="leading3 mbe2">
          Enhance ships with everything you need to build a production ready
          app.
        </p>

        <dl class="pis4 leading3">
          <dt class="font-bold">File-based routing</dt>
          <dd>Organize your pages as easily as a desktop&nbsp;folder.</dd>

          <dt class="font-bold">Database-backed APIs</dt>
          <dd>Access and store data with simple JavaScript&nbsp;functions.</dd>

          <dt class="font-bold">SSR composable HTML Custom Elements</dt>
          <dd>Build reusable components with HTML and scoped&nbsp;CSS.</dd>

          <dt class="font-bold">Web Component progressive enhancement</dt>
          <dd>Add client-side interaction just where you need&nbsp;it.</dd>
        </dl>
      </div>
      <landing-cloud-features
        class="si-100 block font-mono"></landing-cloud-features>
    </section>

    <section class="relative">
      <img
        src="/_public/img/landing/cloud-pink-thin.svg"
        alt=""
        loading="lazy"
        class="cloud-pink" />

      <landing-star-filled class="absolute"></landing-star-filled>

      <figure
        class="flex align-items-center justify-content-end relative z1 heart js-heart">
        <landing-axol-no-js-required
          class="absolute"></landing-axol-no-js-required>
        <img
          src="/_public/img/landing/cloud-pink-heart-left.svg"
          class="heart-left relative z-1"
          loading="lazy"
          alt="" />
        <img
          src="/_public/img/landing/cloud-pink-heart-right.svg"
          class="heart-right relative z1"
          loading="lazy"
          alt="" />
        <img
          src="/_public/img/landing/cloud-pink-thin-extra.svg"
          alt=""
          loading="lazy"
          class="cloud-pink-thin-extra absolute inset-be-0" />
        <img
          src="/_public/img/landing/cloud-blue-wide.svg"
          alt=""
          loading="lazy"
          class="cloud-blue-wide absolute inset-be-0 z1" />
      </figure>

      <figure class="unless flex relative z1">
        <img
          src="/_public/img/landing/cloud-blue-small.svg"
          alt=""
          loading="lazy"
          class="cloud-blue-small absolute" />

        <landing-axol-unless-you-want-it
          class="absolute z-1"></landing-axol-unless-you-want-it>

        <img
          src="/_public/img/landing/cloud-blue-chunky.svg"
          alt=""
          loading="lazy"
          class="cloud-blue-chunky-left js-unless-cloud" />

        <img
          src="/_public/img/landing/cloud-blue-chunky.svg"
          alt=""
          loading="lazy"
          class="cloud-blue-chunky-right absolute inset-ie-0" />
      </figure>
    </section>
  `
}
