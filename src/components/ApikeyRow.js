import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { authRequired } from '../utils/auth'
import BaseLayout from './layouts/BaseLayout'
import rokka from '../rokka'
import _ from 'lodash'

const DEFAULT_STATE = {
  currentKeyId: '',
  delete: false
}

class ApikeyRow extends PureComponent {
  constructor(props) {
    super(props)
    this.state = DEFAULT_STATE
  }
  showDelete = () => {
    this.setState({ delete: true })
  }

  reallyDelete = () => {
    rokka()
      .user.deleteApiKey(this.props.apiKey.id)
      .then(({ body }) => {
        this.props.updateKeys()
      })
      .catch(err => {
        alert("Api Key deletion didn't work:" + err.body.error.message)
      })
  }
  render() {
    return (
      <tr key={this.props.apiKey.id}>
        <td className={'mb-md'} style={{ height: '4em' }}>
          {this.props.apiKey.id}
        </td>
        <td>{this.props.apiKey.comment}</td>
        <td>{this.props.apiKey.created}</td>
        <td>{this.props.apiKey.accessed}</td>
        <td>
          {this.props.apiKey.id === this.props.currentKeyId ? (
            'Currently used'
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
            <button className="rka-button rka-button-brand" onClick={e => this.showDelete(e)}>
              Delete
            </button>
          )}
        </td>
      </tr>
    )
  }
}

ApikeyRow.propTypes = {
  apiKey: PropTypes.object.isRequired,
  currentKeyId: PropTypes.string.isRequired,
  updateKeys: PropTypes.func.isRequired
}

export default ApikeyRow
