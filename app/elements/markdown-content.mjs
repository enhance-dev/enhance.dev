export default function MarkdownContent ({ html }) {
  return html`
      <style>
        :host > * {
          margin: auto;
        }

        strong {
          font-weight: 600;
        }

        small {
          opacity: 0.6;
        }

        ol,
        ul {
          list-style: none;
        }

        ol {
          list-style: none;
          counter-reset: number-counter;
        }

        ol li {
          counter-increment: number-counter;
        }

        ol li:before {
          font-family: var(--font-mono);
          display: inline-block;
          padding-right: 0.5ch;
          content: counter(number-counter) '.';
          font-weight: 600;
        }

        ul li:before {
          content: '•';
          padding-right: 0.5ch;
        }

        li > ul {
          padding-left: 1.5rem;
        }

        li + li,
        dd + dt {
          margin-top: var(--space-0);
        }

        dl {
          margin: var(--space-0) 0;
        }

        dt {
          font-weight: 600;
        }

        a {
          text-decoration: underline;
        }

        p a,
        li a,
        dd a {
          overflow-wrap: break-word;
        }

        table {
          width: 100%;
        }

        th {
          color: var(--blue-800);
          background: var(--blue-100);
          text-align: left;
        }

        table caption {
          padding: 0.5rem;
        }

        th,
        td {
          padding: 0.5rem;
        }

        tr:nth-child(2n) {
          background-color: var(--gray-50);
        }

        blockquote {
          border: 1px solid var(--blue-500);
        }

        :not(begin-command, begin-code) > pre,
        begin-code {
          margin-block: 1.5em;
        }

        code {
          font-family: var(--font-mono);
          font-size: 0.925em; /* match body/heading x-height */
        }

        h1 code,
        h2 code,
        h3 code {
          background-color: transparent;
          font-weight: 600;
        }

        :not(pre, h1, h2, h3) > code {
          padding: 0.125rem 0.25rem;
          line-height: 1rem;
          overflow-wrap: break-word;
          background-color: var(--smoke-halite);
          border-radius: 0.25rem;
        }

        blockquote :not(pre) > code {
          background-color: var(--smoke-halite);
        }

        pre code {
          display: block;
          max-width: 100%;
          min-width: 100px;
          font-size: 1rem;
          padding: 0.7rem 0.9rem;
          color: var(--hl-color);
          background-color: var(--hl-bg);
          white-space: pre;
          tab-size: 2;
          -webkit-overflow-scrolling: touch;
          overflow-x: auto;
        }

        pre button {
          display: none;
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          width: 1rem;
          height: 1rem;
          opacity: 0.5;
          color: var(--blue-900);
        }

        pre:hover button {
          display: block;
        }

        pre button:hover {
          opacity: 1;
        }

        pre button svg {
          width: 1rem;
          height: 1rem;
          pointer-events: none;
        }

        hr {
          border-color: var(--blue-500);
        }

        figcaption {
          font-size: 0.875em; /* text-1 is just too small */
          padding: 0.75rem 1rem;
          background-color: var(--gray-50);
        }

        figcaption p {
          margin: 0 !important; /* I'm so sorry, the markdown class mappings made me do it */
        }

        figcaption code {
          background-color: transparent;
        }

        @media screen and (min-width: 76em) {
          figcaption {
            font-size: 1em;
          }
        }

        kbd {
          border: 1px solid var(--syntax-gray);
          border-radius: 0.25em;
          font-family: var(--font-mono);
          font-weight: 600;
          padding-inline: 0.25em;
        }

        mark {
          background-color: var(--blue-100);
        }

        .iframe-container {
          padding-bottom: 65.25%;
          padding-top: 30px;
          -webkit-overflow-scrolling: touch;
        }

        /* The superscript link where a footnote is indicated */
        .footnote-ref {
          color: #666;
        }

        .footnotes-sep {
          border-width: 1px;
          border-style: solid;
          margin-bottom: 1.5em;
        }

        /* The actual footnote content */
        .footnote-item {
          color: #666;
          font-size: 0.85em;
        }

        .footnote-item p {
          display: inline;
        }
      </style>

      <slot name="doc"></slot>

      <script>
        /**
        const codeBlocks = document.querySelectorAll('pre.hljs')
        const svgCopy = '<svg><use xlink:href="#svg-copy"></use></svg>'
        const svgCheck = '<svg><use xlink:href="#svg-check"></use></svg>'

        for (const codeBlock of codeBlocks) {
          codeBlock.classList.add('relative')
          const button = document.createElement('button')
          //button.className = buttonClassList.join(' ')
          button.innerHTML = svgCopy

          button.onclick = (evt) => {
            const target = evt.target
            const parent = target.closest('pre')
            const codeText = parent.querySelector('code').textContent.trim()

            navigator.clipboard.writeText(codeText).then(
              () => {
                target.innerHTML = svgCheck
                setTimeout(() => (target.innerHTML = svgCopy), 2000)
              },
              () => (target.innerHTML = 'Error copying!')
            )
          }

          codeBlock.appendChild(button)
        }
         */
      </script>
    `
}
