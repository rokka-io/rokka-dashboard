import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { authRequired } from '../utils/auth'
import BaseLayout from './layouts/BaseLayout'
import rokka from '../rokka'
import MembershipRow from './MembershipRow'
import ApikeyOptionsFields from './ApikeyOptionsFields'
import { setAlert } from '../state'
import { fromDatetimeLocal } from '../utils/string'
import { MAX_ALLOWED_IPS, parseAllowedIps } from '../utils/apikeys'
import { getApiErrorMessage } from '../utils/errors'

/**
 * The roles which make a user read-only, i.e. unable to manage its own Api
 * Keys, users and memberships — unless one of its keys is `trusted`.
 */
const READ_ONLY_ROLES = ['read', 'upload', 'sourceimages:read']

const DEFAULT_CREATE_STATE = {
  showCreate: false,
  commentValue: '',
  userIdValue: '',
  rolesValue: [],
  keyCommentValue: '',
  keyOptions: {
    requiresMfa: false,
    trusted: false,
    allowedIps: '',
    expires: '',
  },
}

const DEFAULT_STATE = {
  loading: true,
  currentUserId: '',
  data: [],
  newApiKey: null,
  newUserId: null,
  newApiKeyTrusted: false,
  ...DEFAULT_CREATE_STATE,
}

class Memberships extends PureComponent {
  constructor(props) {
    super(props)
    this.state = DEFAULT_STATE
  }

  componentDidMount() {
    this.getMemberships()
  }

  updateState = (state) => {
    this.setState(state)
  }
  getTable = (data) => {
    return (
      <table key={'table'}>
        <tbody>
          <tr className={'rka-h3 mb-md'}>
            <th>User ID</th>
            <th>E-Mail</th>
            <th>Roles</th>
            <th>Comment</th>
            <th>Created</th>
            <th>Last Access (updated every 24h)</th>
            <th> </th>
          </tr>
          {data.map((key) => {
            return (
              <MembershipRow
                updateState={this.updateState}
                organization={this.props.auth.organization}
                membership={key}
                key={key.user_id}
                updateKeys={this.getMemberships}
                currentUserId={this.state.currentUserId}
              />
            )
          })}
        </tbody>
      </table>
    )
  }

  getMemberships = () => {
    rokka()
      .user.getId()
      .then((id) => {
        this.setState({ currentUserId: id })
      })
      .catch((err) => {
        console.log('Could not get current user id', err)
      })
    rokka()
      .memberships.list(this.props.auth.organization)
      .then(({ body }) => {
        this.setState({ loading: false, data: body.items })
      })
      .catch((err) => {
        this.setState({ org: 'error' })
      })
  }

  /**
   * The `api_key` options for a new user, or undefined when the user didn't
   * fill in anything. The API rejects anything but an object (or nothing).
   *
   * @returns {?object}
   */
  buildApiKeyOptions = () => {
    const options = {}
    if (this.state.keyCommentValue) {
      options.comment = this.state.keyCommentValue
    }
    if (this.state.keyOptions.trusted) {
      options.trusted = true
    }
    if (this.state.keyOptions.requiresMfa) {
      options.requires_mfa = true
    }
    const ips = parseAllowedIps(this.state.keyOptions.allowedIps)
    if (ips.length > 0) {
      options.allowed_ips = ips
    }
    const expires = fromDatetimeLocal(this.state.keyOptions.expires)
    if (expires) {
      options.expires = expires
    }
    return Object.keys(options).length > 0 ? options : undefined
  }

  updateKeyOptions = (partial) => {
    this.setState({ keyOptions: { ...this.state.keyOptions, ...partial } })
  }

  /**
   * The new user could never reach the MFA enrollment endpoints with a
   * read-only role and an untrusted key, so the API refuses that combination.
   *
   * @returns {boolean}
   */
  needsTrustedForMfa = () =>
    this.state.keyOptions.requiresMfa &&
    !this.state.keyOptions.trusted &&
    this.state.rolesValue.some((role) => READ_ONLY_ROLES.includes(role))

  showCreateNewKey = () => {
    if (this.state.showCreate) {
      const apiKeyOptions = this.buildApiKeyOptions()
      if (!this.state.userIdValue) {
        if (this.needsTrustedForMfa()) {
          setAlert(
            'error',
            'For a read-only membership, the initial Api Key has to be trusted when it requires MFA. Otherwise the new user could never set up two-factor authentication.',
            10000,
          )
          return
        }
        if (apiKeyOptions && (apiKeyOptions.allowed_ips || []).length > MAX_ALLOWED_IPS) {
          setAlert('error', `You can't have more than ${MAX_ALLOWED_IPS} allowed IPs.`, 5000)
          return
        }
      }

      if (this.state.userIdValue) {
        rokka()
          .memberships.create(
            this.props.auth.organization,
            this.state.userIdValue,
            this.state.rolesValue,
            this.state.commentValue,
          )
          .then(({ body }) => {
            this.setState({
              ...DEFAULT_CREATE_STATE,
              newApiKey: body.api_key,
              newUserId: body.user_id,
              newApiKeyTrusted: false,
            })

            this.getMemberships()
          })
          .catch((err) => {
            this.setState({ showCreate: false })
            setAlert('error', "Membership creation didn't work: " + getApiErrorMessage(err), 5000)
          })
      } else {
        rokka()
          .memberships.createWithNewUser(
            this.props.auth.organization,
            this.state.rolesValue,
            this.state.commentValue,
            apiKeyOptions,
          )
          .then(({ body }) => {
            this.setState({
              ...DEFAULT_CREATE_STATE,
              newApiKey: body.api_key,
              newUserId: body.user_id,
              newApiKeyTrusted: !!(apiKeyOptions && apiKeyOptions.trusted),
            })

            this.getMemberships()
          })
          .catch((err) => {
            this.setState({ showCreate: false })
            setAlert('error', "Membership creation didn't work: " + getApiErrorMessage(err), 5000)
          })
      }
    } else {
      this.setState({ showCreate: true })
    }
  }

