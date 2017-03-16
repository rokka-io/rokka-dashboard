import rokka from 'rokka'

let client = rokka()

export function authenticate (apiKey) {
  client = rokka({ apiKey, apiVersion: 1 })
}

export function resetClient () {
  client = rokka()
}

export default client
