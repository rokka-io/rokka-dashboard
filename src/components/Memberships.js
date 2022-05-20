import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { authRequired } from '../utils/auth'
import BaseLayout from './layouts/BaseLayout'
import rokka from '../rokka'
import MembershipRow from './MembershipRow'
import { setAlert } from '../state'

const DEFAULT_STATE = {
  loading: true,
  currentUserId: '',
  data: [],
  showCreate: false,
  commentValue: '',
  userIdValue: '',
  rolesValue: [],
  newApiKey: null,
  newUserId: null
}

class Memberships extends PureComponent {
  constructor(props) {
    super(props)
    this.state = DEFAULT_STATE
  }

  componentDidMount() {
    this.getMemberships()
  }

  updateState = state => {
    this.setState(state)
  }
  getTable = data => {
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
          {data.map(key => {
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
      .then(id => {
        this.setState({ currentUserId: id })
      })
      .catch(err => {
        console.log('Could not get current user id', err)
      })
    rokka()
      .memberships.list(this.props.auth.organization)
      .then(({ body }) => {
        this.setState({ loading: false, data: body.items })
      })
      .catch(err => {
        this.setState({ org: 'error' })
      })
  }

  showCreateNewKey = () => {
    if (this.state.showCreate) {
      if (this.state.userIdValue) {
        rokka()
          .memberships.create(
            this.props.auth.organization,
            this.state.userIdValue,
            this.state.rolesValue,
            this.state.commentValue
          )
          .then(({ body }) => {
            this.setState({
              showCreate: false,
              commentValue: '',
              userIdValue: '',
              rolesValue: [],
              newApiKey: body.api_key,
              newUserId: body.user_id
            })

            this.getMemberships()
          })
          .catch(err => {
            this.setState({ showCreate: false })
            setAlert('error', "Membership creation didn't work:" + err.body.error.message, 5000)
          })
      } else {
        rokka()
          .memberships.createWithNewUser(
            this.props.auth.organization,
            this.state.rolesValue,
            this.state.commentValue
          )
          .then(({ body }) => {
            this.setState({
              showCreate: false,
              commentValue: '',
              rolesValue: [],
              userIdValue: '',
              newApiKey: body.api_key,
              newUserId: body.user_id
            })

            this.getMemberships()
          })
          .catch(err => {
            this.setState({ showCreate: false })
            setAlert('error', "Membership creation didn't work:" + err.body.error.message, 5000)
          })
      }
    } else {
      this.setState({ showCreate: true })
    }
  }

  render() {
    return (
      <BaseLayout {...this.props}>
        <div key={'title2'} className="section rka-box no-min-height">
          <h2 className={'rka-h2 mb-md'}>The memberships of your organization</h2>
          <div className={'mb-md'}>lala</div>
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
          </div>
        )}
        <div className="section rka-box no-min-height">
          {this.state.showCreate && (
            <>
              <h2 className={'rka-h3'}>Roles:</h2>
              {Object.values(rokka().memberships.ROLES).map(role => {
                return (
                  <div key={role}>
                    <input
                      type="checkbox"
                      name={role}
                      checked={this.state.rolesValue.includes(role)}
                      className="rka-input-checkbox mb-sm"
                      onChange={e => {
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
                            roles = roles.filter(r => r !== role)
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
                  onChange={e => this.setState({ userIdValue: e.currentTarget.value })}
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
                  onChange={e => this.setState({ commentValue: e.currentTarget.value })}
                />
              </div>
            </>
          )}

          {this.state.showCreate && (
            <button
              className="rka-button rka-button-secondary mr-md"
              onClick={e => this.setState({ showCreate: false })}
            >
              Cancel
            </button>
          )}

          <button
            className="rka-button rka-button-brand"
            disabled={this.state.showCreate && this.state.rolesValue.length === 0}
            onClick={e => this.showCreateNewKey(e)}
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
      push: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  auth: PropTypes.object
}

export default authRequired(Memberships)
