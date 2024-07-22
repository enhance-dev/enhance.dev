if (!process.env.ARC_ENV) {
  process.env.ARC_ENV = 'testing'
}
import matter from 'gray-matter'
import { readdir, readFile, writeFile } from 'fs/promises' // eslint-disable-line
import readingTime from 'reading-time' // eslint-disable-line
import { dirname, join, parse } from 'path' // eslint-disable-line
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const base = join(__dirname, '..', '..', 'app', 'blog', 'posts')

async function generate () {
  const posts = await readdir(base)

  async function render (path) {
    const file = await readFile(join(base, path), 'utf8')
    const result = matter(file)
    result.data.readtime = `${Math.floor(readingTime(file).minutes)} mins`
    return result.data
  }

  async function getData (filePath) {
    const frontmatter = await render(filePath)
    // frontmatter.image = frontmatter.image
    frontmatter.thumbnail = frontmatter.image.replace('/_public/blog', '/_public/blog/thumbnails')
    return {
      href: `/blog/posts/${parse(filePath).name}`,
      frontmatter
    }
  }

  const cards = []
  for (let path of posts) {
    let card = await getData(path)
    cards.push(card)
  }

  let postsJson = join(__dirname, '..', '..', 'app', 'api', 'blog', 'posts.json')
  console.log('Updated posts.json')
  await writeFile(postsJson, JSON.stringify(cards, null, 2))
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
