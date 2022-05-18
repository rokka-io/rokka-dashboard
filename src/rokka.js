import rokka from 'rokka'

let client = rokka()
const max_age = 3600 * 72
export const ROKKA_DASHBOARD_TOKEN = 'rokka-dashboard-token'
export const ROKKA_DASHBOARD_ORG = 'rokka-dashboard-org'

export function authenticate(apiKey) {
  client = rokka({
    apiKey,
    apiVersion: 1,
    apiTokenOptions: {
      //no_ip_protection: true, // not sure about this
      expires_in: max_age,
      renewable: true
    },
    apiTokenRefreshTime: max_age - 3600 * 24, // refresh it after a day
    apiTokenGetCallback: () => {
      return localStorage.getItem(ROKKA_DASHBOARD_TOKEN)
    },
    apiTokenSetCallback: token => {
      localStorage.setItem(ROKKA_DASHBOARD_TOKEN, token)
    }
  })
}

export function resetClient() {
  client = rokka()
}

export default () => client
