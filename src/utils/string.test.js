import { readableInputLabel, formatDate } from './string'

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
