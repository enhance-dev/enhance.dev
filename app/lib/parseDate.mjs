function parseDate (str) {
  const parts = str.split(',')
  const year = parts[parts.length - 1]
  const [ monthName, day ] = parts[0].split(' ')
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const month = months.indexOf(monthName)
  // We want 6am Pacific so we add 13hrs to UTC time
  return Date.UTC(year, month, day, 13, 0, 0)
}

function isPublished (str) {
  return process.env.DISABLE_DATE_CHECK === 'true' ? true : parseDate(str) < Date.now()
}

export {
  isPublished,
  parseDate
}
