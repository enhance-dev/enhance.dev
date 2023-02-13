export default function AxolSwingBlue({ html }) {
  return html`
    <style>
      @media (prefers-reduced-motion: no-preference) {
        @keyframes swing {
          from {
            transform: rotate(-9deg);
          }
          to {
            transform: rotate(9deg);
          }
        }

        img {
          animation: swing 1.5s ease-in-out infinite alternate;
          transform-origin: center top;
        }
      }
    </style>
    <img src="/_public/img/landing/axol-swing-blue.svg" alt="" />
  `
}
