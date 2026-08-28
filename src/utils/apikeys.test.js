import { MAX_ALLOWED_IPS, parseAllowedIps } from './apikeys'

test('parseAllowedIps splits on commas and newlines and drops blanks', () => {
  expect(parseAllowedIps(' 1.2.3.4, 10.0.0.0/24 \n\n 5.6.7.8 ,, ')).toEqual([
    '1.2.3.4',
    '10.0.0.0/24',
    '5.6.7.8',
  ])
})

test('parseAllowedIps returns nothing for an empty or blank value', () => {
  expect(parseAllowedIps('')).toEqual([])
  expect(parseAllowedIps('  \n ')).toEqual([])
  expect(parseAllowedIps(',,')).toEqual([])
})

test('MAX_ALLOWED_IPS matches the API limit', () => {
  expect(MAX_ALLOWED_IPS).toBe(10)
})
