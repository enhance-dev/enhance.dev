/* eslint-disable filenames/match-regex */
const TYPE = {
  category: 'category',
  doc: 'doc',
  link: 'link',
  tab: 'tab',
}

export default [
  // only tabs allowed at top level
  {
    type: TYPE.tab,
    label: 'Learn',
    slug: 'learn',
    items: [
      {
        slug: 'why-enhance',
        label: 'Why Enhance?',
        description: 'The core philosophy of Enhance.',
      },
      {
        type: TYPE.category,
        slug: 'get-started',
        items: [
          {
            // verbose
            type: TYPE.doc, // default
            label: 'Quick Start',
            path: '/docs/quick-start', // optional, absolute
            slug: 'quick-start',
          },
          'install', // shorthand
        ],
      },
      {
        type: TYPE.category,
        slug: 'concepts',
        items: [
          { slug: 'single-file-components' },
          {
            slug: 'rendering',
            path: '/docs/learn/concepts/rendering/',
            description:
              'String template literals and the HTML render function',
            items: ['element-expansion', 'slots'],
          },
          {
            slug: 'state',
            path: '/docs/learn/concepts/state/',
            items: ['attributes', 'store'],
          },
          'document-output',
        ],
      },
      {
        type: TYPE.category,
        slug: 'features',
        items: [
          {
            label: 'JavaScript Transforms',
            slug: 'js-transforms',
          },
          {
            label: 'CSS Transforms',
            slug: 'css-transforms',
          },
        ],
      },
      {
        type: TYPE.category,
        slug: 'practices',
        items: [
          {
            slug: 'base-element',
            label: 'BaseElement',
            path: '/docs/learn/practices/base-element/',
            items: ['light', 'shady', 'shadow'],
          },
          'css-utility-classes',
          'bundling-plugin',
          'progressive-enhancement',
          { slug: 'ssg', label: 'SSG' },
          { slug: 'ssr', label: 'SSR' },
        ],
      },
      {
        type: TYPE.category,
        slug: 'deployment',
        items: [
          {
            slug: 'beginner',
            label: 'beginner',
            description: 'The recommended FWA approach',
          },
          '11ty',
        ],
      },
    ],
  },
  {
    type: TYPE.tab,
    label: 'Reference',
    slug: 'reference',
    items: [
      {
        type: TYPE.category,
        label: 'Enhance SSR',
        slug: 'enhance-ssr',
        description: 'The main power source.',
        items: [
          { slug: 'intro', label: 'Introduction' },
          { slug: 'api', label: 'API' },
        ],
      },
      {
        type: TYPE.category,
        label: 'Complementary Libraries',
        slug: 'libraries',
        items: [
          {
            slug: 'enhance-styles',
            items: [{ slug: 'api', label: 'API' }, 'examples'],
          },
          {
            slug: 'enhance-data',
            items: [{ slug: 'api', label: 'API' }],
          },
        ],
      },
    ],
  },
]
