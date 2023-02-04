import QRCode from 'qrcode'

export async function get(req) {
  const { event } = req.pathParameters
  const dataUrl = await QRCode.toDataURL(`https://enhance.dev/cta/${event}`)

  return {
    json: {
      dataUrl,
    },
  }
}
