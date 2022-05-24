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

      markup-preview code[class*='language-'],
      markup-preview pre[class*='language-'] {
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

      markup-preview pre[class*='language-']::-moz-selection,
      markup-preview pre[class*='language-'] ::-moz-selection,
      markup-preview code[class*='language-']::-moz-selection,
      markup-preview code[class*='language-'] ::-moz-selection {
        text-shadow: none;
        background: #b3d4fc;
      }

      markup-preview pre[class*='language-']::selection,
      markup-preview pre[class*='language-'] ::selection,
      markup-preview code[class*='language-']::selection,
      markup-preview code[class*='language-'] ::selection {
        text-shadow: none;
        background: #b3d4fc;
      }

      @media print {
        markup-preview code[class*='language-'],
        markup-preview pre[class*='language-'] {
          text-shadow: none;
        }
      }

      /* Code blocks */
      /*code-editor pre[class*='language-'] {
              padding: 1em;
              margin: 0.5em 0;
              overflow: auto;
            }*/

      markup-preview :not(pre) > code[class*='language-'],
      markup-preview pre[class*='language-'] {
        /*background: #f5f2f0;*/
      }

      /* Inline code */
      /*code-editor :not(pre) > code[class*='language-'] {
              padding: 0.1em;
              border-radius: 0.3em;
              white-space: normal;
            }*/

      markup-preview .token.comment,
      markup-preview .token.prolog,
      markup-preview .token.doctype,
      markup-preview .token.cdata {
        color: slategray;
      }

      markup-preview .token.punctuation {
        color: #999;
      }

      markup-preview .token.namespace {
        opacity: 0.7;
      }

      markup-preview .token.property,
      markup-preview .token.tag,
      markup-preview .token.boolean,
      markup-preview .token.number,
      markup-preview .token.constant,
      markup-preview .token.symbol,
      markup-preview .token.deleted {
        color: #905;
      }

      markup-preview .token.selector,
      markup-preview .token.attr-name,
      markup-preview .token.string,
      markup-preview .token.char,
      markup-preview .token.builtin,
      markup-preview .token.inserted {
        color: #690;
      }

      markup-preview .token.operator,
      markup-preview .token.entity,
      markup-preview .token.url,
      markup-preview .language-css .token.string,
      markup-preview .style .token.string {
        color: #9a6e3a;
        /* This background color was intended by the author of this theme. */
        background: hsla(0, 0%, 100%, 0.5);
      }

      markup-preview .token.atrule,
      markup-preview .token.attr-value,
      markup-preview .token.keyword {
        color: #07a;
      }

      markup-preview .token.function,
      markup-preview .token.class-name {
        color: #dd4a68;
      }

      markup-preview .token.regex,
      markup-preview .token.important,
      markup-preview .token.variable {
        color: #e90;
      }

      markup-preview .token.important,
      markup-preview .token.bold {
        font-weight: bold;
      }
      markup-preview .token.italic {
        font-style: italic;
      }

      markup-preview .token.entity {
        cursor: help;
      }
    </style>
    <pre
      class="language-html font-mono text-p1 text0 bg-g0 radius2 border-solid border-p0 border0 text-p2 p0 min-row-height-playground">
      <code class="language-html font-mono text-p1 text0 leading1">
${document}</code>
          </pre>

    <script type="module">
      import Store from '/_bundles/store.mjs'
      import API from '/_bundles/api.mjs'
      class MarkupPreview extends HTMLElement {
        constructor() {
          super()
          this.api = API({
            worker: new Worker('__WORKER_SCRIPT_URL__'),
            store: Store()
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
