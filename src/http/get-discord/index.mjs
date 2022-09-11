async function http() {
  return {
    statusCode: 301,
    headers: { location: 'https://discord.gg/J8bUSfKs8W' },
  }
}

export const handler = http
