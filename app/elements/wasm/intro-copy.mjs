export default function IntroCopy ({ html }) {
  return html`
    <style>
      article {
        max-inline-size: 64ch;
      }
    </style>
    <wasm-container>
      <article class="mi-auto text0 text1-lg font-medium">
        <p>
          <span class="font-bold">Enhance WASM</span> is bringing server side rendered web components to <span class="font-bold">everyone</span>.
          Author your components in friendly, standards based syntax. Reuse them across <span class="font-bold">multiple languages, frameworks, and servers</span>.
          Upgrade them using familiar client side code when needed.
        </p>
        <p class="mbs0">Your path to resilient, cross platform interfaces begins here.</p>
      </article>
    </wasm-container>
  `
}
