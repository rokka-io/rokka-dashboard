import {
  readableInputLabel,
  formatDate,
  toDatetimeLocal,
  fromDatetimeLocal,
  isExpired,
} from './string'

test('readableInputLabel replaces underscores with spaces', () => {
  expect(readableInputLabel('some_input_label')).toBe('some input label')
})

test('readableInputLabel returns single word unchanged', () => {
  expect(readableInputLabel('label')).toBe('label')
})

test('readableInputLabel handles empty string', () => {
  expect(readableInputLabel('')).toBe('')
})

test('formatDate formats a valid date string', () => {
  const result = formatDate('2018-01-15T12:00:00Z')
  expect(result).toBe(new Date('2018-01-15T12:00:00Z').toUTCString())
})

test('formatDate returns default string for falsy input', () => {
  expect(formatDate(null, 'N/A')).toBe('N/A')
  expect(formatDate('', 'N/A')).toBe('N/A')
  expect(formatDate(undefined, 'N/A')).toBe('N/A')
})

test('formatDate returns empty string by default for falsy input', () => {
  expect(formatDate(null)).toBe('')
  expect(formatDate('')).toBe('')
})

test('toDatetimeLocal formats a date the way a datetime-local input wants it', () => {
  // built from local parts, so the assertion holds in any timezone
  const date = new Date(2027, 0, 2, 3, 4)
  expect(toDatetimeLocal(date.toISOString())).toBe('2027-01-02T03:04')
})

test('toDatetimeLocal returns an empty string for no or invalid dates', () => {
  expect(toDatetimeLocal(null)).toBe('')
  expect(toDatetimeLocal('')).toBe('')
  expect(toDatetimeLocal(undefined)).toBe('')
  expect(toDatetimeLocal('not a date')).toBe('')
})

test('fromDatetimeLocal round trips back to the same instant', () => {
  const date = new Date(2027, 0, 2, 3, 4)
  expect(fromDatetimeLocal(toDatetimeLocal(date.toISOString()))).toBe(date.toISOString())
})

test('fromDatetimeLocal returns null for an empty or invalid value, which clears the date', () => {
  expect(fromDatetimeLocal('')).toBeNull()
  expect(fromDatetimeLocal(null)).toBeNull()
  expect(fromDatetimeLocal('not a date')).toBeNull()
})

test('isExpired only for a date in the past', () => {
  expect(isExpired(new Date(Date.now() - 1000).toISOString())).toBe(true)
  expect(isExpired(new Date(Date.now() + 60000).toISOString())).toBe(false)
  expect(isExpired(null)).toBe(false)
  expect(isExpired('')).toBe(false)
  expect(isExpired('not a date')).toBe(false)
})
