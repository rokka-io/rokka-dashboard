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

/**
 * Turn a date into the `YYYY-MM-DDTHH:mm` a `datetime-local` input wants.
 *
 * The value is in the browser's timezone, that's what such an input displays.
 *
 * @param {?string} str An ISO 8601 date
 *
 * @returns {string} Empty string for no/invalid date
 */
export function toDatetimeLocal(str) {
  if (!str) {
    return ''
  }
  const date = new Date(str)
  if (isNaN(date.getTime())) {
    return ''
  }
  const pad = (num) => String(num).padStart(2, '0')
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}`
  )
}

/**
 * Turn the value of a `datetime-local` input back into an ISO 8601 date.
 *
 * @param {?string} value
 *
 * @returns {?string} null for an empty/invalid value, which is also what the
 *                    API wants to clear an expiration date
 */
export function fromDatetimeLocal(value) {
  if (!value) {
    return null
  }
  const date = new Date(value)
  if (isNaN(date.getTime())) {
    return null
  }
  return date.toISOString()
}

/**
 * Whether a date is in the past.
 *
 * @param {?string} str An ISO 8601 date
 *
 * @returns {boolean} false for no/invalid date
 */
export function isExpired(str) {
  if (!str) {
    return false
  }
  const date = new Date(str)
  return !isNaN(date.getTime()) && date.getTime() < Date.now()
}
