const TYPE = {
  category: 'category',
  doc: 'doc',
  parentDoc: 'parentDoc',
}

export const data = [
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
      'glossary',
    ],
  },
  {
    type: TYPE.category,
    slug: 'conventions',
    items: [
      'structure',
      'head',
      { slug: 'css', label: 'CSS' },
      'pages',
      'elements',
      'components',
      { slug: 'api', label: 'APIs' },
      'browser',
      'public',
      '404-errors',
      'preflight',
    ],
  },
  {
    type: TYPE.category,
    slug: 'routing',
    items: [
      {
        slug: '',
        label: 'Overview',
      },
      'lifecycle',
      {
        slug: 'dynamic-routes',
        label: 'Dynamic Routes',
      },
      {
        slug: 'catch-all-routes',
        label: 'Catch All Routes',
      },
      {
        slug: 'api-routes',
        path: '/docs/routing/api-routes/',
        label: 'API Routes',
        hasChildren: true,
        items: ['middleware', 'tutorial'],
      },
    ],
  },
  {
    type: TYPE.category,
    slug: 'elements',
    items: [
      {
        slug: '',
        label: 'Overview',
      },
      {
        slug: 'html',
        path: '/docs/elements/html/',
        label: 'HTML',
        hasChildren: true,
        items: ['slots'],
      },
      {
        slug: 'state',
        path: '/docs/elements/state/',
        label: 'State',
        hasChildren: true,
        items: [
          'attributes',
          'store',
          {
            slug: 'instance-id',
            label: 'Instance ID',
          },
          'context',
        ],
      },
    ],
  },
  {
    type: TYPE.category,
    slug: 'enhance-styles',
    label: 'Enhance Styles',
    items: [
      {
        slug: '',
        label: 'Overview',
      },
      'utility-classes',
      'logical-properties',
      'customization',
      'modular-scales',
      'element-styles',
      {
        slug: 'alternatives',
        path: '/docs/enhance-styles/alternatives/',
        hasChildren: true,
        items: ['tailwind', 'sass'],
      },
    ],
  },
  {
    type: TYPE.category,
    label: 'Enhance UI',
    slug: 'enhance-ui',
    items: [{ slug: 'image', label: 'Image' }],
  },
  {
    type: TYPE.category,
    slug: 'configuration',
    items: [
      { slug: 'env-vars', label: 'Environment Variables' },
      { slug: 'types', label: 'Type Definitions' },
    ],
  },
  {
    type: TYPE.category,
    slug: 'patterns',
    items: [
      'progressive-enhancement',
      'building-for-the-browser',
      'form-validation',
      {
        slug: 'testing',
        path: '/docs/patterns/testing/',
        hasChildren: true,
        items: [{ slug: 'webdriverio', label: 'WebdriverIO' }],
      },
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
        slug: 'begin',
        label: 'Begin',
        description: 'The recommended FWA approach',
      },
      {
        slug: 'architect',
        label: 'Architect',
        description: 'Deploy to AWS directly',
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
      {
        label: 'Discord',
        url: '/discord',
        description:
          'Join our Discord server to chat about development and get help from the community.',
      },
      {
        label: 'Mastodon',
        url: 'https://fosstodon.org/@enhance_dev',
        description:
          "Follow Enhance in the Fediverse. We're huge fans of the IndieWeb!",
        rel: 'me',
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
