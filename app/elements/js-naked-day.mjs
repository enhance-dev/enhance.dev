function isNakedDay () {
  const now = new Date()
  const year = now.getFullYear()
  const start = new Date(year, 3, 24, -14, 0, 0).getTime() / 1000
  const end = new Date(year, 3, 24, 36, 0, 0).getTime() / 1000
  const z = now.getTimezoneOffset() * 60
  const currentTime = now.getTime() / 1000 - z

  return currentTime >= start && currentTime <= end
}

export default function JSNakedDay ({ html }) {
  return html`
        ${isNakedDay() ? '' : '<slot></slot>'}
      `
}
