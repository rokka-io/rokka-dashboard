import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { authRequired } from '../utils/auth'
import BaseLayout from './layouts/BaseLayout'
import rokka from '../rokka'
import ApikeyRow, { parseAllowedIps } from './ApikeyRow'
import MfaSetup from './MfaSetup'
import { fromDatetimeLocal } from '../utils/string'
import { getApiErrorMessage } from '../utils/errors'

// same limit as the API, so a typo doesn't need a round trip to be caught
const MAX_ALLOWED_IPS = 10

const DEFAULT_CREATE_STATE = {
  showCreate: false,
  commentValue: '',
  requiresMfaValue: false,
  trustedValue: false,
  allowedIpsValue: '',
  expiresValue: '',
  createError: null,
}

const DEFAULT_STATE = {
  loading: true,
  currentKeyId: '',
  legacyKeyId: '',
  totpState: null,
  data: [],
  newApiKey: null,
  newApiKeyNeedsEnrollment: false,
  ...DEFAULT_CREATE_STATE,
}

class Apikeys extends PureComponent {
  constructor(props) {
    super(props)
    this.state = DEFAULT_STATE
  }

  componentDidMount() {
    this.getKeys()
  }

  getTable = (data) => {
    return (
      <table key={'table'}>
        <tbody>
          <tr className={'rka-h3 mb-md'}>
            <th>ID</th>
            <th>Comment</th>
            <th title="The key can only be exchanged for a token with a two-factor code">MFA</th>
            <th title="The key may manage this user's Api Keys even with a read-only role">
              Trusted
            </th>
            <th>Allowed IPs</th>
            <th>Expires</th>
            <th>Created</th>
            <th>Last Access (updated every 24h)</th>
            <th> </th>
          </tr>
          {data.map((key) => {
            return (
              <ApikeyRow
                apiKey={key}
                key={key.id}
                currentKeyId={this.state.currentKeyId}
                legacyKeyId={this.state.legacyKeyId}
                totpState={this.state.totpState}
                updateKeys={this.getKeys}
              />
            )
          })}
        </tbody>
      </table>
    )
  }

  getKeys = () => {
    rokka()
      .user.getCurrentApiKey()
      .then(({ body }) => {
        this.setState({ currentKeyId: body.id })
      })
      .catch(() => {
        console.log('Could not get current key id')
      })
    // the pre-2021 key has the user id as its id, and can't carry any of the flags
    rokka()
      .user.getId()
      .then((id) => {
        this.setState({ legacyKeyId: id })
      })
      .catch(() => {
        console.log('Could not get current user id')
      })
    rokka()
      .user.listApiKeys()
      .then(({ body }) => {
        this.setState({ loading: false, data: body })
      })
      .catch(() => {
        this.setState({ org: 'error' })
      })
  }

  onTotpState = (totpState) => {
    this.setState({ totpState })
  }

  /**
   * The options the user filled in, leaving out what they didn't touch. The API
   * rejects an explicit null on create, there's no restriction to clear yet.
   *
   * @returns {object}
   */
  buildCreateOptions = () => {
    const options = {}
    if (this.state.requiresMfaValue) {
      options.requires_mfa = true
    }
    if (this.state.trustedValue) {
      options.trusted = true
    }
    const ips = parseAllowedIps(this.state.allowedIpsValue)
    if (ips.length > 0) {
      options.allowed_ips = ips
    }
    const expires = fromDatetimeLocal(this.state.expiresValue)
    if (expires) {
      options.expires = expires
    }
    return options
  }

  showCreateNewKey = () => {
    if (!this.state.showCreate) {
      this.setState({ showCreate: true, createError: null })
      return
    }

    const options = this.buildCreateOptions()
    if (options.allowed_ips && options.allowed_ips.length > MAX_ALLOWED_IPS) {
      this.setState({ createError: `You can't have more than ${MAX_ALLOWED_IPS} allowed IPs.` })
      return
    }

    rokka()
      .user.addApiKey(this.state.commentValue, options)
      .then(({ body }) => {
        this.setState({
          ...DEFAULT_CREATE_STATE,
          newApiKey: body.api_key,
          // a key which requires MFA while TOTP isn't active can do nothing but
          // the enrollment until that's done
          newApiKeyNeedsEnrollment: !!body.requires_mfa && body.totp_state !== 'active',
        })

        this.getKeys()
      })
      .catch((err) => {
        this.setState({ createError: getApiErrorMessage(err, "Api Key creation didn't work") })
      })
  }

