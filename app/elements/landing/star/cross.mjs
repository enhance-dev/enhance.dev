export default function StarCross({ html }) {
  return html`
    <style>
      @media (prefers-reduced-motion: no-preference) {
        @keyframes pulse {
          from {
            transform: scale(1);
            opacity: 1;
          }
          to {
            transform: scale(0.5);
            opacity: 0.6;
          }
        }

        svg {
          animation: 2s pulse linear infinite alternate;
        }
      }
    </style>

    <svg
      width="30"
      height="36"
      viewBox="0 0 30 36"
      stroke="white"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.9023 3V32.6607"
        stroke-width="4.34974"
        stroke-linecap="round"
        stroke-linejoin="round" />
      <path
        d="M26.8203 20.0859H3"
        stroke-width="4.34974"
        stroke-linecap="round"
        stroke-linejoin="round" />
    </svg>
  `
}
