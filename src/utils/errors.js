/**
 * Helpers for the authentication errors of the rokka API.
 *
 * Authentication failures are built by `ApiKeyAuthenticator::onAuthenticationFailure()`
 * and have a *flat* body:
 *
 *     {code, message, error, invalid_authentication}
 *
 * Normal API errors nest their message instead (`body.error.message`), which is
 * what the rest of the dashboard reads. Don't mix the two up.
 */

/** An MFA key was used, but no TOTP code was given */
export const MFA_REQUIRED = 'mfa_required'
/** An MFA key was used, but the user has no TOTP setup yet */
export const MFA_ENROLLMENT_REQUIRED = 'mfa_enrollment_required'
/** The TOTP code was wrong or already used */
export const TOTP_INVALID = 'totp_invalid'
/** Too many TOTP attempts (10 per 15 minutes) */
export const TOTP_RATE_LIMITED = 'totp_rate_limited'
/** The key's `expires` date has passed */
export const KEY_EXPIRED = 'key_expired'
/** The request's IP is not in the key's `allowed_ips` */
export const IP_NOT_ALLOWED = 'ip_not_allowed'

const AUTH_ERROR_MESSAGES = {
  [MFA_REQUIRED]: 'This Api Key needs a two-factor code.',
  [MFA_ENROLLMENT_REQUIRED]:
    'This Api Key needs two-factor authentication, but it is not set up yet. Set it up now to continue.',
  [TOTP_INVALID]: 'That code was not correct (or was already used). Please try the next one.',
  [TOTP_RATE_LIMITED]: 'Too many code attempts. Please wait a few minutes and try again.',
  [KEY_EXPIRED]: 'This Api Key has expired. Please use another one.',
  [IP_NOT_ALLOWED]: 'This Api Key is not allowed from your current IP address.',
}

/**
 * Read the `error` code out of a rokka authentication failure.
 *
 * @param {*} err An error thrown by the rokka client
 *
 * @returns {?string} One of the codes above, or null if it isn't an authentication failure
 */
export function getAuthErrorCode(err) {
  const body = err && err.body
  if (!body || typeof body !== 'object') {
    return null
  }
  // `error` is a string on auth failures and an object on normal API errors
  return typeof body.error === 'string' ? body.error : null
}

/**
 * A message for the user, for a rokka authentication failure.
 *
 * @param {*}       err              An error thrown by the rokka client
 * @param {?string} defaultMessage   Used when it isn't an authentication failure we know
 *
 * @returns {string}
 */
export function getAuthErrorMessage(err, defaultMessage = 'Authentication failed') {
  const code = getAuthErrorCode(err)
  return (code && AUTH_ERROR_MESSAGES[code]) || defaultMessage
}

/**
 * Whether this error asks for a TOTP code (either a missing or a wrong one).
 *
 * @param {*} err An error thrown by the rokka client
 *
 * @returns {boolean}
 */
export function needsTotp(err) {
  const code = getAuthErrorCode(err)
  return code === MFA_REQUIRED || code === TOTP_INVALID
}

/**
 * Whether this error asks the user to set up TOTP first.
 *
 * @param {*} err An error thrown by the rokka client
 *
 * @returns {boolean}
 */
export function needsMfaEnrollment(err) {
  return getAuthErrorCode(err) === MFA_ENROLLMENT_REQUIRED
}

/**
 * The message of a non-authentication API error, which nests it in `body.error.message`.
 *
 * Falls back to the flat `body.message` and then to `err.message`, so it also
 * copes with an authentication failure or a network error being passed in.
 *
 * @param {*}      err            An error thrown by the rokka client
 * @param {string} defaultMessage
 *
 * @returns {string}
 */
export function getApiErrorMessage(err, defaultMessage = 'Unknown error') {
  const body = err && err.body
  if (body && typeof body === 'object') {
    if (body.error && typeof body.error === 'object' && body.error.message) {
      return body.error.message
    }
    if (typeof body.message === 'string') {
      return body.message
    }
  }
  return (err && err.message) || defaultMessage
}
