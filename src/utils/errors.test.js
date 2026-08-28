import {
  getApiErrorMessage,
  getAuthErrorCode,
  getAuthErrorMessage,
  needsMfaEnrollment,
  needsTotp,
} from './errors'

// Authentication failures have a flat body, see ApiKeyAuthenticator::onAuthenticationFailure()
const authError = (code, statusCode = 401) => ({
  statusCode,
  body: {
    code: statusCode,
    message: 'some message',
    error: code,
    invalid_authentication: true,
  },
})

// Normal API errors nest their message instead
const apiError = (message, statusCode = 400) => ({
  statusCode,
  body: { error: { code: statusCode, message } },
})

test('getAuthErrorCode reads the flat error code', () => {
  expect(getAuthErrorCode(authError('mfa_required'))).toBe('mfa_required')
  expect(getAuthErrorCode(authError('key_expired'))).toBe('key_expired')
})

test('getAuthErrorCode ignores a nested error object', () => {
  expect(getAuthErrorCode(apiError('Not found', 404))).toBeNull()
})

test('getAuthErrorCode copes with anything else', () => {
  expect(getAuthErrorCode(null)).toBeNull()
  expect(getAuthErrorCode({})).toBeNull()
  expect(getAuthErrorCode({ body: null })).toBeNull()
  expect(getAuthErrorCode(new Error('network'))).toBeNull()
})

test('getAuthErrorMessage maps every code we know', () => {
  const codes = [
    'mfa_required',
    'mfa_enrollment_required',
    'totp_invalid',
    'totp_rate_limited',
    'key_expired',
    'ip_not_allowed',
  ]
  codes.forEach((code) => {
    expect(getAuthErrorMessage(authError(code))).not.toBe('Authentication failed')
  })
})

test('getAuthErrorMessage falls back for an unknown or absent code', () => {
  expect(getAuthErrorMessage(authError('something_new'))).toBe('Authentication failed')
  expect(getAuthErrorMessage(apiError('Not found', 404))).toBe('Authentication failed')
  expect(getAuthErrorMessage(null, 'Nope')).toBe('Nope')
})

test('needsTotp is true for a missing and for a wrong code', () => {
  expect(needsTotp(authError('mfa_required'))).toBe(true)
  expect(needsTotp(authError('totp_invalid'))).toBe(true)
})

test('needsTotp is false for everything else', () => {
  expect(needsTotp(authError('mfa_enrollment_required'))).toBe(false)
  expect(needsTotp(authError('key_expired'))).toBe(false)
  expect(needsTotp(authError('totp_rate_limited', 429))).toBe(false)
  expect(needsTotp(apiError('Not found', 404))).toBe(false)
})

test('needsMfaEnrollment only matches the enrollment code', () => {
  expect(needsMfaEnrollment(authError('mfa_enrollment_required'))).toBe(true)
  expect(needsMfaEnrollment(authError('mfa_required'))).toBe(false)
  expect(needsMfaEnrollment(null)).toBe(false)
})

test('getApiErrorMessage reads the nested message', () => {
  expect(getApiErrorMessage(apiError('Key was not found', 404))).toBe('Key was not found')
})

test('getApiErrorMessage falls back to the flat message of an auth failure', () => {
  expect(getApiErrorMessage(authError('key_expired'))).toBe('some message')
})

test('getApiErrorMessage falls back to the error itself', () => {
  expect(getApiErrorMessage(new Error('network down'))).toBe('network down')
  expect(getApiErrorMessage(null, 'Unknown')).toBe('Unknown')
  expect(getApiErrorMessage({}, 'Unknown')).toBe('Unknown')
})
