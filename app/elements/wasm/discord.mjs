export default function Discord ({ html }) {
  return html`
    <style>
      h2 {
        color: white;
      }

      .card {
        background-color: white;
        color: var(--dark);
        border-radius: 0.25em;
      }

      p {
        max-inline-size: 48ch;
      }

      a {
        background-color: var(--blue);
        color: white;
        border-radius: 0.25em;
      }

      a:after {
        content: '';
        position: absolute;
        inset: -2px;
        box-shadow: 0 0 0 2px var(--blue);
        border-radius: 6px;
        opacity: 0;
        transform: scale(0.75);
        transition: opacity 150ms linear, transform 150ms linear;
      }

      a:focus {
        outline: none;
      }

      a:hover:after,
      a:focus:after {
        opacity: 1;
        transform: scale(1);
      }
    </style>

    <h2 class="text4 font-bold tracking-1">Get involved</h2>

    <div class="card p2 mb2 leading3">
      <p class="text1 mbe0">
        <span class="font-bold">Enhance WASM is an open source initiative,</span> and we’re looking for collaborators to join us on our mission of making server side rendered web components accessible to all web&nbsp;developers.
      </p>
      <p class="mbe0">
        Whatever your choice of programming language or framework may be, we’d love assistance with optimizing our existing implementations, creating new adapters, improving example applications, reviewing pull requests, and everything in&nbsp;between!
      </p>
      <p>
        If you’re enthusiastic about getting involved, let’s start talking!
      </p>
      <div class="mbs4 mbe0">
        <a class="pi2 pb0 text1 font-bold relative" href="https://enhance.dev/discord">
          Join us on Discord
        </a>
      </div>
    </div>
  `
}
