export default function StarFilled ({ html }) {
  return html`
    <style>
      @media (prefers-reduced-motion: no-preference) {
        @keyframes twinkle {
          from {
            transform: scale(1) rotate(0deg);
            opacity: 0.75;
          }
          to {
            transform: scale(1.333) rotate(12deg);
            opacity: 1;
          }
        }

        svg {
          animation: 1.5s twinkle linear infinite alternate;
        }
      }
    </style>

    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="white"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.9098 0L22.5364 9.59082L31.8195 15.9098L21.7659 21.9195L15.9098 31.8195L9.12903 21.9195L3.59732e-05 15.9098L9.12903 9.59082L15.9098 0Z" />
    </svg>
  `
}
