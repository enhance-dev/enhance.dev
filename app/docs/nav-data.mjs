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
            path: '/docs/', // optional, absolute
            slug: 'quick-start',
          },
          'editor-setup',
        ],
      },
      {
        type: TYPE.category,
        slug: 'starter-project',
        items: [
          'structure',
          'pages',
          'elements',
          { slug: 'api', label: 'API' },
          'head',
          '404-errors',
        ],
      },
      {
        type: TYPE.category,
        slug: 'concepts',
        items: [
          'single-file-components',
          {
            slug: 'html',
            label: 'html',
            path: '/docs/learn/concepts/html/',
            description: 'The HTML render function',
            items: ['elements', 'slots'],
          },
          {
            slug: 'state',
            path: '/docs/learn/concepts/state/',
            items: ['attributes', 'store'],
          },
          {
            slug: 'styling',
            path: '/docs/learn/concepts/styling/',
            items: ['utility-classes', 'element-styles'],
          },
          { slug: 'api-routes', label: 'API Routes' },
          'lifecycle',
        ],
      },
      {
        type: TYPE.category,
        slug: 'practices',
        items: [
          'progressive-enhancement',
          'browser-modules',
          'testing',
          { slug: 'types', label: 'Type Definitions' },
          { slug: 'env-vars', label: 'Environment Variables' },
          'architect-migration',
        ],
      },
      /*
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
                label: 'Script Transforms',
                slug: 'script-transforms',
              },
              {
                label: 'Style Transforms',
                slug: 'style-transforms',
              },
            ],
          },
        ],
      },
      */
      {
        type: TYPE.category,
        slug: 'deployment',
        items: [
          {
            slug: 'architect',
            label: 'Architect',
            description: 'Deploy to AWS directly',
          },
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
  /*
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
  */
  {
    type: TYPE.tab,
    label: 'By Example',
    slug: 'by-example',
    items: [
      {
        type: TYPE.category,
        label: 'Examples',
        slug: 'examples',
        items: ['standalone-enhance', 'browser-testing'],
      },
      {
        type: TYPE.category,
        label: 'Integrations',
        slug: 'integrations',
        items: [
          { slug: 'custom-elements-in-md', label: 'Custom Elements in .md' },
          { slug: 'with-tailwind', label: 'With tailwind' },
          { slug: 'with-alpinejs', label: 'With Alpine.js' },
        ],
      },
    ],
  },
]

export const other = {
  community: {
    label: 'Community',
    items: [
      {
        label: 'GitHub',
        url: 'https://github.com/enhance-dev',
        description: 'Visit Enhance on GitHub.',
      },
      /* {
        label: 'Discussions',
        url: 'https://github.com/orgs/enhance-dev/discussions',
        description: 'Browse and participate in Enhance tech discussions.',
      }, */
      {
        label: 'Discord',
        url: '/discord',
        description:
          'Join our Discord server to chat about development and get help from the community.',
      },
    ],
  },
}

export function unslug(string) {
  return string
    .replace(/-/g, ' ')
    .replace(/(^\w{1})|(\s+\w{1})/g, (l) => l.toUpperCase())
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
      if (!item.type) {
        item.type = 'doc'
      }
      if (!item.path) {
        item.path = `/${root}/${item.slug}`
      }
      if (!item.label && item.slug) {
        item.label = unslug(item.slug)
      }
    }

    if (item.items) {
      item.items = parseItems(item.items, `${root}/${item.slug}`, activePath)
    }

    item.active = item.path === activePath

    return item
  })

  function testForActive(i) {
    return i.active || i.items?.some(testForActive)
  }

  // lazily mark tab as active
  parsedItems
    .filter((i) => i.type === 'tab')
    .forEach((tab, index) => {
      tab.activeTab =
        `${tab.path}/` === activePath ||
        (index === 0 && `/${root}/` === activePath) ||
        tab.items.some(testForActive)
    })

  return parsedItems
}

export default function (docsRoute, activePath) {
  return parseItems(data, docsRoute, activePath)
}
