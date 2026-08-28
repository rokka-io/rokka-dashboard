import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { authRequired } from '../utils/auth'
import BaseLayout from './layouts/BaseLayout'
import rokka from '../rokka'
import ApikeyRow from './ApikeyRow'
import ApikeyOptionsFields from './ApikeyOptionsFields'
import MfaSetup from './MfaSetup'
import { fromDatetimeLocal } from '../utils/string'
import { MAX_ALLOWED_IPS, parseAllowedIps } from '../utils/apikeys'
import { getApiErrorMessage } from '../utils/errors'

const DEFAULT_CREATE_STATE = {
  showCreate: false,
  commentValue: '',
  options: {
    requiresMfa: false,
    trusted: false,
    allowedIps: '',
    expires: '',
  },
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
    if (this.state.options.requiresMfa) {
      options.requires_mfa = true
    }
    if (this.state.options.trusted) {
      options.trusted = true
    }
    const ips = parseAllowedIps(this.state.options.allowedIps)
    if (ips.length > 0) {
      options.allowed_ips = ips
    }
    const expires = fromDatetimeLocal(this.state.options.expires)
    if (expires) {
      options.expires = expires
    }
    return options
  }

  updateOptions = (partial) => {
    this.setState({ options: { ...this.state.options, ...partial } })
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
    return (
      <>
        <div className="rka-form-group">
          <label className="rka-label" htmlFor="new-comment">
            Comment
          </label>
          <div className="rka-input-help">
            Optional, only to recognise the key again in this list later on.
          </div>
          <input
            id="new-comment"
            type="text"
            placeholder={'Used in production'}
            name="comment"
            value={this.state.commentValue}
            className="rka-input-txt"
            onChange={(e) => this.setState({ commentValue: e.currentTarget.value })}
          />
        </div>
        <ApikeyOptionsFields
          idPrefix="new-key"
          values={this.state.options}
          onChange={this.updateOptions}
          mfaNote={
            this.state.options.requiresMfa && this.state.totpState !== 'active' ? (
              <div className={'rka-input-help txt-cranberry'}>
                You don't have an active two-factor setup yet. This key will only be usable to do
                that setup until you have one.
              </div>
            ) : null
          }
        />
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
