import data from '@begin/data'

const redirects = {
  '/backend-workshop': '/workshop',
  '/learn-backend': '/workshop',
  '/backend': '/workshop',
}

const snakeToCamel = (str) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace('-', '').replace('_', '')
    )

export async function checkRedirects (req) {
  const path = req.requestContext.http.path
  const isPath = Object.keys(redirects).includes(path)

  if (isPath) {
    let prop = path.startsWith('/') ? path.substring(1) : path
    await data.incr({
      table: 'views',
      key: 'cta',
      prop: snakeToCamel(prop),
    })

    return {
      statusCode: 302,
      headers: {
        location: redirects[path],
      },
    }
  }
}