  renderCreateForm() {
    const ipCount = parseAllowedIps(this.state.allowedIpsValue).length

    return (
      <>
        <input
          type="text"
          placeholder={'Api Key Comment (optional)'}
          name="comment"
          value={this.state.commentValue}
          className="rka-input-txt mb-sm"
          onChange={(e) => this.setState({ commentValue: e.currentTarget.value })}
        />
        <div className={'mb-sm'}>
          <label>
            <input
              type="checkbox"
              className="rka-input-checkbox"
              checked={this.state.requiresMfaValue}
              onChange={(e) => this.setState({ requiresMfaValue: e.currentTarget.checked })}
            />{' '}
            Requires MFA — the key can only be exchanged for a token together with a two-factor code
          </label>
          {this.state.requiresMfaValue && this.state.totpState !== 'active' && (
            <div className={'txt-cranberry'}>
              You don't have an active two-factor setup yet. This key will only be usable to do that
              setup until you have one.
            </div>
          )}
        </div>
        <div className={'mb-sm'}>
          <label>
            <input
              type="checkbox"
              className="rka-input-checkbox"
              checked={this.state.trustedValue}
              onChange={(e) => this.setState({ trustedValue: e.currentTarget.checked })}
            />{' '}
            Trusted — the key may manage this user's Api Keys even with a read-only role. Never hand
            a trusted key to end users.
          </label>
        </div>
        <div className={'mb-sm'}>
          <label className="rka-label" htmlFor="new-allowed-ips">
            Allowed IPs ({ipCount}/{MAX_ALLOWED_IPS}, one per line, IPs or IPv4 CIDR ranges, empty
            for no restriction)
          </label>
          <textarea
            id="new-allowed-ips"
            className="rka-input-txt"
            rows={3}
            value={this.state.allowedIpsValue}
            onChange={(e) => this.setState({ allowedIpsValue: e.currentTarget.value })}
          />
        </div>
        <div className={'mb-sm'}>
          <label className="rka-label" htmlFor="new-expires">
            Expires (in your timezone, empty for never)
          </label>
          <input
            id="new-expires"
            type="datetime-local"
            className="rka-input-txt"
            value={this.state.expiresValue}
            onChange={(e) => this.setState({ expiresValue: e.currentTarget.value })}
          />
        </div>
        {this.state.createError && (
          <div className={'mb-sm txt-cranberry'}>{this.state.createError}</div>
        )}
      </>
    )
  }

  render() {
    return (
      <BaseLayout {...this.props}>
        <div key={'title2'} className="section rka-box no-min-height">
          <h2 className={'rka-h2 mb-md'}>Your User's Api Keys</h2>
          <div className={'mb-md'}>
            You can't see the actual Api Key here. They are not recoverable. You need to create a
            new one, if you need one.
          </div>
          <div>If the list is empty, you don't have enough rights to see it.</div>
        </div>
        <MfaSetup key={'mfa'} onTotpState={this.onTotpState} updateKeys={this.getKeys} />
        <div key={'table'} className="section rka-box no-min-height rka-table-apikeys">
          {this.getTable(this.state.data)}
        </div>
        {this.state.newApiKey && (
          <div className="section rka-box no-min-height">
            <div className={'mb-md'}>Your new Api Key is: </div>
            <div className={'mb-md'} style={{ whiteSpace: 'pre', fontFamily: 'monospace' }}>
              {this.state.newApiKey}
            </div>

            <div>Please keep it somewhere safe, you can't restore it.</div>
            {this.state.newApiKeyNeedsEnrollment && (
              <div className={'mt-md txt-cranberry'}>
                This key requires two-factor authentication, which isn't active yet. Until you have
                set it up, the key can only be used to do that setup.
              </div>
            )}
          </div>
        )}
        <div className="section rka-box no-min-height">
          {this.state.showCreate && this.renderCreateForm()}

          {this.state.showCreate && (
            <button
              className="rka-button rka-button-secondary mr-md"
              onClick={() => this.setState(DEFAULT_CREATE_STATE)}
            >
              Cancel
            </button>
          )}

          {this.state.data.length < 5 ? (
            <button className="rka-button rka-button-brand" onClick={() => this.showCreateNewKey()}>
              Create new Api Key
            </button>
          ) : (
            <div>
              You reached the maximum amount of Api Keys. If you want to create a new one, please
              delete some or create a new user with the same permissions.
            </div>
          )}
        </div>
      </BaseLayout>
    )
  }
}

Apikeys.propTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  auth: PropTypes.object,
}

export default authRequired(Apikeys)
