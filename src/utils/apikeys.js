/** Same limit as the API, so a typo doesn't need a round trip to be caught */
export const MAX_ALLOWED_IPS = 10

/**
 * Split the content of an "Allowed IPs" field into single entries.
 *
 * Commas and newlines both separate, so pasting either shape of list works.
 *
 * @param {string} value
 *
 * @returns {string[]}
 */
export function parseAllowedIps(value) {
  return value
    .split(/[\n,]/)
    .map((ip) => ip.trim())
    .filter((ip) => ip.length > 0)
}
