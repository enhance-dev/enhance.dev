import QRCode from 'qrcode'
import data from '@begin/data'

export async function get (req) {
  const { event } = req.pathParameters
  const dataUrl = await QRCode.toDataURL(`https://enhance.dev/cta/${event}`)
  const gacode =
    process.env.ARC_ENV === 'production' ? 'G-FQHNPN78V3' : 'G-0ES194BJQ6'

  await data.incr({
    table: 'views',
    key: 'cta',
    prop: event.toLowerCase(),
  })

  return {
    json: {
      dataUrl,
      gacode,
      doc: { title: `${event} CTA` },
    },
  }
}
