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
  stackClone: {},
  auth: null,
  uploadedImages: [],
  deletedImages: [],
  stacks: {},
  operations: {},
  stackOptions: null,
  alert: null
}

let internalState = defaultState

let listener = null

/**
 * Update state and notify listener.
 *
 * @param {*} partialState
 */
function updateState(partialState) {
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
export function toggleSidebar() {
  updateState({ showSidebar: !internalState.showSidebar })
}

/**
 * Delete an image.
 *
 * @param {string} hash
 *
 * @return {Promise}
 */
export function deleteImage(hash) {
  return rokka()
    .sourceimages.delete(internalState.auth.organization, hash)
    .then(() => {
      updateState({
        deletedImages: [...internalState.deletedImages, hash]
      })
      clearUploadedImages()
    })
}

export function clearDeletedImages() {
  updateState({ deletedImages: [] })
}

export function updateUploadedImages(uploadedImages) {
  updateState({ uploadedImages })
  // In case user reuploads a just deleted image.
  clearDeletedImages()
}

export function clearUploadedImages() {
  updateState({ uploadedImages: [] })
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
export function login(organization, apiKey, successCb) {
  authenticate(apiKey)

  return rokka()
    .organizations.get(organization)
    .then(() => {
      // remove alert in case there was auth failed before.
      removeAlert()

      const done = () => {
        updateState({ auth: { organization, apiKey } })
        setCookie(
          SESSION_COOKIE_KEY,
          { auth: { organization, apiKey } },
          { maxAge: 3600 * 18, secure: window.location.protocol === 'https:' }
        )
        listOperations()
        getDefaultStackOptions()
      }

      if (!successCb) {
        return done()
      }

      successCb(done)
    })
    .catch(err => {
      console.error(err)

      setCookie(SESSION_COOKIE_KEY, {}) // clear session on error

      if (err.statusCode === 403 || err.statusCode === 404) {
        updateState({ auth: null })
        setAlert('error', 'Authentication failed')
      } else if (err.statusCode === 400) {
        updateState({ auth: null })
        setAlert('error', 'Organization name is not valid')
      } else if (err.statusCode === 429) {
        updateState({ auth: null })
        setAlert('error', 'Too many requests')
      }
      setAlert('error', 'Error getting organizations', 10000)
      throw err
    })
}

/**
 * Logout clears the store and removes the API key from rokka API client.
 * Additionally it also removes the cookie.
 */
export function logout() {
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
export function listStacks() {
  const { items = [], filter = '' } = internalState.stacks

  return rokka()
    .stacks.list(internalState.auth.organization)
    .then(({ body }) => {
      sortAlphabetically(body.items)
      const newItems = [...items, ...body.items]
      updateState({
        stacks: {
          items: newItems,
          filter,
          filteredItems: newItems.filter(item => filterItem(item, filter))
        }
      })
    })
    .catch(err => {
      console.error(err)
      if (err.statusCode === 403) {
        updateState({ auth: null })
        setAlert('error', 'Authentication failed')
        return
      }
      setAlert('error', 'Error when fetching stacks', 10000)
    })
}

function filterItem(item, filter) {
  return item.name.indexOf(filter) > -1
}

export function filterStacks(filter) {
  const items = internalState.stacks.items.filter(item => filterItem(item, filter))
  updateState({
    stacks: { ...internalState.stacks, filter, filteredItems: items }
  })
}

/**
 * Resets the internal state with stacks and fetches them again.
 *
 * TODO: Slightly ugly that we have to manually override the internalState.stacks.
 *
 * @returns {Promise}
 */
export function refreshStacks() {
  internalState.stacks = { ...internalState.stacks, items: [], total: 0, currentOffset: 0 }
  return listStacks()
}

/**
 * Sorts Alphabetically
 *
 * @param {array} items
 *
 * @returns {array}
 */
function sortAlphabetically(items) {
  return items.sort((a, b) => {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  })
}

/**
 * List operations and populate the global state with the result.
 */
export function listOperations() {
  rokka()
    .operations.list()
    .then(({ body }) => {
      updateState({
        operations: body
      })
    })
    .catch(err => {
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
 * Fetch default stack options and populate the global state with the result.
 */
export function getDefaultStackOptions() {
  rokka()
    .stackoptions.get()
    .then(({ body }) => {
      updateState({
        stackOptions: body
      })
    })
    .catch(err => {
      console.error(err)
      setAlert('error', 'Error fetching default stack options', 10000)
    })
}

/**
 * Create a new stack
 *
 * @param {string}      name
 * @param {Array}       operations
 * @param {Object|null} options
 *
 * @return {Promise}
 */
export function createStack(name, operations, options) {
  return rokka().stacks.create(internalState.auth.organization, name, operations, options)
}

/**
 * Delete a stack
 *
 * @param {string} name
 *
 * @return {Promise}
 */
export function deleteStack(name) {
  return rokka()
    .stacks.delete(internalState.auth.organization, name)
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
export function setAlert(type, message, timeout = null) {
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
export function removeAlert() {
  updateState({ alert: null })
}

/**
 * Subscribe to state updates
 *
 * @param {function} cb Listener
 *
 * @returns {function} Unsubscribe function
 */
export function subscribe(cb) {
  listener = cb
  return () => {
    listener = null
  }
}

/**
 * Clone stack
 *
 * @param {string} name
 * @param {object} operations
 * @param {object} options
 */
export function cloneStack(name, operations, options) {
  updateState({
    stackClone: {
      name: name,
      operations: operations,
      options: options
    }
  })
}

/**
 * Reset stack clone state
 *
 */
export function resetStackClone() {
  updateState({
    stackClone: {}
  })
}

// export state as readonly
const state = Object.assign({}, internalState)
export default state
