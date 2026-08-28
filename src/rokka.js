import rokka from 'rokka'

let client = rokka()
const max_age = 3600 * 72
export const ROKKA_DASHBOARD_TOKEN = 'rokka-dashboard-token'
export const ROKKA_DASHBOARD_ORG = 'rokka-dashboard-org'
export const ROKKA_DASHBOARD_IPS = 'rokka-dashboard-ips'

export const apiTokenGetCallback = () => {
  return localStorage.getItem(ROKKA_DASHBOARD_TOKEN)
}

// Point the dashboard at another rokka API (a local docker one, for example).
// Undefined means the SDK default of https://api.rokka.io.
const apiHost = process.env.REACT_APP_ROKKA_API_HOST || undefined

export function authenticate(apiKey) {
  client = rokka({
    apiKey,
    apiHost,
    apiVersion: 1,
    apiTokenOptions: {
      //no_ip_protection: true, // not sure about this
      expires_in: max_age,
      renewable: true,
      ips: `request_ip,${localStorage.getItem(ROKKA_DASHBOARD_IPS) || ''}`,
    },
    apiTokenRefreshTime: max_age - 3600 * 24, // refresh it after a day
    apiTokenGetCallback: apiTokenGetCallback,
    apiTokenSetCallback: (token, payload) => {
      localStorage.setItem(ROKKA_DASHBOARD_TOKEN, token)
      if (payload && payload.ips) {
        // store the ips and remember the last 8 (max is 10 on the API side)
        localStorage.setItem(ROKKA_DASHBOARD_IPS, payload.ips.slice(0, 8).join(','))
      }
    },
  })
}

export function resetClient() {
  client = rokka({ apiHost })
}

/**
 * A throwaway client which authenticates with the raw `Api-Key` header only.
 *
 * The regular client has an `apiTokenGetCallback`, so every request first tries
 * to mint a JWT token. A key with `requires_mfa` can't do that before TOTP is
 * set up (`mfa_enrollment_required`), which is exactly the state in which we
 * need to reach the enrollment endpoints. Without the callback the key goes out
 * as `Api-Key` and those endpoints work.
 *
 * Don't use this for anything else, it doesn't store or refresh tokens.
 *
 * @param {string} apiKey
 *
 * @returns {object} a rokka client
 */
export function rawKeyClient(apiKey) {
  return rokka({ apiKey, apiHost, apiVersion: 1 })
}

const getClient = () => client
export default getClient

const cloudFrontDistributionReady = true // TODO: Check if it's ready after first login, to avoid broken images
export function getRenderUrl(organization, hash, format, stack, options) {
  const url = client.render.getUrl(organization, hash, format, stack, options)
  if (!cloudFrontDistributionReady) {
    return url.replace('.rokka.io/', '.render.rokka.io/render/') + '?_docache'
  }
  return url
}