  renderInitialApiKeyForm() {
    return (
      <>
        <h2 className={'rka-h3 mt-md'}>Initial Api Key (optional)</h2>
        <div className={'rka-input-help'}>
          These apply to the Api Key the new user gets. Leave them alone for a plain key.
        </div>
        <div className="rka-form-group">
          <label className="rka-label" htmlFor="membership-key-comment">
            Api Key comment
          </label>
          <div className="rka-input-help">
            Optional, only to recognise the key again in a list later on.
          </div>
          <input
            id="membership-key-comment"
            type="text"
            placeholder={'Initial key'}
            name="keycomment"
            value={this.state.keyCommentValue}
            className="rka-input-txt"
            onChange={(e) => this.setState({ keyCommentValue: e.currentTarget.value })}
          />
        </div>
        <ApikeyOptionsFields
          idPrefix="membership-key"
          values={this.state.keyOptions}
          onChange={this.updateKeyOptions}
          mfaNote={
            this.needsTrustedForMfa() ? (
              <div className={'rka-input-help txt-cranberry'}>
                With a read-only role ({READ_ONLY_ROLES.join(', ')}) the key also has to be trusted,
                otherwise the new user could never reach the two-factor setup and the key would be
                unusable.
              </div>
            ) : null
          }
        />
      </>
    )
  }

  render() {
    return (
      <BaseLayout {...this.props}>
        <div key={'title2'} className="section rka-box no-min-height">
          <h2 className={'rka-h2 mb-md'}>The memberships of your organization</h2>
          <div className={'mb-md'}>
            If the list is empty, you don't have enough rights to see it.
          </div>
        </div>
        <div key={'table'} className="section rka-box no-min-height rka-table-apikeys">
          {this.getTable(this.state.data)}
        </div>
        {this.state.newApiKey && (
          <div className="section rka-box no-min-height">
            <div className={'mb-md'}>The new Api Key for user {this.state.newUserId} is:</div>
            <div className={'mb-md'} style={{ whiteSpace: 'pre', fontFamily: 'monospace' }}>
              {this.state.newApiKey}
            </div>

            <div>Please keep it somewhere safe, you can't restore it.</div>
            {this.state.newApiKeyTrusted && (
              <div className={'mt-md'}>
                This key is <strong>trusted</strong>: it may manage that user's Api Keys even with a
                read-only role. Never hand it to end users, use it to mint the key you publish.
              </div>
            )}
          </div>
        )}
        <div className="section rka-box no-min-height">
          {this.state.showCreate && (
            <>
              <h2 className={'rka-h3'}>Roles:</h2>
              {Object.values(rokka().memberships.ROLES)
                .sort((a, b) => a.localeCompare(b))
                .map((role) => {
                  return (
                    <div key={role}>
                      <input
                        type="checkbox"
                        name={role}
                        checked={this.state.rolesValue.includes(role)}
                        className="rka-input-checkbox mb-sm"
                        onChange={(e) => {
                          const checked = e.currentTarget.checked
                          let roles = this.state.rolesValue
                          if (checked) {
                            // add it if not there already
                            if (!roles.includes(role)) {
                              roles.push(role)
                            }
                          } else {
                            // remove it if unchecked in in roles
                            if (roles.includes(role)) {
                              roles = roles.filter((r) => r !== role)
                            }
                          }
                          this.setState({ rolesValue: [...roles] })
                        }}
                      />
                      {role}
                    </div>
                  )
                })}
              <div>
                <input
                  key={'userid'}
                  type="text"
                  placeholder={'User-ID to add (leave empty to create a new user)'}
                  name="userid"
                  value={this.state.userIdValue}
                  className="rka-input-txt mb-sm"
                  onChange={(e) => this.setState({ userIdValue: e.currentTarget.value })}
                />
              </div>
              <div>
                <input
                  key={'comment'}
                  type="text"
                  placeholder={'Membership Comment (optional)'}
                  name="comment"
                  value={this.state.commentValue}
                  className="rka-input-txt mb-sm"
                  onChange={(e) => this.setState({ commentValue: e.currentTarget.value })}
                />
              </div>
              {!this.state.userIdValue && this.renderInitialApiKeyForm()}
            </>
          )}

          {this.state.showCreate && (
            <button
              className="rka-button rka-button-secondary mr-md"
              onClick={() => this.setState(DEFAULT_CREATE_STATE)}
            >
              Cancel
            </button>
          )}

          <button
            className="rka-button rka-button-brand"
            disabled={
              this.state.showCreate &&
              (this.state.rolesValue.length === 0 ||
                (!this.state.userIdValue && this.needsTrustedForMfa()))
            }
            onClick={() => this.showCreateNewKey()}
          >
            Add new Membership
          </button>
        </div>
      </BaseLayout>
    )
  }
}

Memberships.propTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  auth: PropTypes.object,
}

export default authRequired(Memberships)
