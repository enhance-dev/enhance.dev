const examples = [
  {
    label: 'C#',
    url: 'https://github.com/enhance-dev/enhance-ssr-c-sharp'
  },
  {
    label: 'Deno',
    url: 'https://github.com/enhance-dev/enhance-ssr-deno'
  },
  {
    label: 'Go',
    url: 'https://github.com/enhance-dev/enhance-ssr-go'
  },
  {
    label: 'Java',
    url: 'https://github.com/enhance-dev/enhance-ssr-java'
  },
  {
    label: 'PHP',
    url: 'https://github.com/enhance-dev/enhance-ssr-php'
  },
  {
    label: 'Python',
    url: 'https://github.com/enhance-dev/enhance-ssr-python'
  },
  {
    label: 'Ruby',
    url: 'https://github.com/enhance-dev/enhance-ssr-ruby'
  },
  {
    label: 'Ruby on Rails',
    url: 'https://github.com/enhance-dev/enhance-ssr-ruby-on-rails'
  },
  {
    label: 'Rust',
    url: 'https://github.com/enhance-dev/enhance-ssr-rust'
  },
]

const examplesList = examples.map(i => `<li>
  <a class="inline-block pi0 pb-4 relative" href="${i.url}">${i.label}</a>
</li>`).join('')

const github = `<svg class="inline-block mie-2" viewbox="0 0 98 96" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="currentColor"/></svg>`

export default function Repos ({ html }) {
  return html`
    <style>
      h2 {
        color: white;
      }

      a {
        color: var(--blue);
      }

      .card {
        background-color: white;
        color: var(--dark);
        border-radius: 0.25em;
      }

      svg {
        max-block-size: 1.5em;
        inline-size: auto;
      }

      hr {
        border-block-start: 1px solid #ddd;
      }

      .examples a {
        background: var(--lily);
        border-radius: 0.25em;
      }

      .examples a:after {
        content: '';
        position: absolute;
        inset: -2px;
        box-shadow: 0 0 0 2px var(--lily);
        border-radius: 6px;
        opacity: 0;
        transform: scale(0.75);
        transition: opacity 150ms linear, transform 150ms linear;
      }

      .examples a:focus {
        outline: none;
      }

      .examples a:hover:after,
      .examples a:focus:after {
        opacity: 1;
        transform: scale(1);
      }
    </style>

    <h2 class="text4 font-bold tracking-1">Get started</h2>

    <div class="card p2 mb2">
      <h3 class="text-1 uppercase font-semibold tracking2 mbe0 flex align-items-center leading0">
        ${github} Starter projects
      </h3>
      <ul class="font-bold text1 leading4 list-none flex flex-wrap gap0 examples">
        ${examplesList}
      </ul>

      <hr class="mb2">

      <h3 class="text-1 uppercase font-semibold tracking2 mbe0 flex align-items-center leading0">
        ${github} Download & contribute
      </h3>
      <p class="text1 font-bold">
        <a class="underline" href="https://github.com/enhance-dev/enhance-ssr-wasm">
          enhance-ssr-wasm
        </a>
      </p>

    </div>
  `
}
