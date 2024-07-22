import path from 'path'
import url from 'url'
import { readFileSync } from 'fs'

export async function get(req) {
  let here = path.dirname(url.fileURLToPath(import.meta.url))

  let acceptEncoding = (req.headers && req.headers['accept-encoding'] ||
                        req.headers && req.headers['Accept-Encoding'])
  let returnCompressed = acceptEncoding && acceptEncoding.includes('br')

  let resp = {
    statusCode: 200,
    headers: {
      'content-type': 'application/rss+xml; charset=UTF-8',
    },
  }

  if (returnCompressed) {
    let postsFilePath = path.join(here, 'rss.br')
    resp.body = readFileSync(postsFilePath, 'utf-8')
    resp.isBase64Encoded = true
    resp.headers['content-encoding'] = 'br'
  } else {
    let postsFilePath = path.join(here, 'rss.xml')
    resp.body = readFileSync(postsFilePath, 'utf-8')
  }

  return resp
}
