import {
  classifyMfaError,
  MFA_REQUIRED,
  MFA_ENROLLMENT_REQUIRED,
  TOTP_INVALID,
  TOTP_RATE_LIMITED,
} from './mfaErrors'

describe('classifyMfaError', () => {
  it('classifies flat MFA error bodies', () => {
    expect(classifyMfaError({ body: { error: 'mfa_required' } })).toBe(MFA_REQUIRED)
    expect(classifyMfaError({ body: { error: 'mfa_enrollment_required' } })).toBe(
      MFA_ENROLLMENT_REQUIRED,
    )
    expect(classifyMfaError({ body: { error: 'totp_invalid' } })).toBe(TOTP_INVALID)
    expect(classifyMfaError({ body: { error: 'totp_rate_limited' } })).toBe(TOTP_RATE_LIMITED)
  })

  it('returns null for other flat error strings', () => {
    expect(classifyMfaError({ body: { error: 'something_else' } })).toBeNull()
  })

  it('returns null for the nested error object shape', () => {
    expect(classifyMfaError({ body: { error: { message: 'Stack not found' } } })).toBeNull()
  })

  it('returns null for missing bodies and errors', () => {
    expect(classifyMfaError(undefined)).toBeNull()
    expect(classifyMfaError({})).toBeNull()
    expect(classifyMfaError({ body: {} })).toBeNull()
    expect(classifyMfaError({ statusCode: 401 })).toBeNull()
  })
})
