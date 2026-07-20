import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { authRequired } from '../utils/auth'
import BaseLayout from './layouts/BaseLayout'
import rokka from '../rokka'
import { login } from '../state'
import { formatDate } from '../utils/string'

const DEFAULT_STATE = {
  loading: true,
  error: false,
  data: [],
}

class UserMemberships extends PureComponent {
  constructor(props) {
    super(props)
    this.state = DEFAULT_STATE
  }

  componentDidMount() {
    this.getMemberships()
  }

  getMemberships = () => {
    rokka()
      .request('user/memberships')
      .then(({ body }) => {
        this.setState({ loading: false, error: false, data: body.items || [] })
      })
      .catch(() => {
        this.setState({ loading: false, error: true })
      })
  }

  // Switching organization uses the current token (empty api key), so no
  // re-authentication is needed: a rokka token is valid for the user across
  // all organizations they are a member of.
  switchOrganization = (organization) => {
    if (organization === this.props.auth.organization) {
      return
    }
    login(organization, '', () => this.props.router.history.push('/'))
  }

  getTable = (data) => {
    return (
      <table>
        <tbody>
          <tr className={'rka-h3 mb-md'}>
            <th>Organization</th>
            <th>Roles</th>
            <th>Active</th>
            <th>Last Access (updated every 24h)</th>
            <th> </th>
          </tr>
          {data.map((membership) => {
            const isCurrent = membership.organization === this.props.auth.organization
            return (
              <tr key={membership.organization_id || membership.organization}>
                <td className={'mb-md'} style={{ height: '4em' }}>
                  <strong>{membership.organization}</strong>
                  {membership.display_name &&
                  membership.display_name !== membership.organization ? (
                    <div>{membership.display_name}</div>
                  ) : null}
                </td>
                <td>{(membership.roles || []).join(', ')}</td>
                <td>{membership.active ? 'yes' : 'no'}</td>
                <td>{formatDate(membership.last_access, '')}</td>
                <td>
                  {isCurrent ? (
                    <em>Current organization</em>
                  ) : (
                    <button
                      className="rka-button rka-button-brand"
                      onClick={() => this.switchOrganization(membership.organization)}
                    >
                      Switch to this organization
                    </button>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  render() {
    return (
      <BaseLayout {...this.props}>
        <div className="section rka-box no-min-height">
          <h2 className={'rka-h2 mb-md'}>Your memberships</h2>
          <div className={'mb-md'}>
            All the organizations you are a member of. Click an organization to switch the dashboard
            to it.
          </div>
        </div>
        <div className="section rka-box no-min-height rka-table-apikeys">
          {this.state.error ? (
            <div>Could not load your memberships.</div>
          ) : this.state.loading ? (
            <div>Loading…</div>
          ) : this.state.data.length === 0 ? (
            <div>You are not a member of any organization.</div>
          ) : (
            this.getTable(this.state.data)
          )}
        </div>
      </BaseLayout>
    )
  }
}

UserMemberships.propTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  auth: PropTypes.object,
}

export { UserMemberships }
export default authRequired(UserMemberships)
