export default function ({ html, state = {} }) {
  const docName = state?.attrs['doc-name'] || ''
  const document =
    (docName && state?.store?.repl && state?.store?.repl[docName]) || ''
  return html`
    <style>
      /* PrismJS 1.26.0
      https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript */
      /**
       * prism.js default theme for JavaScript, CSS and HTML
       * Based on dabblet (http://dabblet.com)
       * @author Lea Verou
       */

      code[class*='language-'],
      pre[class*='language-'] {
        color: black;
        background: none;
        text-shadow: 0 1px white;
        white-space: pre;
        /*font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
              font-size: 1em;
              text-align: left;
              word-spacing: normal;
              word-break: normal;
              word-wrap: normal;
              line-height: 1.5;

              -moz-tab-size: 4;
              -o-tab-size: 4;
              tab-size: 4;

              -webkit-hyphens: none;
              -moz-hyphens: none;
              -ms-hyphens: none;
              hyphens: none;*/
      }

      pre[class*='language-']::-moz-selection,
      pre[class*='language-'] ::-moz-selection,
      code[class*='language-']::-moz-selection,
      code[class*='language-'] ::-moz-selection {
        text-shadow: none;
        background: #b3d4fc;
      }

      pre[class*='language-']::selection,
      pre[class*='language-'] ::selection,
      *='language-']::selection,
      code[class*='language-'] ::selection {
        text-shadow: none;
        background: #b3d4fc;
      }

      @media print {
        code[class*='language-'],
        pre[class*='language-'] {
          text-shadow: none;
        }
      }

      /* Code blocks */
      /*code-editor pre[class*='language-'] {
              padding: 1em;
              margin: 0.5em 0;
              overflow: auto;
            }*/

      :not(pre) > code[class*='language-'],
      pre[class*='language-'] {
        /*background: #f5f2f0;*/
      }

      /* Inline code */
      /*code-editor :not(pre) > code[class*='language-'] {
              padding: 0.1em;
              border-radius: 0.3em;
              white-space: normal;
            }*/

      .token.comment,
      .token.prolog,
      .token.doctype,
      .token.cdata {
        color: slategray;
      }

      .token.punctuation {
        color: #999;
      }

      .token.namespace {
        opacity: 0.7;
      }

      .token.property,
      .token.tag,
      .token.boolean,
      .token.number,
      .token.constant,
      .token.symbol,
      .token.deleted {
        color: #905;
      }

      .token.selector,
      .token.attr-name,
      .token.string,
      .token.char,
      .token.builtin,
      .token.inserted {
        color: #690;
      }

      .token.operator,
      .token.entity,
      .token.url,
      .language-css .token.string,
      .style .token.string {
        color: #9a6e3a;
        /* This background color was intended by the author of this theme. */
        background: hsla(0, 0%, 100%, 0.5);
      }

      .token.atrule,
      .token.attr-value,
      .token.keyword {
        color: #07a;
      }

      .token.function,
      .token.class-name {
        color: #dd4a68;
      }

      .token.regex,
      .token.important,
      .token.variable {
        color: #e90;
      }

      .token.important,
      .token.bold {
        font-weight: bold;
      }
      .token.italic {
        font-style: italic;
      }

      .token.entity {
        cursor: help;
      }
    </style>
    <pre
      class="language-html font-mono text-p1 text0 bg-g0 radius2 border-solid border-p0 border0 text-p2 p0 min-row-height-playground"><code class="language-html font-mono text-p1 text0 leading1">${document}</code></pre>

    <script type="module">
      import Store from '/_static/bundles/store.mjs'
      import API from '/_static/bundles/api.mjs'
      class MarkupPreview extends HTMLElement {
        constructor() {
          super()
          this.api = API({
            worker: new Worker('__API_WORKER__'),
            store: Store(),
          })
          this.update = this.update.bind(this)
          this.codeBlock = this.querySelector('code')
        }
        connectedCallback() {
          this.api.subscribe(this.update)
        }
        disconnectedCallback() {
          this.api.unsubscribe(this.update)
        }

        update(srcDoc) {
          this.codeBlock.innerHTML = srcDoc.enhancedMarkup
        }
      }
      customElements.define('markup-preview', MarkupPreview)
    </script>
  `
}
