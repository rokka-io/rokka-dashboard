import rokka from 'rokka'

// mainly for local development against a local rokka-api
const apiHost = process.env.REACT_APP_API_HOST || undefined

let client = rokka({ apiHost })
const max_age = 3600 * 72
export const ROKKA_DASHBOARD_TOKEN = 'rokka-dashboard-token'
export const ROKKA_DASHBOARD_ORG = 'rokka-dashboard-org'
export const ROKKA_DASHBOARD_IPS = 'rokka-dashboard-ips'

export const apiTokenGetCallback = () => {
  return localStorage.getItem(ROKKA_DASHBOARD_TOKEN)
}

/**
 * A client that authenticates with the plain Api-Key header (no JWT token
 * callbacks). Needed for the MFA/TOTP enrollment from the login screen: an
 * api key with requires_mfa but no TOTP set up yet can't get a token, it's
 * only allowed to call the /user/mfa/totp endpoints directly.
 */
export function createApiKeyClient(apiKey) {
  return rokka({ apiKey, apiHost, apiVersion: 1 })
}

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
