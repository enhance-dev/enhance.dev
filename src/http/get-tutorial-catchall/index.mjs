import arc from '@architect/functions'
import html from './html.mjs'

export const handler = arc.http.async(html)
