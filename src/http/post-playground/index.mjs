import arc from '@architect/functions'
import { ulid } from 'ulid'
import data from '@begin/data'

export const handler = arc.http.async(savePlayground)

async function savePlayground(req) {
  const body = req.body

  const previousKey = req.query?.key
  // console.log('previous key', previousKey)
  const newKey = ulid()

  const now = new Date()
  const ttl = Math.round(now.getTime() / 1000) + 24 * 60 * 60
  let previous = ''
  try {
    previous = await data.get({
      key: previousKey,
      table: 'repl'
    })
  } catch (e) {}
  await data.set({
    key: newKey,
    table: 'repl',
    ttl,
    repl: {
      openEditor: body?.openEditor || 1,
      openPreview: body?.openPreview || 1,
      enhancedMarkup: previous?.repl?.enhancedMarkup || '',
      previewDoc: previous?.repl?.previewDoc || '',
      entrySrc: body.entrySrc,
      component1Src: body.component1Src,
      component2Src: body.component2Src
    }
  })
  return {
    statusCode: 302,
    location: `/playground?key=${newKey}`
  }
}
