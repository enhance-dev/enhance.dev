import QRCode from 'qrcode'

export async function get(req) {
  const { event } = req.pathParameters
  const dataUrl = await QRCode.toDataURL(`https://enhance.dev/cta/${event}`)
  const gacode =
    process.env.ARC_ENV === 'production' ? 'G-FQHNPN78V3' : 'G-0ES194BJQ6'

  return {
    json: {
      dataUrl,
      gacode,
    },
  }
}
