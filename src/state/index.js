import rokka, { authenticate, resetClient } from '../rokka'
import { get as getCookie, set as setCookie, del as delCookie } from '../utils/cookie'

const SESSION_COOKIE_KEY = 'rka_session'

const session = getCookie(SESSION_COOKIE_KEY)

if (session && session.auth) {
  const { auth } = session
  login(auth.organization, auth.apiKey)
}

const defaultState = {
  showSidebar: false,
  auth: null,
  images: [],
  stacks: {},
  operations: {},
  alert: null
}

let internalState = defaultState

let listener = null

/**
 * Update state and notify listener.
 *
 * @param {*} partialState
 */
function updateState (partialState) {
  internalState = Object.assign({}, internalState, partialState)
  if (!listener && process.env.NODE_ENV !== 'production') {
    console.warn('No listener added to state updates.')
    return
  }
  listener(internalState)
}

/**
 * Show or hide sidebar.
 */
export function toggleSidebar () {
  updateState({ showSidebar: !internalState.showSidebar })
}

/**
 * Update Images state
 */
export function updateUploadedImages (images) {
  updateState({ images: images })
}

export function clearImages () {
  updateState({ images: [] })
}

/**
 * Login sets the API key to the rokka API client.
 *
 * @param {string}   organization
 * @param {string}   apiKey
 * @param {Function} successCb    Success callback
 *
 * @returns {Promise}
 */
export function login (organization, apiKey, successCb) {
  authenticate(apiKey)

  return rokka.organizations.get(organization)
    .then(() => {
      // remove alert in case there was auth failed before.
      removeAlert()

      const done = () => {
        updateState({ auth: { organization, apiKey } })
        setCookie(SESSION_COOKIE_KEY, { auth: { organization, apiKey } })
        listOperations()
      }

      if (!successCb) {
        return done()
      }

      successCb(done)
    })
    .catch((err) => {
      console.error(err)

      setCookie(SESSION_COOKIE_KEY, {}) // clear session on error

      if (err.statusCode === 403 || err.statusCode === 404) {
        updateState({ auth: null })
        setAlert('error', 'Authentication failed')

        return
      }
      setAlert('error', 'Error getting organizations', 10000)
    })
}

/**
 * Logout clears the store and removes the API key from rokka API client.
 * Additionally it also removes the cookie.
 */
export function logout () {
  resetClient()
  delCookie(SESSION_COOKIE_KEY)
  updateState(defaultState)
}

/**
 * List stacks of an organization and populate the global state with the result.
 *
 * @param {number} limit
 *
 * @returns {Promise}
 */
export function listStacks (limit = 999) {
  const { currentOffset = 0, items = {} } = internalState.stacks

  return rokka.stacks.list(internalState.auth.organization, limit, currentOffset)
    .then(({ body }) => {
      updateState({
        stacks: {
          currentOffset: currentOffset + limit,
          total: body.total,
          items: [...items, ...body.items]
        }
      })
    })
    .catch((err) => {
      console.error(err)
      if (err.statusCode === 403) {
        updateState({ auth: null })
        setAlert('error', 'Authentication failed')
        return
      }
      setAlert('error', 'Error when fetching stacks', 10000)
    })
}

/**
 * Resets the internal state with stacks and fetches them again.
 *
 * TODO: Slightly ugly that we have to manually override the internalState.stacks.
 *
 * @returns {Promise}
 */
export function refreshStacks () {
  internalState.stacks = {}
  return listStacks()
}

/**
 * List operations and populate the global state with the result.
 */
export function listOperations () {
  rokka.operations.list()
    .then(({ body }) => {
      updateState({
        operations: body
      })
    })
    .catch((err) => {
      console.error(err)
      if (err.statusCode === 403) {
        updateState({ auth: null })
        setAlert('error', 'Authentication failed')
        return
      }
      setAlert('error', 'Error when fetching operations', 10000)
    })
}

/**
 * Create a new stack
 *
 * @param {string} name
 * @param {Array}  operations
 *
 * @return {Promise}
 */
export function createStack (name, operations) {
  return rokka.stacks.create(internalState.auth.organization, name, operations)
}

/**
 * Delete a stack
 *
 * @param {string} name
 *
 * @return {Promise}
 */
export function deleteStack (name) {
  return rokka.stacks.delete(internalState.auth.organization, name)
    .then(() => {
      refreshStacks()
    })
}

/**
 * Set global alert
 *
 * @param {string} type           error|pending|success
 * @param {string} message
 * @param {number} [timeout=null] Timeout in ms
 */
export function setAlert (type, message, timeout = null) {
  updateState({
    alert: {
      type,
      message
    }
  })

  if (timeout) {
    setTimeout(() => {
      removeAlert()
    }, timeout)
  }
}

/**
 * Remove global alert
 */
export function removeAlert () {
  updateState({ alert: null })
}

/**
 * Subscribe to state updates
 *
 * @param {function} cb Listener
 *
 * @returns {function} Unsubscribe function
 */
export function subscribe (cb) {
  listener = cb
  return () => {
    listener = null
  }
}

// export state as readonly
const state = Object.assign({}, internalState)
export default state
