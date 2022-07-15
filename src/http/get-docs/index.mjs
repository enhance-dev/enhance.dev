async function http() {
  return {
    statusCode: 301,
    headers: { location: '/docs/' },
  }
}

export const handler = http
