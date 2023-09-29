const slideTransition = '2000ms cubic-bezier(0.33, 0.8, 0.29, 0.96)'

export default function AxolRainbowButtslide({ html }) {
  return html`
    <style>
      :host {
        pointer-events: none; /* Required to unblock pointer access to Rewind button */
      }

      figure {
        aspect-ratio: 1488 / 1460; /* Combined aspect ratio of rainbow-top and rainbow-bottom */
        display: flex;
        width: 100vw;
      }

      /* Figure and SVG visibility toggled via JS, see script below; thus, if JS fails, the non animated version is shown. */
      figure img {
        aspect-ratio: 237 / 317;
        width: 20vw;
        transform: rotate(-24deg);
      }

      svg {
        display: none;
      }

      @media (prefers-reduced-motion: no-preference) {
        svg {
          width: 100vw;
          aspect-ratio: 1488 / 1460;
        }

        #axol-sliding {
          offset-path: path(
            'M112 168C219 273 439 434.5 1122.5 550.5C1280.5 570.5 1418.4 575 1484 577'
          );
          offset-rotate: 4deg;
          motion-offset: 0%;
          offset-distance: 0%;
          translate: 0% 0%;
          transition: motion-offset ${slideTransition},
            offset-distance ${slideTransition}, translate ${slideTransition};
        }

        #axol-sliding.animated {
          motion-offset: 100%;
          offset-distance: 100%;
          translate: 25% 0%;
        }

        .eye {
          animation: blink 5s steps(1) infinite;
        }
      }
    </style>

    <script type="module">
      const allowAnimation = window.matchMedia(
        '(prefers-reduced-motion: no-preference)'
      ).matches

      // This script handles animations. The following shouldn't be executed if the user has indicated they prefer reduced motion.
      if (allowAnimation) {
        const nextSection = document.querySelector('landing-stable-forever')
        const axol = document.getElementById('axol-sliding')

        // Swap the static Axol for the animation-ready one
        document.getElementById('axol-sliding-static').style.display = 'none'
        document.getElementById('axol-sliding-animated').style.display = 'block'

        const handleObserver = (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              axol.classList.add('animated')
              setTimeout(() => {
                // For markup see stable-forever.mjs
                document
                  .querySelector('landing-axol-face-front')
                  .classList.add('animated')

                document
                  .querySelector('.js-rewindButton')
                  .classList.add('active')
              }, 900)
            }
          })
        }

        const options = {
          threshold: 0.2,
        }

        const observer = new IntersectionObserver(handleObserver, options)
        observer.observe(nextSection)
      }
    </script>

    <figure
      id="axol-sliding-static"
      class="align-items-center justify-content-center">
      <img src="/_public/img/landing/axol-sliding.svg" alt="" />
    </figure>

    <svg
      id="axol-sliding-animated"
      viewBox="0 0 1488 1460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g id="axol-sliding">
        <path
          id="Vector"
          d="M253.54 318.054C270.454 329.016 267.898 339.442 277.983 341.105C283.528 342.018 291.681 335.011 293.407 330.782C298.245 318.838 278.98 297.576 260.82 293.132C242.661 288.688 237.779 307.827 253.54 318.054Z"
          fill="#9556E1" />
        <path
          id="Vector_2"
          d="M255.413 370.301C274.352 377.257 281.217 368.354 288.595 375.681C292.628 379.695 291.899 390.995 289.432 395.208C282.701 407.008 254.029 404.795 239.609 392.541C225.188 380.286 237.731 363.801 255.413 370.301Z"
          fill="#9556E1" />
        <path
          id="Vector_3"
          d="M146.634 338.776C140.087 343.137 131.618 349.242 113.83 333.992C99.1698 321.417 84.0816 291.75 99.3596 287.001C111.596 283.191 113.484 295.713 123.397 310.764C133.311 325.815 147.45 319.415 147.45 319.415L146.634 338.776Z"
          fill="#9556E1" />
        <g id="Group 208">
          <path
            id="Union"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M199.856 427.002C199.646 429.258 200.107 431.181 201.323 432.606C206.137 438.243 220.97 433.932 234.454 422.978C247.339 412.51 254.329 399.762 250.722 393.733C255.875 379.117 256.341 358.759 256.076 330.109C255.836 304.282 263.731 290.354 270.063 279.184C278.699 263.949 284.426 253.845 262.635 225.684C262.635 225.684 221.842 204.451 185.393 219.617C179.006 217.182 166.472 221.691 154.928 231.069C141.444 242.023 134.416 255.472 139.23 261.109C140.436 262.522 142.272 263.309 144.558 263.525L144.489 263.684C133.202 274.023 127.7 285.713 132.103 290.868C132.926 291.832 134.043 292.505 135.396 292.904C135.248 293.585 135.103 294.272 134.96 294.964C128.419 303.122 125.898 311.02 129.303 315.007C129.803 315.592 130.41 316.07 131.112 316.444C125.176 324.23 123.001 331.636 126.263 335.455C127.045 336.37 128.091 337.023 129.353 337.428C126.259 343.091 125.585 348.09 128.072 351.003C128.414 351.402 128.806 351.752 129.244 352.053C126.305 357.579 125.704 362.44 128.143 365.295C128.687 365.932 129.358 366.441 130.14 366.829C127.309 372.256 126.76 377.019 129.164 379.834C130.552 381.459 132.774 382.257 135.556 382.307C139.374 393.158 144.772 401.56 151.028 407.976C150.462 410.832 150.833 413.257 152.292 414.964C154.187 417.184 157.636 417.861 161.943 417.198C161.404 420.012 161.783 422.403 163.226 424.091C165.951 427.282 171.887 427.285 178.971 424.7C179.159 425.95 179.625 427.044 180.391 427.941C183.581 431.677 191.173 431.043 199.856 427.002Z"
            fill="url(#paint0_radial_98_2706)" />
        </g>
        <path
          id="Vector_4"
          d="M201.236 409.771C218.612 419.998 226.774 413.057 232.785 421.346C236.084 425.896 233.507 436.282 230.464 439.745C221.966 449.421 194.32 441.702 182.217 427.418C170.113 413.134 185.021 400.236 201.236 409.771Z"
          fill="#AD6EF9" />
        <g id="Group 209">
          <path
            id="Vector_5"
            d="M255.918 122.976C255.918 122.976 254.097 119.609 240.592 96.3437C215.514 52.7611 181.388 63.6908 136.882 45.3076C120.533 38.5487 102.396 32.9754 107.971 48.6978C117.199 74.7749 138.163 76.9683 156.295 80.9409C140.342 79.0964 133.13 81.8777 134.099 86.9049C136.034 96.4259 154.02 108.534 179.164 113.251C179.164 113.251 162.587 112.684 163.068 120.037C164.179 133.98 188.172 141.957 205.364 138.235C224.194 134.166 235.728 136.746 240.731 140.125C248.195 144.849 256.669 125.432 255.918 122.976Z"
            fill="url(#paint1_linear_98_2706)" />
          <path
            id="Vector_6"
            d="M323.771 205.286C325.4 266.864 270.404 302.977 202.336 304.695C134.268 306.413 78.831 273.408 77.2023 211.831C75.5735 150.253 132.145 103.641 200.267 103.576C247.286 103.56 322.156 143.656 323.771 205.286Z"
            fill="white" />
          <path
            id="Vector_7"
            d="M265.651 256.333C251.667 272.346 225.526 230.27 221.902 224.245C221.649 223.825 221.76 223.311 222.15 223.014C224.545 221.187 233.205 214.985 245.481 210.791C258.034 206.502 267.258 207.574 269.539 207.945C269.884 208.001 270.148 208.228 270.253 208.561C271.547 212.673 279.559 240.409 265.651 256.333Z"
            fill="#003451" />
          <path
            class="eye"
            id="Vector_8"
            d="M184.093 226.473C191.851 228.438 199.734 223.738 201.701 215.976C203.667 208.213 198.972 200.327 191.214 198.361C183.455 196.396 175.572 201.096 173.605 208.858C171.639 216.621 176.334 224.507 184.093 226.473Z"
            fill="#003451" />
          <path
            id="Vector_9"
            d="M195.921 266.478C205.316 268.858 214.862 263.167 217.243 253.767C219.625 244.367 213.939 234.818 204.545 232.438C195.15 230.058 185.604 235.749 183.223 245.149C180.841 254.549 186.527 264.098 195.921 266.478Z"
            fill="url(#paint2_radial_98_2706)" />
          <path
            id="Vector_10"
            d="M301.563 248.855C308.289 250.558 315.672 244.319 318.053 234.92C320.434 225.52 316.912 216.518 310.187 214.815C303.461 213.111 296.078 219.35 293.697 228.75C291.316 238.15 294.838 247.151 301.563 248.855Z"
            fill="url(#paint3_radial_98_2706)" />
          <path
            id="Vector_11"
            d="M153.131 190.563C153.131 190.563 151.107 187.331 136.345 164.71C108.845 122.566 75.407 135.436 29.9736 119.564C13.2932 113.763 -5.05581 109.204 1.29311 124.585C12.099 150.122 33.0026 151.12 51.3227 154.17C35.3217 153.246 28.2685 156.435 29.5137 161.393C31.9227 170.903 50.6027 181.85 75.9534 185.16C75.9534 185.16 59.3882 185.531 60.3669 192.753C62.2156 206.63 86.6277 213.257 103.484 208.547C122.117 203.376 133.702 205.356 138.931 208.503C146.559 212.805 153.969 192.987 153.131 190.563Z"
            fill="url(#paint4_linear_98_2706)" />
          <path
            class="eye"
            id="Vector_12"
            d="M291.437 210.53C299.196 212.495 307.079 207.795 309.046 200.032C311.012 192.27 306.317 184.384 298.558 182.418C290.8 180.453 282.917 185.153 280.95 192.915C278.984 200.678 283.679 208.564 291.437 210.53Z"
            fill="#003451" />
          <path
            id="Vector_13"
            d="M296.281 191.405C298.759 192.033 301.278 190.532 301.906 188.052C302.534 185.572 301.034 183.053 298.556 182.425C296.078 181.797 293.559 183.298 292.931 185.778C292.303 188.258 293.803 190.777 296.281 191.405Z"
            fill="white" />
          <path
            id="Vector_14"
            d="M189.235 207.113C191.713 207.741 194.232 206.239 194.86 203.759C195.488 201.28 193.988 198.76 191.51 198.132C189.031 197.505 186.513 199.006 185.885 201.486C185.256 203.966 186.756 206.485 189.235 207.113Z"
            fill="white" />
          <ellipse
            id="Ellipse 76"
            cx="30.893"
            cy="13.0964"
            rx="30.893"
            ry="13.0964"
            transform="matrix(-0.917822 -0.396992 -0.396992 0.917822 273.797 118.996)"
            fill="white" />
          <ellipse
            id="Ellipse 77"
            cx="30.893"
            cy="13.0964"
            rx="30.893"
            ry="13.0964"
            transform="matrix(-0.97987 -0.199639 -0.199639 0.97987 223.904 100.47)"
            fill="white" />
          <ellipse
            id="Ellipse 78"
            cx="30.893"
            cy="13.0964"
            rx="30.893"
            ry="13.0964"
            transform="matrix(-0.97987 -0.199639 -0.199639 0.97987 174.592 101.551)"
            fill="white" />
          <ellipse
            id="Ellipse 79"
            cx="30.893"
            cy="13.0964"
            rx="30.893"
            ry="13.0964"
            transform="matrix(-0.97987 -0.199639 -0.199639 0.97987 164.063 122.503)"
            fill="white" />
        </g>
        <path
          id="Vector_15"
          d="M207.693 332.016C223.566 344.495 232.56 338.709 237.454 347.74C240.111 352.681 236.149 362.634 232.664 365.645C222.917 374.089 196.556 362.699 186.506 346.937C176.456 331.174 192.931 320.385 207.693 332.016Z"
          fill="#AD6EF9" />
        <path
          id="Vector 245"
          d="M257.908 246.399C251.922 238.132 241.121 239.314 237.003 245.094C241.636 251.194 253.644 262.785 261.531 259.649C271.39 255.729 273.706 239.635 273.706 232.913C264.964 226.167 259.73 242.717 257.908 246.399Z"
          fill="#F088FE" />
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_98_2706"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(236.261 312.204) rotate(-176.048) scale(110.32 424.414)">
          <stop stop-color="#C8EBFF" />
          <stop offset="0.322917" stop-color="white" />
          <stop offset="1" stop-color="white" />
        </radialGradient>
        <linearGradient
          id="paint1_linear_98_2706"
          x1="120.68"
          y1="27.6091"
          x2="240.143"
          y2="146.383"
          gradientUnits="userSpaceOnUse">
          <stop stop-color="#E0C1FD" />
          <stop offset="1" stop-color="#AD6EF9" />
        </linearGradient>
        <radialGradient
          id="paint2_radial_98_2706"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(200.233 249.458) rotate(180) scale(21.3221 16.0395)">
          <stop stop-color="#F088FE" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </radialGradient>
        <radialGradient
          id="paint3_radial_98_2706"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(305.875 231.835) rotate(174.729) scale(15.6961 15.5984)">
          <stop stop-color="#F088FE" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </radialGradient>
        <linearGradient
          id="paint4_linear_98_2706"
          x1="76.5505"
          y1="114.045"
          x2="76.6691"
          y2="210.072"
          gradientUnits="userSpaceOnUse">
          <stop stop-color="#E0C1FD" />
          <stop offset="1" stop-color="#AD6EF9" />
        </linearGradient>
        <clipPath id="clip0_98_2706">
          <rect width="1488" height="1460" fill="white" />
        </clipPath>
      </defs>
    </svg>
  `
}
