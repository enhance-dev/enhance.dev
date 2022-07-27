import arc from '@architect/functions'
import { nanoid } from 'nanoid'
import data from '@begin/data'

export const handler = arc.http.async(savePlayground)

async function savePlayground(req) {
  const body = req.body

  const previousKey = req.query?.key
  const deleteTab = req.query?.deleteTab
  const addTab = req.query?.addTab

  const newKey = nanoid(10)

  const now = new Date()
  const ttl = Math.round(now.getTime() / 1000) + 24 * 60 * 60
  let previous = ''
  try {
    previous = await data.get({
      key: previousKey,
      table: 'repl',
    })
  } catch (e) {
    console.log(e)
  }
  const components = Object.keys(body)
    .filter((i) => i.startsWith('tab-'))
    .filter((i) => (deleteTab ? 'tab-' + deleteTab !== i : true))

  let repl = {
    openEditor: body?.openEditor || 1,
    openPreview: body?.openPreview || 1,
    enhancedMarkup: previous?.repl?.enhancedMarkup || '',
    previewDoc: previous?.repl?.previewDoc || '',
    entrySrc: body.entrySrc,
  }
  components.forEach((i) => (repl[i] = body[i]))
  if (addTab) repl[`tab-${components.length + 1}`] = ''
  await data.set({
    key: newKey,
    table: 'repl',
    repl,
    ttl,
  })
  return {
    statusCode: 302,
    location: `/playground?key=${newKey}`,
  }
}
