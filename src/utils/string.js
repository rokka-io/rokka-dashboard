export function readableInputLabel(str) {
  return str.split('_').join(' ')
}

export function formatDate(str, defaultString = '') {
  try {
    return str ? new Date(str).toUTCString() : defaultString
  } catch (e) {
    console.log('Could not parse date: ', str)
    return str
  }
}
