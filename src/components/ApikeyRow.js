import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import rokka from '../rokka'
import { formatDate, fromDatetimeLocal, isExpired, toDatetimeLocal } from '../utils/string'
import { getApiErrorMessage } from '../utils/errors'

// same limit as the API, so a typo doesn't need a round trip to be caught
const MAX_ALLOWED_IPS = 10

/**
 * Split the textarea content into IPs. Commas and newlines both separate, so
 * pasting either shape of list works.
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

const formStateFrom = (apiKey) => ({
  requiresMfa: !!apiKey.requires_mfa,
  trusted: !!apiKey.trusted,
  allowedIps: (apiKey.allowed_ips || []).join('\n'),
  expires: toDatetimeLocal(apiKey.expires),
})

class ApikeyRow extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      delete: false,
      edit: false,
      saving: false,
      error: null,
      // set when the API refused the change as a self lockout, so we can offer
      // to repeat it with ?force=true
      forcePatch: null,
      form: formStateFrom(props.apiKey),
    }
  }

  showDelete = () => {
    this.setState({ delete: true })
  }

  reallyDelete = () => {
    rokka()
      .user.deleteApiKey(this.props.apiKey.id)
      .then(() => {
        this.props.updateKeys()
      })
      .catch((err) => {
        alert("Api Key deletion didn't work: " + getApiErrorMessage(err))
      })
  }

  startEdit = () => {
    this.setState({
      edit: true,
      error: null,
      forcePatch: null,
      form: formStateFrom(this.props.apiKey),
    })
  }

  cancelEdit = () => {
    this.setState({ edit: false, error: null, forcePatch: null })
  }

  updateForm = (partial) => {
    this.setState({ form: { ...this.state.form, ...partial } })
  }

  /**
   * Only the fields the user actually touched, so we never resend (and
   * re-trigger the lockout guard on) something that didn't change.
   *
   * @returns {?object} null when nothing changed
   */
  buildPatch = () => {
    const { apiKey } = this.props
    const { form } = this.state
    const current = formStateFrom(apiKey)
    const patch = {}

    if (form.requiresMfa !== current.requiresMfa) {
      patch.requires_mfa = form.requiresMfa
    }
    if (form.trusted !== current.trusted) {
      patch.trusted = form.trusted
    }
    if (form.allowedIps !== current.allowedIps) {
      const ips = parseAllowedIps(form.allowedIps)
      // null clears the whitelist, an empty array would do too
      patch.allowed_ips = ips.length > 0 ? ips : null
    }
    if (form.expires !== current.expires) {
      patch.expires = fromDatetimeLocal(form.expires)
    }

    return Object.keys(patch).length > 0 ? patch : null
  }

  save = (e) => {
    e.preventDefault()

    const patch = this.buildPatch()
    if (!patch) {
      this.setState({ edit: false, error: null })
      return
    }
    if (patch.allowed_ips && patch.allowed_ips.length > MAX_ALLOWED_IPS) {
      this.setState({ error: `You can't have more than ${MAX_ALLOWED_IPS} allowed IPs.` })
      return
    }

    this.patch(patch, false)
  }

  patch = (patch, force) => {
    this.setState({ saving: true, error: null, forcePatch: null })

    rokka()
      .user.patchApiKey(this.props.apiKey.id, patch, force ? { force: true } : {})
      .then(() => {
        this.setState({ saving: false, edit: false })
        this.props.updateKeys()
      })
      .catch((err) => {
        const message = getApiErrorMessage(err, "Api Key update didn't work")
        this.setState({
          saving: false,
          error: message,
          // all three lockout guards say so in their message
          forcePatch: err.statusCode === 400 && message.includes('force=true') ? patch : null,
        })
      })
  }

  renderFlag = (value) => (value ? <span title="yes">✓</span> : <span title="no">–</span>)

  renderEditForm() {
    const { form } = this.state
    const ipCount = parseAllowedIps(form.allowedIps).length

    return (
      <tr>
        <td colSpan={9}>
          <form onSubmit={this.save} className={'mb-md'}>
            <div className={'mb-sm'}>
              <label>
                <input
                  type="checkbox"
                  className="rka-input-checkbox"
                  checked={form.requiresMfa}
                  onChange={(e) => this.updateForm({ requiresMfa: e.currentTarget.checked })}
                />{' '}
                Requires MFA — the key can only be exchanged for a token together with a two-factor
                code
              </label>
              {form.requiresMfa && this.props.totpState !== 'active' && (
                <div className={'txt-cranberry'}>
                  You don't have an active two-factor setup yet. This key will only be usable to do
                  that setup until you have one.
                </div>
              )}
            </div>
            <div className={'mb-sm'}>
              <label>
                <input
                  type="checkbox"
                  className="rka-input-checkbox"
                  checked={form.trusted}
                  onChange={(e) => this.updateForm({ trusted: e.currentTarget.checked })}
                />{' '}
                Trusted — the key may manage this user's Api Keys even with a read-only role. Never
                hand a trusted key to end users.
              </label>
            </div>
            <div className={'mb-sm'}>
              <label className="rka-label" htmlFor={`allowed-ips-${this.props.apiKey.id}`}>
                Allowed IPs ({ipCount}/{MAX_ALLOWED_IPS}, one per line, IPs or IPv4 CIDR ranges,
                empty for no restriction)
              </label>
              <textarea
                id={`allowed-ips-${this.props.apiKey.id}`}
                className="rka-input-txt"
                rows={3}
                value={form.allowedIps}
                onChange={(e) => this.updateForm({ allowedIps: e.currentTarget.value })}
              />
            </div>
            <div className={'mb-sm'}>
              <label className="rka-label" htmlFor={`expires-${this.props.apiKey.id}`}>
                Expires (in your timezone, empty for never)
              </label>
              <input
                id={`expires-${this.props.apiKey.id}`}
                type="datetime-local"
                className="rka-input-txt"
                value={form.expires}
                onChange={(e) => this.updateForm({ expires: e.currentTarget.value })}
              />
              {form.expires && (
                <button
                  className="rka-button rka-button-secondary ml-sm"
                  type="button"
                  onClick={() => this.updateForm({ expires: '' })}
                >
                  Clear
                </button>
              )}
            </div>
            {this.state.error && <div className={'mb-sm txt-cranberry'}>{this.state.error}</div>}
            <button
              className="rka-button rka-button-brand mr-md"
              type="submit"
              disabled={this.state.saving}
            >
              Save
            </button>
            {this.state.forcePatch && (
              <button
                className="rka-button rka-button-brand mr-md"
                type="button"
                disabled={this.state.saving}
                onClick={() => this.patch(this.state.forcePatch, true)}
              >
                Do it anyway
              </button>
            )}
            <button
              className="rka-button rka-button-secondary"
              type="button"
              disabled={this.state.saving}
              onClick={this.cancelEdit}
            >
              Cancel
            </button>
          </form>
        </td>
      </tr>
    )
  }

  renderActions() {
    const { apiKey, currentKeyId, legacyKeyId } = this.props
    // The API rejects any of the flags on the pre-2021 key
    const isLegacy = apiKey.id === legacyKeyId

    if (this.state.delete) {
      return (
        <>
          <button className="rka-button rka-button-brand mr-md" onClick={this.reallyDelete}>
            Really Delete!
          </button>
          <button
            className="rka-button rka-button-secondary"
            onClick={() => this.setState({ delete: false })}
          >
            Cancel
          </button>
        </>
      )
    }

    return (
      <>
        {isLegacy ? (
          <div className={'mb-sm'}>Legacy Api Key, it can't carry any of these settings.</div>
        ) : (
          <button
            className="rka-button rka-button-secondary mr-md"
            onClick={this.state.edit ? this.cancelEdit : this.startEdit}
          >
            {this.state.edit ? 'Close' : 'Edit'}
          </button>
        )}
        {apiKey.id === currentKeyId ? (
          <div className={'mt-sm'}>
            Currently used Api Key, not deletable (use another Api Key to login, if you want to
            delete this one)
          </div>
        ) : (
          <button className="rka-button rka-button-brand" onClick={this.showDelete}>
            Delete Api Key
          </button>
        )}
      </>
    )
  }

  render() {
    const { apiKey } = this.props
    const expired = isExpired(apiKey.expires)
    const allowedIps = apiKey.allowed_ips || []

    return (
      <>
        <tr>
          <td className={'mb-md'} style={{ height: '4em' }}>
            {apiKey.id}
          </td>
          <td>{apiKey.comment}</td>
          <td className={'txt-c'}>{this.renderFlag(apiKey.requires_mfa)}</td>
          <td className={'txt-c'}>{this.renderFlag(apiKey.trusted)}</td>
          <td title={allowedIps.join(', ')}>
            {allowedIps.length === 0
              ? '–'
              : allowedIps.length > 2
                ? `${allowedIps.slice(0, 2).join(', ')} +${allowedIps.length - 2}`
                : allowedIps.join(', ')}
          </td>
          <td className={expired ? 'txt-cranberry' : undefined}>
            {apiKey.expires ? `${formatDate(apiKey.expires)}${expired ? ' (expired)' : ''}` : '–'}
          </td>
          <td>{formatDate(apiKey.created, 'Before December 2021')}</td>
          <td>{formatDate(apiKey.accessed, 'Before December 2021')}</td>
          <td>{this.renderActions()}</td>
        </tr>
        {this.state.edit && this.renderEditForm()}
      </>
    )
  }
}

ApikeyRow.propTypes = {
  apiKey: PropTypes.object.isRequired,
  currentKeyId: PropTypes.string.isRequired,
  /** The user id, which is also the id of the pre-2021 key. That one can't carry any flags. */
  legacyKeyId: PropTypes.string,
  /** 'none' | 'pending' | 'active' | null, to warn when requiring MFA without a setup */
  totpState: PropTypes.string,
  updateKeys: PropTypes.func.isRequired,
}

export default ApikeyRow
