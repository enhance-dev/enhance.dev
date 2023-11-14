import navDataLoader from '../docs/nav-data.mjs'

export async function get() {
  const navData = navDataLoader('docs', '/why-enhance')

  return {
    json: {
      navData,
    },
  }
}
