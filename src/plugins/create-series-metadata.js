if (!process.env.ARC_ENV) {
  process.env.ARC_ENV = 'testing'
}
import { dirname, join } from 'path' // eslint-disable-line
import { fileURLToPath } from 'url'
import { readFile, writeFile } from 'fs/promises' // eslint-disable-line

const __dirname = dirname(fileURLToPath(import.meta.url))
const postsDir = join(__dirname, '..', '..', 'app', 'blog', 'posts')

async function generate () {
  const postsJson = join(__dirname, '..', '..', 'app', 'api', 'blog', 'posts.json')
  const postsFile = await readFile(postsJson, 'utf8')
  const postsData = JSON.parse(postsFile)
  const series = postsData.reduce((allSeries, post) => {
    const { frontmatter } = post
    const { series } = frontmatter

    if (!series) return allSeries

    const postDataForSeries = {
      href: post.href,
      title: post.frontmatter.title,
    }

    if (allSeries[series]) {
      return {
        ...allSeries,
        [series]: [
          ...allSeries[series],
          postDataForSeries,
        ]

      }
    }

    return {
      ...allSeries,
      [series]: [
        postDataForSeries,
      ]
    }
  }, {})

  const seriesJson = join(__dirname, '..', '..', 'app', 'api', 'blog', 'series.json')
  await writeFile(seriesJson, JSON.stringify(series, null, 2))
  console.log('Updated series.json')
}

export default {
  deploy: {
    start: generate,
  },
  sandbox: {
    start: generate,
    watcher: async (params) => {
      let { filename } = params
      if (!filename.includes(postsDir) || !filename.endsWith('.md')) {
        return
      }
      await generate(params)
    }
  }
}
