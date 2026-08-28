import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import rokka from '../rokka'
import { setAlert } from '../state'
import { formatDate } from '../utils/string'
import { getApiErrorMessage } from '../utils/errors'

const RATE_LIMITED = 'Too many code attempts. Please wait a few minutes and try again.'

const DEFAULT_STATE = {
  loading: true,
  // 'none' | 'pending' | 'active', as returned by GET /user/mfa/totp
  totpState: null,
  confirmed: null,
  // the secret + provisioning uri of a setup we just started
  setup: null,
  code: '',
  busy: false,
  showDisable: false,
  error: null,
}

class MfaSetup extends PureComponent {
  constructor(props) {
    super(props)
    this.state = DEFAULT_STATE
  }

  componentDidMount() {
    this.loadState()
  }

  loadState = () => {
    rokka()
      .user.getMfaTotp()
      .then(({ body }) => {
        this.setState({
          loading: false,
          totpState: body.state,
          confirmed: body.confirmed || null,
          error: null,
        })
        this.props.onTotpState(body.state)
      })
      .catch((err) => {
        this.setState({
          loading: false,
          totpState: null,
          error: getApiErrorMessage(err, 'Could not read the two-factor state'),
        })
        this.props.onTotpState(null)
      })
  }

  errorMessage = (err, fallback) =>
    err.statusCode === 429 ? RATE_LIMITED : getApiErrorMessage(err, fallback)

  startSetup = () => {
    this.setState({ busy: true })
    rokka()
      .user.setupMfaTotp()
      .then(({ body }) => {
        this.setState({ busy: false, setup: body, totpState: 'pending', code: '', error: null })
        this.props.onTotpState('pending')
      })
      .catch((err) => {
        this.setState({
          busy: false,
          error: this.errorMessage(err, "Couldn't start the two-factor setup"),
        })
      })
  }

  confirmSetup = (e) => {
    e.preventDefault()
    this.setState({ busy: true })
    rokka()
      .user.confirmMfaTotp(this.state.code)
      .then(() => {
        this.setState({ busy: false, setup: null, code: '', error: null })
        setAlert('success', 'Two-factor authentication is now active.', 5000)
        this.loadState()
      })
      .catch((err) => {
        this.setState({
          busy: false,
          code: '',
          error: this.errorMessage(err, 'The code was not accepted'),
        })
      })
  }

  disable = (e) => {
    e.preventDefault()
    this.setState({ busy: true })
    rokka()
      .user.disableMfaTotp(this.state.code)
      .then(() => {
        this.setState({ busy: false, code: '', showDisable: false, error: null })
        setAlert('success', 'Two-factor authentication is disabled.', 5000)
        this.loadState()
        this.props.updateKeys()
      })
      .catch((err) => {
        this.setState({
          busy: false,
          code: '',
          error: this.errorMessage(err, "Couldn't disable two-factor authentication"),
        })
      })
  }

  renderCodeInput = () => (
    <input
      type="text"
      name="code"
      placeholder={'6-digit code'}
      autoComplete="one-time-code"
      inputMode="numeric"
      pattern="[0-9]*"
      maxLength={6}
      value={this.state.code}
      className="rka-input-txt mb-sm mr-md"
      style={{ maxWidth: '10em', display: 'inline-block' }}
      onChange={(e) => this.setState({ code: e.currentTarget.value.trim() })}
    />
  )

  renderSetup = () => (
    <form onSubmit={this.confirmSetup}>
      <div className={'mb-md lh-lg'}>
        Scan this code with your authenticator app, then confirm it with the code it shows.
      </div>
      {this.state.setup.provisioning_uri && (
        <div className={'mb-md'}>
          <QRCodeSVG value={this.state.setup.provisioning_uri} size={160} />
        </div>
      )}
      {this.state.setup.secret && (
        <div className={'mb-md'}>
          <div>Or enter this secret manually:</div>
          <div style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
            {this.state.setup.secret}
          </div>
          <CopyToClipboard
            text={this.state.setup.secret}
            onCopy={() => setAlert('success', 'Secret copied', 2000)}
          >
            <button className="rka-button rka-button-secondary mt-sm" type="button">
              Copy secret
            </button>
          </CopyToClipboard>
        </div>
      )}
      <div>
        {this.renderCodeInput()}
        <button
          className="rka-button rka-button-brand mr-md"
          type="submit"
          disabled={this.state.busy || this.state.code.length === 0}
        >
          Confirm
        </button>
        <button
          className="rka-button rka-button-secondary"
          type="button"
          disabled={this.state.busy}
          onClick={() => this.setState({ setup: null, code: '', error: null })}
        >
          Cancel
        </button>
      </div>
    </form>
  )

