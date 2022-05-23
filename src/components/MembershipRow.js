import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import rokka from '../rokka'
import { formatDate } from '../utils/string'

const DEFAULT_STATE = {
  delete: false
}

class MembershipRow extends PureComponent {
  constructor(props) {
    super(props)
    this.state = DEFAULT_STATE
  }
  showDelete = () => {
    this.setState({ delete: true })
  }

  reallyDelete = () => {
    rokka()
      .memberships.delete(this.props.organization, this.props.membership.user_id)
      .then(({ body }) => {
        this.props.updateKeys()
      })
      .catch(err => {
        alert("Membership deletion didn't work:" + err.body.error.message)
      })
  }
  render() {
    return (
      <tr key={this.props.membership.user_id}>
        <td className={'mb-md'} style={{ height: '4em' }}>
          {this.props.membership.user_id}
        </td>
        <td>{this.props.membership.email}</td>
        <td>{this.props.membership.roles.join(',')}</td>
        <td>{this.props.membership.comment}</td>
        <td>{formatDate(this.props.membership.created, 'Before May 2022')}</td>
        <td>{formatDate(this.props.membership.last_access, '')}</td>
        <td>
          {this.props.membership.user_id === this.props.currentUserId ? (
            <>
              <div className={'mb-sm'}>Currently used user, not removable. </div>
              <div>(Login as another user, if you want to delete this one)</div>
            </>
          ) : this.state.delete ? (
            <>
              <button
                className="rka-button rka-button-brand  mr-md"
                onClick={e => this.reallyDelete(e)}
              >
                Really Delete!
              </button>
              <button
                className="rka-button rka-button-secondary"
                onClick={e => this.setState({ delete: false })}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="rka-button rka-button-brand"
                onClick={e =>
                  this.props.updateState({
                    userIdValue: this.props.membership.user_id,
                    commentValue: this.props.membership.comment,
                    rolesValue: this.props.membership.roles,
                    showCreate: true
                  })
                }
                style={{ marginBottom: '0.5em' }}
              >
                Edit
              </button>
              <button
                className="rka-button rka-button-brand"
                onClick={e => this.showDelete(e)}
                style={{ marginLeft: '1em' }}
              >
                Remove
              </button>
            </>
          )}
        </td>
      </tr>
    )
  }
}

MembershipRow.propTypes = {
  membership: PropTypes.object.isRequired,
  updateKeys: PropTypes.func.isRequired,
  organization: PropTypes.string.isRequired,
  currentUserId: PropTypes.string.isRequired,
  updateState: PropTypes.func.isRequired
}

export default MembershipRow
