export default function AxolFaceFront ({ html }) {
  return html`
    <style>
      :host {
        display: block;
        aspect-ratio: 215 / 117;
      }

      svg {
        width: 100%;
      }

      #eye-left,
      #eye-right {
        animation: blink 5s steps(1) infinite;
      }
    </style>
    <svg viewBox="0 0 215 117" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="axol-face-front">
        <path
          id="Vector"
          d="M168.039 76.0198C163.345 107.105 132.479 120.327 98.1246 115.096C63.7703 109.866 38.8706 88.3203 43.5648 57.2348C44.4614 51.2977 46.3758 45.8249 49.1251 40.8979C60.7704 20.0285 87.3945 8.95221 115.089 13.8596C132.699 16.991 156.089 32.7046 164.91 53.3871C167.924 60.4526 169.237 68.098 168.039 76.0198Z"
          fill="white" />
        <path
          id="Vector_2"
          d="M98.8898 83.8533C98.8898 83.8533 99.7078 97.5069 103.709 93.3159C105.743 91.0385 107.897 88.0455 109.289 86.0657C109.289 86.0657 110.364 97.9349 114.461 95.0854C118.559 92.236 119.221 85.2359 119.221 85.2359"
          stroke="#F088FE"
          stroke-width="2.70993"
          stroke-linecap="round"
          stroke-linejoin="round" />
        <path
          id="eye-left"
          d="M71.3201 80.3425C74.7453 82.5678 79.327 81.5935 81.5536 78.1664C83.7802 74.7392 82.8085 70.157 79.3833 67.9316C75.9581 65.7063 71.3764 66.6806 69.1498 70.1078C66.9232 73.5349 67.8949 78.1172 71.3201 80.3425Z"
          fill="#003451" />
        <path
          id="eye-right"
          d="M136.551 83.5515C139.976 85.7768 144.557 84.8025 146.784 81.3754C149.011 77.9482 148.039 73.3659 144.614 71.1406C141.189 68.9153 136.607 69.8896 134.38 73.3167C132.154 76.7439 133.125 81.3261 136.551 83.5515Z"
          fill="#003451" />
        <ellipse
          id="Ellipse 244"
          cx="15.7666"
          cy="6.68389"
          rx="15.7666"
          ry="6.68389"
          transform="matrix(-0.86329 -0.504708 -0.504708 0.86329 146.381 20.7344)"
          fill="white" />
        <ellipse
          id="Ellipse 245"
          cx="15.7666"
          cy="6.68389"
          rx="15.7666"
          ry="6.68389"
          transform="matrix(-0.86329 -0.504708 -0.504708 0.86329 122.379 13.1465)"
          fill="white" />
        <ellipse
          id="Ellipse 246"
          cx="15.7666"
          cy="6.68389"
          rx="15.7666"
          ry="6.68389"
          transform="matrix(-0.86329 -0.504708 -0.504708 0.86329 113.847 21.5391)"
          fill="white" />
        <path
          id="gill-right"
          d="M155.773 34.2777C155.773 34.2777 157.649 34.8217 170.713 39.0428C195.163 46.8392 193.4 65.0419 207.381 85.2535C212.52 92.6773 217.26 101.121 208.816 100.04C194.811 98.2564 191.451 88.037 187.509 79.4231C190.154 87.1804 189.546 91.0782 186.934 91.1386C181.976 91.2026 173.992 83.5409 168.922 71.5092C168.922 71.5092 170.996 79.7162 167.277 80.2714C160.202 81.2245 153.629 70.1199 153.627 61.1424C153.621 51.3108 151.087 45.8364 148.861 43.7066C145.698 40.4943 154.467 34.1687 155.773 34.2777Z"
          fill="url(#paint0_linear_132_2912)" />
        <path
          id="gill-left"
          d="M64.6762 20.3296C64.6762 20.3296 62.7547 20.6831 49.3334 23.5748C24.2264 28.8838 24.1571 47.1716 8.22269 65.8816C2.36647 72.7536 -3.19569 80.6799 5.3148 80.45C19.4273 80.0778 23.7942 70.2463 28.5785 62.0703C25.1704 69.5238 25.3847 73.4629 27.9776 73.7846C32.9044 74.3446 41.6152 67.5209 47.8653 56.0574C47.8653 56.0574 44.9793 64.0154 48.6244 64.9403C55.5681 66.597 63.2198 56.2063 64.1209 47.2742C65.1114 37.4926 68.1808 32.2995 70.6086 30.4032C74.0778 27.5238 65.9866 20.352 64.6762 20.3296Z"
          fill="url(#paint1_linear_132_2912)" />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_132_2912"
          x1="217.96"
          y1="91.4212"
          x2="145.803"
          y2="44.6762"
          gradientUnits="userSpaceOnUse">
          <stop stop-color="#E0C1FD" />
          <stop offset="1" stop-color="#AD6EF9" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_132_2912"
          x1="-2.92091"
          y1="70.9591"
          x2="73.5543"
          y2="31.6741"
          gradientUnits="userSpaceOnUse">
          <stop stop-color="#E0C1FD" />
          <stop offset="1" stop-color="#AD6EF9" />
        </linearGradient>
      </defs>
    </svg>
  `
}
