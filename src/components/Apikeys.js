import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { authRequired } from '../utils/auth'
import BaseLayout from './layouts/BaseLayout'
import rokka from '../rokka'
import ApikeyRow from './ApikeyRow'
import Modal from './Modal'
import MfaEnrollment from './MfaEnrollment'
import { classifyMfaError, TOTP_RATE_LIMITED } from '../utils/mfaErrors'

const DEFAULT_STATE = {
  loading: true,
  currentKeyId: '',
  data: [],
  showCreate: false,
  commentValue: '',
  requiresMfaValue: false,
  newApiKey: null,
  mfa: null, // {state, confirmed}
  showMfaSetup: false,
  showMfaDisable: false,
  disableCode: '',
  disableMessage: null,
}

class Apikeys extends PureComponent {
  constructor(props) {
    super(props)
    this.state = DEFAULT_STATE
  }

  componentDidMount() {
    this.getKeys()
    this.getMfaStatus()
  }

  getMfaStatus = () => {
    rokka()
      .user.getMfaTotp()
      .then(({ body }) => {
        this.setState({ mfa: body })
      })
      .catch(() => {
        this.setState({ mfa: { state: 'unavailable' } })
      })
  }

  getTable = (data) => {
    return (
      <table key={'table'}>
        <tbody>
          <tr className={'rka-h3 mb-md'}>
            <th>ID</th>
            <th>Comment</th>
            <th>Created</th>
            <th>Last Access (updated every 24h)</th>
            <th>MFA</th>
            <th> </th>
          </tr>
          {data.map((key) => {
            return (
              <ApikeyRow
                apiKey={key}
                key={key.id}
                currentKeyId={this.state.currentKeyId}
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
      .catch((err) => {
        console.log('Could not get current key id')
      })
    rokka()
      .user.listApiKeys()
      .then(({ body }) => {
        this.setState({ loading: false, data: body })
      })
      .catch((err) => {
        this.setState({ org: 'error' })
      })
  }

  showCreateNewKey = () => {
    if (this.state.showCreate) {
      rokka()
        .user.addApiKey(this.state.commentValue, { requires_mfa: this.state.requiresMfaValue })
        .then(({ body }) => {
          this.setState({
            showCreate: false,
            commentValue: '',
            requiresMfaValue: false,
            newApiKey: body.api_key,
          })

          this.getKeys()
        })
        .catch((err) => {
          this.setState({ showCreate: false, commentValue: '', requiresMfaValue: false })
          alert("Api Key creation didn't work:" + this.errorMessage(err))
        })
    } else {
      this.setState({ showCreate: true })
    }
  }

  errorMessage = (err) => {
    const error = err && err.body && err.body.error
    return typeof error === 'string' ? error : (error && error.message) || 'unknown error'
  }

  onDisableMfa = (e) => {
    e.preventDefault()
    const code = this.state.disableCode.trim()
    if (!code) {
      return
    }
    rokka()
      .user.disableMfaTotp(code)
      .then(() => {
        // disabling also unflags all keys, so refresh both
        this.setState({ showMfaDisable: false, disableCode: '', disableMessage: null })
        this.getMfaStatus()
        this.getKeys()
      })
      .catch((err) => {
        const kind = classifyMfaError(err)
        this.setState({
          disableCode: '',
          disableMessage:
            kind === TOTP_RATE_LIMITED
              ? 'Too many attempts. Please wait a moment and try again.'
              : 'Wrong code. Please try again.',
        })
      })
  }

  renderMfaSection = () => {
    const mfa = this.state.mfa
    if (!mfa) {
      return null
    }
    const state = mfa.state
    return (
      <div key={'mfa'} className="section rka-box no-min-height">
        <h2 className={'rka-h2 mb-md'}>Two-factor authentication (MFA)</h2>
        {state === 'unavailable' && <div>MFA status is currently unavailable.</div>}
        {state === 'active' && (
          <>
            <div className={'mb-md'}>
              <span className="rka-mfa-status rka-mfa-status-active">active</span> TOTP is set up
              for your user. Api Keys that require MFA can be exchanged for a token with a code.
            </div>
            <button
              className="rka-button rka-button-secondary"
              onClick={() => this.setState({ showMfaDisable: true, disableMessage: null })}
            >
              Disable MFA
            </button>
          </>
        )}
        {(state === 'none' || state === 'pending') && (
          <>
            <div className={'mb-md'}>
              <span className={'rka-mfa-status rka-mfa-status-' + state}>{state}</span>{' '}
              {state === 'pending'
                ? 'You started setting up TOTP but did not confirm it yet.'
                : 'You have not set up TOTP yet. Set it up to protect Api Keys with a second factor.'}
            </div>
            <button
              className="rka-button rka-button-brand"
              onClick={() => this.setState({ showMfaSetup: true })}
            >
              {state === 'pending' ? 'Finish MFA setup' : 'Set up MFA'}
            </button>
          </>
        )}
        {this.state.showMfaSetup && (
          <Modal onClose={() => this.setState({ showMfaSetup: false })}>
            <MfaEnrollment
              client={rokka()}
              onEnrolled={() => {
                this.setState({ showMfaSetup: false })
                this.getMfaStatus()
                this.getKeys()
              }}
              onCancel={() => this.setState({ showMfaSetup: false })}
            />
          </Modal>
        )}
        {this.state.showMfaDisable && (
          <Modal onClose={() => this.setState({ showMfaDisable: false, disableCode: '' })}>
            <form onSubmit={this.onDisableMfa}>
              <h3 className="rka-h3">Disable two-factor authentication</h3>
              <p>Enter a current code to confirm. This also removes MFA from all your Api Keys.</p>
              <div className="rka-form-group">
                <label className="rka-label" htmlFor="mfa-disable-code">
                  Verification code
                </label>
                <input
                  className="rka-input-txt"
                  type="text"
                  id="mfa-disable-code"
                  name="disableCode"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  autoFocus
                  value={this.state.disableCode}
                  onChange={(e) => this.setState({ disableCode: e.currentTarget.value.trim() })}
                />
              </div>
              {this.state.disableMessage && (
                <p className="rka-mfa-error">{this.state.disableMessage}</p>
              )}
              <button className="rka-button rka-button-brand" type="submit">
                Disable MFA
              </button>
            </form>
          </Modal>
        )}
      </div>
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
        {this.renderMfaSection()}
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
          </div>
        )}
        <div className="section rka-box no-min-height">
          {this.state.showCreate && (
            <input
              type="text"
              placeholder={'Api Key Comment (optional)'}
              name="comment"
              value={this.state.commentValue}
              className="rka-input-txt mb-sm"
              onChange={(e) => this.setState({ commentValue: e.currentTarget.value })}
            />
          )}

          {this.state.showCreate && (
            <div className="mb-sm">
              <label>
                <input
                  type="checkbox"
                  checked={this.state.requiresMfaValue}
                  onChange={(e) => this.setState({ requiresMfaValue: e.currentTarget.checked })}
                />{' '}
                Require MFA for this key
              </label>
              {this.state.requiresMfaValue &&
                this.state.mfa &&
                this.state.mfa.state !== 'active' && (
                  <div className="rka-mfa-error">
                    You have not set up TOTP yet — this key will only be usable to set up TOTP until
                    you complete enrollment.
                  </div>
                )}
            </div>
          )}

          {this.state.showCreate && (
            <button
              className="rka-button rka-button-secondary mr-md"
              onClick={() =>
                this.setState({ showCreate: false, commentValue: '', requiresMfaValue: false })
              }
            >
              Cancel
            </button>
          )}

          {this.state.data.length < 5 ? (
            <button
              className="rka-button rka-button-brand"
              onClick={(e) => this.showCreateNewKey(e)}
            >
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

export { Apikeys }
export default authRequired(Apikeys)
