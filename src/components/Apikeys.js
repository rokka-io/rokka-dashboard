import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { authRequired } from '../utils/auth'
import BaseLayout from './layouts/BaseLayout'
import rokka from '../rokka'
import ApikeyRow from './ApikeyRow'

const DEFAULT_STATE = {
  loading: true,
  currentKeyId: '',
  data: [],
  showCreate: false,
  commentValue: '',
  newApiKey: null
}

class Apikeys extends PureComponent {
  constructor(props) {
    super(props)
    this.state = DEFAULT_STATE
  }

  componentDidMount() {
    this.getKeys()
  }

  getTable = data => {
    return (
      <table key={'table'}>
        <tbody>
          <tr className={'rka-h3 mb-md'}>
            <th>ID</th>
            <th>Comment</th>
            <th>Created</th>
            <th>Last Access (updated every 24h)</th>
            <th> </th>
          </tr>
          {data.map(key => {
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
      .catch(err => {
        console.log('Could not get current key id')
      })
    rokka()
      .user.listApiKeys()
      .then(({ body }) => {
        this.setState({ loading: false, data: body })
      })
      .catch(err => {
        this.setState({ org: 'error' })
      })
  }

  showCreateNewKey = () => {
    if (this.state.showCreate) {
      rokka()
        .user.addApiKey(this.state.commentValue)
        .then(({ body }) => {
          this.setState({ showCreate: false, commentValue: '', newApiKey: body.api_key })

          this.getKeys()
        })
        .catch(err => {
          this.setState({ showCreate: false, commentValue: '' })
          alert("Api Key creation didn't work:" + err.body.error.message)
        })
    } else {
      this.setState({ showCreate: true })
    }
  }

  createNewKey = () => {}

  render() {
    return (
      <BaseLayout {...this.props}>
        <div key={'title2'} className="section rka-box no-min-height">
          <h2 className={'rka-h2 mb-md'}>Your Api Keys</h2>
        </div>
        <div key={'table'} className="section rka-box no-min-height rka-table-apikeys">
          {this.getTable(this.state.data)}
        </div>
        {this.state.newApiKey && (
          <div className="section rka-box no-min-height">
            <div className={'mb-md'}>
              Your new Api Key is:{' '}
              <span style={{ fontWeight: 'bold' }}>{this.state.newApiKey}</span>
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
              onChange={e => this.setState({ commentValue: e.currentTarget.value })}
            />
          )}

          {this.state.showCreate && (
            <button
              className="rka-button rka-button-secondary mr-md"
              onClick={e => this.showCreateNewKey(e)}
            >
              Cancel
            </button>
          )}

          {this.state.data.length < 5 ? (
            <button className="rka-button rka-button-brand" onClick={e => this.showCreateNewKey(e)}>
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
      push: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  auth: PropTypes.object
}

export default authRequired(Apikeys)
