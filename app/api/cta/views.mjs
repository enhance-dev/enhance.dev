import data from '@begin/data'

export async function get () {
  let views = await data.get({
    table: 'views',
    key: 'cta',
  })

  return {
    json: {
      views,
    },
  }
}
