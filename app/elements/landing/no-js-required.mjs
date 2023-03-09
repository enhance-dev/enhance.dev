export default function NoJsRequired({ html }) {
  return html`
    <style>
      :host {
        --axol-unless-offset: 17.5vw;
      }

      h2 {
        color: var(--mid-purple);
        font-size: var(--text-3);
        padding-block: var(--space-l);
      }

      .cloud-pink {
        width: 25vw;
        aspect-ratio: 342 / 105;
        transform: translateX(-2%);
      }

      landing-star-filled {
        width: 3vw;
        left: 50%;
        transform: translateX(-50%) translateY(-100%);
      }

      landing-axol-no-js-required {
        transform: translateY(-2vw);
      }

      @media (prefers-reduced-motion: no-preference) {
        landing-axol-no-js-required {
          transform: translateY(-2vw) translateX(56vw);
          transition: transform 12s ease-out;
        }

        landing-axol-no-js-required.js-popout {
          transform: translateY(-2vw) translateX(-82vw);
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
        transform: translateY(-1vw);
      }

      .unless {
        padding-top: var(--space-3xl);
        padding-bottom: var(--space-xl);
      }

      landing-axol-unless-you-want-it {
        left: var(--axol-unless-offset);
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
        threshold: 0.5,
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

    <section class="relative">
      <h2 class="text-center uppercase">
        Build your entire<br />
        app
        <span class="font-semibold">
          with fully<br />
          functioning HTML
        </span>
      </h2>

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
