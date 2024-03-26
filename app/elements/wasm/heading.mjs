export default function Heading ({ html }) {
  return html`
    <style>
      h1 {
        color: var(--dark-purple);
      }

      h1 span:first-of-type {
        font-size: clamp(1.5em, 3.75vw, 4.5em);
      }

      h1 span:last-of-type {
        font-size: clamp(2.125em, 9vw, 11.5em);
      }

      abbr {
        text-decoration: unset;
      }
    </style>
    <h1 class="text-center uppercase leading1">
      <span class="block font-semibold tracking2">Write once,</span>
      <span class="block font-black">
        <abbr title="Server Side Render">SSR</abbr> anywhere
      </span>
    </h1>
  `
}
