// For use when a collection of paths was just moved to a new route
function getRedirects(oldRoute, newRoute, paths) {
  return paths.reduce((redirects, path) => {
    redirects[`${oldRoute}/${path}`] = `${newRoute}/${path}`
    return redirects
  }, {})
}

const starterProject = getRedirects(
  'learn/starter-project',
  '/docs/conventions',
  [
    'structure',
    'pages',
    'elements',
    'api',
    'browser',
    'public',
    'head',
    '404-errors',
  ]
)

const state = getRedirects('learn/concepts/state', '/docs/elements/state', [
  '',
  '/',
  'attributes',
  'store',
])

const routing = getRedirects('learn/concepts/routing', '/docs/routing', [
  '',
  '/',
  'lifecycle',
  'dynamic-routes',
  'catch-all-routes',
  'api-routes',
])

const styling = getRedirects('learn/concepts/styling', '/docs/enhance-styles', [
  '',
  '/',
  'using-tailwind',
  'using-sass',
])

const enhanceStyles = getRedirects(
  'learn/concepts/styling/enhance-styles',
  '/docs/enhance-styles',
  [
    '',
    'utility-classes',
    'logical-properties',
    'customization',
    'modular-scales',
    'element-styles',
  ]
)

const configuration = getRedirects('learn/practices', '/docs/configuration', [
  'env-vars',
  'types',
])

const patterns = getRedirects('learn/practices', '/docs/patterns', [
  'progressive-enhancement',
  'testing',
  'testing/webdriverio',
  'architect-migration',
])

/* Docs redirects
 * All keys presume the incoming path starts with 'docs/'
 * Values must be pathed from the domain root
 */
export default {
  learn: '/docs',
  // New top level pages
  'learn/showcase': '/showcase',
  'learn/why-enhance': '/why-enhance',
  // New Get Started
  'learn/get-started/editor-setup': '/docs/get-started/editor-setup',
  'learn/concepts/glossary': '/docs/get-started/glossary',
  // Starter project -> Conventions
  ...starterProject,
  ...routing,
  // Elements
  'learn/concepts/single-file-components': '/docs/elements/',
  'learn/concepts/html': '/docs/elements/html',
  'learn/concepts/html/elements': '/docs/elements/html',
  'learn/concepts/html/slots': '/docs/elements/html/slots',
  ...state,
  ...styling,
  'learn/concepts/styling/css': '/docs/conventions/css',
  ...enhanceStyles,
  ...configuration,
  ...patterns,
  'unsorted/browser-modules': '/docs/patterns/browser-modules',
}
