import { escape } from 'querystring'
import frontmatter from 'tiny-frontmatter'
import Markdown from 'markdown-it'
import markdownClass from './markdown-class.mjs'
import markdownExternalAnchor from 'markdown-it-external-anchor'
import _markdownToC from 'markdown-it-toc-and-anchor'
const markdownToC = _markdownToC.default

import classMapping from './markdown-class-mappings.mjs'
// const { escapeHtml } = Markdown().utils
// import hljs from './highlighter.mjs'
// const highlight = hljs.bind(null, hljs, escapeHtml)

// reproduces the slugify algorithm used in markdown-it-external-anchor
const slugify = (s) =>
  escape(
    String(s).trim().toLowerCase().replace(/\s+/g, '-').replace(/\(\)/g, '')
  )

export default function (fileContents) {
  let docOutline = ''
  const markdown = new Markdown({
    linkify: true,
    html: true,
    typographer: true
    // highlight
  })
    .use(markdownClass, classMapping)
    .use(markdownExternalAnchor)
    .use(markdownToC, {
      anchorLink: false,
      slugify,
      tocClassName: 'pageToC',
      tocFirstLevel: 2,
      tocLastLevel: 6,
      tocCallback: (tocMarkdown, tocArray, tocHtml) => {
        docOutline = tocHtml
      }
    })
  const { attributes, body } = frontmatter(fileContents)
  const children = markdown.render(body)

  return {
    ...attributes,
    children,
    docOutline,
    titleSlug: slugify(attributes.title)
  }
}
