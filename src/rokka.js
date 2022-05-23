import rokka from 'rokka'

let client = rokka()
const max_age = 3600 * 72
export const ROKKA_DASHBOARD_TOKEN = 'rokka-dashboard-token'
export const ROKKA_DASHBOARD_ORG = 'rokka-dashboard-org'
export const ROKKA_DASHBOARD_IPS = 'rokka-token-ips'

export const apiTokenGetCallback = () => {
  return localStorage.getItem(ROKKA_DASHBOARD_TOKEN)
}

export function authenticate(apiKey) {
  client = rokka({
    apiKey,
    apiVersion: 1,
    apiTokenOptions: {
      //no_ip_protection: true, // not sure about this
      expires_in: max_age,
      renewable: true,
      ips: `request_ip,${localStorage.getItem(ROKKA_DASHBOARD_IPS) || ''}`
    },
    apiTokenRefreshTime: max_age - 3600 * 24, // refresh it after a day
    apiTokenGetCallback: apiTokenGetCallback,
    apiTokenSetCallback: (token, payload) => {
      localStorage.setItem(ROKKA_DASHBOARD_TOKEN, token)
      if (payload && payload.ips) {
        // store the ips and remember the last 8 (max is 10 on the API side)
        localStorage.setItem(ROKKA_DASHBOARD_IPS, payload.ips.slice(0, 8).join(','))
      }
    }
  })
}

export function resetClient() {
  client = rokka()
}

export default () => client