  renderPending = () => (
    <form onSubmit={this.confirmSetup}>
      <div className={'mb-md lh-lg'}>
        A two-factor setup was started but never confirmed. If you still have it in your
        authenticator app, confirm it with a current code. Otherwise start over, that replaces the
        unconfirmed secret with a new one.
      </div>
      {this.renderCodeInput()}
      <button
        className="rka-button rka-button-brand mr-md"
        type="submit"
        disabled={this.state.busy || this.state.code.length === 0}
      >
        Confirm
      </button>
      <button
        className="rka-button rka-button-secondary"
        type="button"
        disabled={this.state.busy}
        onClick={this.startSetup}
      >
        Start over
      </button>
    </form>
  )

  renderActive = () => (
    <>
      <div className={'mb-md lh-lg'}>
        It is active
        {this.state.confirmed ? ` since ${formatDate(this.state.confirmed)}` : ''}. You can now
        require it on individual Api Keys below.
      </div>
      {this.state.showDisable ? (
        <form onSubmit={this.disable}>
          <div className={'mb-md lh-lg'}>
            Disabling it also removes the "Requires MFA" flag from <strong>all</strong> your Api
            Keys. Enter a current code to confirm.
          </div>
          {this.renderCodeInput()}
          <button
            className="rka-button rka-button-brand mr-md"
            type="submit"
            disabled={this.state.busy || this.state.code.length === 0}
          >
            Really disable
          </button>
          <button
            className="rka-button rka-button-secondary"
            type="button"
            disabled={this.state.busy}
            onClick={() => this.setState({ showDisable: false, code: '', error: null })}
          >
            Cancel
          </button>
        </form>
      ) : (
        <button
          className="rka-button rka-button-secondary"
          onClick={() => this.setState({ showDisable: true, error: null })}
        >
          Disable two-factor authentication
        </button>
      )}
    </>
  )

  renderNone = () => (
    <>
      <div className={'mb-md'}>It is not set up yet.</div>
      <button
        className="rka-button rka-button-brand"
        disabled={this.state.busy}
        onClick={this.startSetup}
      >
        Set up two-factor authentication
      </button>
    </>
  )

  renderBody() {
    if (this.state.loading) {
      return <div>Loading …</div>
    }
    if (this.state.totpState === null) {
      // no state and no setup in flight: the request failed, the error is shown below
      return null
    }
    if (this.state.setup) {
      return this.renderSetup()
    }
    if (this.state.totpState === 'active') {
      return this.renderActive()
    }
    if (this.state.totpState === 'pending') {
      return this.renderPending()
    }
    return this.renderNone()
  }

  render() {
    return (
      <div className="section rka-box no-min-height">
        <h2 className={'rka-h2 mb-md'}>Two-Factor Authentication (MFA)</h2>
        <div className={'mb-md lh-lg'}>
          Once this is set up, you can require a code on individual Api Keys below. Be aware of what
          that does to such a key: it can <strong>not be used for API calls any more</strong>. The
          only thing left it can do is be exchanged for a token, together with a current code from
          your authenticator app — which is exactly what logging into this dashboard does. So it
          belongs on the key you log in with, not on one a server or a script uses: there is nobody
          there to type the code.
        </div>
        {this.renderBody()}
        {this.state.error && <div className={'mt-md lh-lg txt-cranberry'}>{this.state.error}</div>}
      </div>
    )
  }
}

MfaSetup.propTypes = {
  /** Called with the resolved TOTP state ('none' | 'pending' | 'active' | null) */
  onTotpState: PropTypes.func.isRequired,
  /** Reload the key list, the flags change when MFA is disabled */
  updateKeys: PropTypes.func.isRequired,
}

export default MfaSetup
