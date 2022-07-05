const TYPE = {
  category: 'category',
  doc: 'doc',
  link: 'link',
  tab: 'tab'
}

export default [
  // only tabs allowed at top level
  {
    type: TYPE.tab,
    label: 'Learn',
    slug: 'learn',
    items: [
      {
        type: TYPE.category,
        slug: 'start-here',
        // label: 'Start Here', // derived from slug
        items: [
          {
            // verbose
            type: TYPE.doc, // default
            label: 'Getting Started',
            path: '/docs/getting-started', // optional, absolute
            slug: 'getting-started'
          },
          'installation' // shorthand
        ]
      },
      {
        type: TYPE.category,
        slug: 'project-structure',
        label: 'Project Structure',
        description: 'Structuring an Enhance project.',
        items: [
          'pages',
          'layouts',
          'elements',
          {
            // type: TYPE.doc, // default
            slug: 'data',
            label: 'Data Layer',
            description: "Enhance's data layer." // optional
            // path: '/docs/learn/project-structure/data', // optional, inferred from slug
          }
        ]
      },
      {
        type: TYPE.category,
        slug: 'components',
        label: 'Components',
        items: [
          'custom-elements',
          'web-components',
          'enhance-components',
          {
            label: 'JavaScript Transforms',
            slug: 'js-transforms'
          }
        ]
      },
      {
        type: TYPE.category,
        slug: 'styling',
        label: 'Styling',
        items: [
          'enhance-styles',
          {
            label: 'CSS Transforms',
            description: 'Programmatically alter styles.',
            slug: 'css-transforms',
            items: [
              'foo',
              { slug: 'bar', items: ['baz'] } // nested items are nested
            ]
          },
          'component',
          'instance'
        ]
      }
    ]
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
          { slug: 'api', label: 'API' }
        ]
      },
      {
        type: TYPE.category,
        label: 'Complementary Libraries',
        slug: 'libraries',
        items: [
          {
            slug: 'enhance-styles',
            items: [{ slug: 'api', label: 'API' }, 'examples']
          },
          {
            slug: 'enhance-data',
            items: [{ slug: 'api', label: 'API' }]
          }
        ]
      }
    ]
  }
]
