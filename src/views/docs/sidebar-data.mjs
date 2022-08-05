const TYPE = {
  category: 'category',
  doc: 'doc',
  link: 'link',
  tab: 'tab',
}

export const data = [
  // only tabs allowed at top level
  {
    type: TYPE.tab,
    label: 'Learn',
    slug: 'learn',
    items: [
      {
        slug: 'why-enhance',
        label: 'Why Enhance?',
        description: 'Our core philosophy',
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
          'editor-setup',
        ],
      },
      {
        type: TYPE.category,
        slug: 'starter-project',
        items: ['structure', 'pages', 'elements'],
      },
      {
        type: TYPE.category,
        slug: 'concepts',
        items: [
          { slug: 'single-file-components' },
          {
            slug: 'rendering',
            path: '/docs/learn/concepts/rendering/',
            description: 'The HTML render function',
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
            label: 'Transforms',
            slug: 'transforms',
            path: '/docs/learn/features/transforms/',
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
          { slug: 'css-utility-classes', label: 'CSS Utility Classes' },
          'bundling-plugin',
          'progressive-enhancement',
        ],
      },
      {
        type: TYPE.category,
        slug: 'deployment',
        items: [
          {
            slug: 'begin',
            label: 'Begin',
            description: 'The recommended FWA approach',
          },
          {
            slug: '11ty',
            label: '11ty',
            description: 'The choice for static site generation',
          },
          {
            slug: 'fastify',
            label: 'Fastify',
            description: 'The best Node web server',
          },
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
          'enhance-style-transform',
          'enhance-import-transform',
          {
            slug: 'enhance-styles',
            path: '/docs/reference/libraries/enhance-styles/',
            items: [{ slug: 'api', label: 'API' }, 'examples'],
          },
          {
            slug: 'enhance-data',
            path: '/docs/reference/libraries/enhance-data/',
            items: [{ slug: 'api', label: 'API' }],
          },
        ],
      },
    ],
  },
  {
    type: TYPE.tab,
    label: 'By Example',
    slug: 'by-example',
    items: [
      {
        type: TYPE.category,
        slug: 'progressive-enhancement',
        items: [
          { slug: 'smart-forms' },
          { slug: 'navigation', label: 'Navigation & Menus' },
        ],
      },
      {
        type: TYPE.category,
        slug: 'integrations',
        items: [{ slug: 'fastify' }, { slug: 'astro' }],
      },
    ],
  },
]

function unslug(string) {
  return string
    .replace(/-/g, ' ')
    .replace(/(^\w{1})|(\s+\w{1})/g, (l) => l.toUpperCase())
}

function testForActive(i) {
  return i.active || i.items?.some(testForActive)
}

function parseItems(items, root, activePath) {
  const parsedItems = items.map((item) => {
    if (typeof item === 'string') {
      // create full item from shorthand item
      item = {
        type: 'doc',
        slug: item,
        path: `/${root}/${item}`,
        label: unslug(item),
      }
    } else {
      if (!item.type) item.type = 'doc'
      if (!item.path) item.path = `/${root}/${item.slug}`
      if (!item.label && item.slug) item.label = unslug(item.slug)
    }

    if (item.items)
      item.items = parseItems(item.items, `${root}/${item.slug}`, activePath)

    item.active = item.path === activePath

    return item
  })

  // lazily mark tab as active
  parsedItems
    .filter((i) => i.type === 'tab')
    .forEach((tab, index) => {
      tab.active =
        `${tab.path}/` === activePath ||
        (index === 0 && `/${root}/` === activePath) ||
        tab.items.some(testForActive)
    })

  return parsedItems
}

export default function (docsRoute, activePath) {
  return parseItems(data, docsRoute, activePath)
}
