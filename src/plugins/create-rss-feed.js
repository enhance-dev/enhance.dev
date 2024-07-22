import { dirname, join, extname } from 'path' // eslint-disable-line
import { readdir, readFile, writeFile } from 'fs/promises' // eslint-disable-line
import { brotliCompressSync } from 'zlib'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const base = join(__dirname, '..', '..', 'app', 'blog', 'posts')

function getHostname (environment) {
  if ( environment ) {
    if (environment[0] === 'staging') {
      return 'https://staging.enhance.dev'
    }
    else if (environment[0] === 'production') {
      return 'https://enhance.dev'
    }
  }
  return 'http://localhost:3333'
}

async function generate () {
  const { Feed } = await import('feed')
  const { Arcdown } = await import('arcdown')
  const { isPublished } = await import('../../app/lib/parseDate.mjs')

  const arcdown = new Arcdown({})

  const posts = await readdir(base)

  const hostname = getHostname(process.argv.slice(2))

  async function render (path) {
    const file = await readFile(`${base}/${path}`, 'utf8')
    let result = await arcdown.render(file)
    return { content: result.html, frontmatter: result.frontmatter }
  }

  async function getData (pathName) {
    const { content, frontmatter } = await render(pathName)
    const filename = pathName.substring(
      0,
      pathName.length - extname(pathName).length
    )
    return {
      href: `${filename}`,
      content,
      frontmatter,
    }
  }

  const items = (
      await Promise.all( // eslint-disable-line
      posts
        .sort((a, b) => (a.post < b.post ? 1 : -1))
        .map(async (post) => await getData(post))
    ).catch(function (err) {
      console.log(err.message) // some coding error in handling happened
    })
  ).filter(({ frontmatter }) => isPublished(frontmatter.published))

  const feed = new Feed({
    title: 'Enhance.dev — Blog',
    description: 'The HTML first full stack web framework.',
    id: 'https://enhance.dev/blog',
    link: 'https://enhance.dev/blog',
    language: 'en',
    copyright: `All rights reserved ${new Date().getFullYear()}, Begin`,
    generator: 'enhance.dev via Feed for Node.js',
    author: {
      name: 'Enhance.dev',
      link: 'https://enhance.dev/',
    },
  })

  for (const post of items) {
    let { frontmatter, content, href } = post
    let { title = '', description = '', published = '', author = '', category = '' } = frontmatter
    let link = `${hostname}/blog/posts/${href}`
    let image = frontmatter.image ? `${hostname}${frontmatter.image}` : null
    let authorArray = author ? [ { name: author } ] : []
    let categoryArray = category ? category.split(',').map(str => { return { name: str.trim() } }) : []
    feed.addItem({
      title,
      id: link,
      link,
      description,
      content,
      date: new Date(published),
      author: authorArray,
      image,
      category: categoryArray
    })
  }

  let feedXml = feed.rss2()
  let rssFeed = join(__dirname, '..', '..', 'app', 'api', 'blog', 'rss.xml')
  await writeFile(rssFeed, feedXml)
  let rssBrotli = join(__dirname, '..', '..', 'app', 'api', 'blog', 'rss.br')
  await writeFile(rssBrotli, Buffer.from(brotliCompressSync(feedXml)).toString('base64'))
}

export default {
  deploy: {
    start: generate,
  },
  sandbox: {
    start: generate,
    watcher: async (params) => {
      let { filename } = params
      if (!filename.includes(base) || !filename.endsWith('.md')) {
        return
      }
      await generate(params)
    }
  }
}
