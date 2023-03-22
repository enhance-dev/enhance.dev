export default function NoJsRequired({ html }) {
  return html`
    <style>
      :host {
        --axol-unless-offset: 17.5vw;
        color: var(--dark-purple);
        display: block;
        position: relative;
      }

      .container {
        max-width: 80vw;
      }

      h2 {
        font-size: var(--text-2);
        margin-left: -0.025em;
        color: var(--dark-purple);
      }

      .accessible {
        font-size: var(--text-3);
        margin-top: var(--space-m);
        margin-bottom: var(--space-l);
        padding-block: var(--space-l);
        color: var(--mid-purple);
      }

      .cloud-pink {
        width: 25vw;
        aspect-ratio: 342 / 105;
        transform: translateX(-2%);
      }

      .cloud-features {
        aspect-ratio: 833 / 392;
      }

      landing-star-filled {
        width: 3vw;
        left: 50%;
        transform: translateX(-50%) translateY(-100%);
      }

      landing-axol-no-js-required {
        transform: translateY(-2vw) translateX(-2vw);
      }

      @media (prefers-reduced-motion: no-preference) {
        landing-axol-no-js-required {
          transform: translateY(-2vw) translateX(56vw);
          transition: transform 4.5s ease-out;
        }

        landing-axol-no-js-required.js-popout {
          transform: translateY(-2vw) translateX(-2vw);
        }
      }

      .heart-left,
      .heart-right {
        width: 20vw;
      }

      @media (prefers-reduced-motion: no-preference) {
        @keyframes heartbeat {
          0% {
            transform: scale(1);
          }
          33% {
            transform: scale(1.05);
          }
          66% {
            transform: scale(1);
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

      landing-axol-unless-you-want-it {
        left: var(--axol-unless-offset);
        transform: translateY(10%);
      }

      @media (prefers-reduced-motion: no-preference) {
        landing-axol-unless-you-want-it {
          left: -50%;
          transition: left 500ms ease-out;
        }

        landing-axol-unless-you-want-it.js-popout {
          left: var(--axol-unless-offset);
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
      // No JS Required
      const heartCloud = document.querySelector('.js-heart')
      const axolNoJS = document.querySelector('landing-axol-no-js-required')

      const handleHeartObserver = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            axolNoJS.classList.add('js-popout')
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

      const handleCloudObserver = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            axolUnless.classList.add('js-popout')
          }
        })
      }

      const cloudObserver = new IntersectionObserver(handleCloudObserver, {
        threshold: 0.66,
      })
      cloudObserver.observe(cloud)
    </script>

    <h2 class="text-center uppercase accessible">
      Build your entire app <br />
      with <span class="font-semibold">accessible</span> HTML
    </h2>

    <section
      class="
        grid
        gap4
        gap2-lg
        items-center
        col-1
        col-2-lg
        pt4
        pb4
      ">
      <div
        class="
         pr0 pl0 pr-none-lg pl5-lg pb5-lg m-auto m-none-lg
        ">
        <h2
          class="
           mb2
           uppercase
           font-extrabold
           tracking-1
         ">
          Get productive
        </h2>
        <p class="text2 leading3 mb2">
          Enhance ships with everything you need to build a production ready
          app<br />
        </p>
        <ul class="list-none grid gap2 text1">
          <li>File-based routing</li>
          <li>Database backed APIs</li>
          <li>Composable HTML Custom Elements</li>
          <li>Web Component progressive enhancement</li>
        </ul>
      </div>
      <img
        src="/_public/img/landing/cloud-features.svg"
        alt=""
        class="cloud-features w-full" />
    </section>

    <section class="relative">
      <img
        src="/_public/img/landing/cloud-pink-thin.svg"
        alt=""
        class="cloud-pink" />

      <landing-star-filled class="absolute"></landing-star-filled>

      <figure class="flex items-center justify-end relative z1 js-heart">
        <landing-axol-no-js-required
          class="absolute"></landing-axol-no-js-required>
        <img
          src="/_public/img/landing/cloud-pink-heart-left.svg"
          class="heart-left relative z-1"
          alt="" />
        <img
          src="/_public/img/landing/cloud-pink-heart-right.svg"
          class="heart-right relative z1"
          alt="" />
        <img
          src="/_public/img/landing/cloud-pink-thin-extra.svg"
          alt=""
          class="cloud-pink-thin-extra absolute bottom0" />
        <img
          src="/_public/img/landing/cloud-blue-wide.svg"
          alt=""
          class="cloud-blue-wide absolute bottom0 z1" />
      </figure>

      <figure class="unless flex relative z1">
        <img
          src="/_public/img/landing/cloud-blue-small.svg"
          alt=""
          class="cloud-blue-small absolute" />

        <landing-axol-unless-you-want-it
          class="absolute z-1"></landing-axol-unless-you-want-it>

        <img
          src="/_public/img/landing/cloud-blue-chunky.svg"
          alt=""
          class="cloud-blue-chunky-left js-unless-cloud" />

        <img
          src="/_public/img/landing/cloud-blue-chunky.svg"
          alt=""
          class="cloud-blue-chunky-right absolute right0" />
      </figure>
    </section>
  `
}
