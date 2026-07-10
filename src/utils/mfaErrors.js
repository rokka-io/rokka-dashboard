export const MFA_REQUIRED = 'mfa_required'
export const MFA_ENROLLMENT_REQUIRED = 'mfa_enrollment_required'
export const TOTP_INVALID = 'totp_invalid'
export const TOTP_RATE_LIMITED = 'totp_rate_limited'

const MFA_ERRORS = [MFA_REQUIRED, MFA_ENROLLMENT_REQUIRED, TOTP_INVALID, TOTP_RATE_LIMITED]

/**
 * Classifies a rokka API error as one of the MFA/TOTP error codes, or null.
 *
 * MFA auth failures have a flat body shape ({error: 'mfa_required', ...}),
 * unlike most other rokka errors, where body.error is an object with a
 * message property. Both shapes are handled here.
 *
 * @param {*} err a caught rokka error (RokkaResponse)
 *
 * @returns {?string} one of the exported MFA error constants or null
 */
export function classifyMfaError(err) {
  const error = err && err.body && err.body.error
  return typeof error === 'string' && MFA_ERRORS.includes(error) ? error : null
}
