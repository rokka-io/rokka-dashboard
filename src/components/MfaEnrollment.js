import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import CopyToClipboard from 'react-copy-to-clipboard'
import cx from 'classnames'
import Spinner from './Spinner'
import { classifyMfaError, TOTP_RATE_LIMITED } from '../utils/mfaErrors'

/**
 * TOTP (MFA) enrollment wizard. Container-agnostic: rendered inline in the
 * login flow (with an Api-Key client) and inside a Modal on the Apikeys page
 * (with the normal session client).
 *
 * On mount it starts the setup (POST /user/mfa/totp) and shows the QR code +
 * secret. After the user confirms a code, onEnrolled(code) is called with the
 * confirmed code, which the caller can reuse once for the token exchange.
 */
class MfaEnrollment extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      phase: 'loading', // loading | secret | error
      secret: null,
      provisioningUri: null,
      code: '',
      message: null,
      submitting: false,
      copied: false,
    }

    this.onConfirm = this.onConfirm.bind(this)
  }

  componentDidMount() {
    this.props.client.user
      .setupMfaTotp()
      .then((res) => {
        this.setState({
          phase: 'secret',
          secret: res.body.secret,
          provisioningUri: res.body.provisioning_uri,
        })
      })
      .catch((err) => {
        if (err.statusCode === 409) {
          this.setState({
            phase: 'error',
            message: 'Two-factor authentication is already active for your user.',
          })
          return
        }
        this.setState({
          phase: 'error',
          message: 'Could not start the two-factor setup. Please try again.',
        })
      })
  }

  onConfirm(e) {
    e.preventDefault()
    const code = this.state.code.trim()
    if (!code) {
      return
    }
    this.setState({ submitting: true, message: null })
    this.props.client.user
      .confirmMfaTotp(code)
      .then(() => {
        this.setState({ submitting: false })
        this.props.onEnrolled(code)
      })
      .catch((err) => {
        const kind = classifyMfaError(err)
        let message = 'Wrong code. Please try again.'
        if (kind === TOTP_RATE_LIMITED) {
          message = 'Too many attempts. Please wait a moment and try again.'
        } else if (err.statusCode === 409) {
          message = 'The setup expired. Please reload and start again.'
        }
        this.setState({ submitting: false, code: '', message })
      })
  }

  render() {
    const { phase, message, submitting } = this.state
    const { onCancel } = this.props

    if (phase === 'loading') {
      return (
        <div className="rka-mfa-enrollment">
          <div className="sk-cube-small">
            <Spinner />
          </div>
        </div>
      )
    }

    if (phase === 'error') {
      return (
        <div className="rka-mfa-enrollment">
          <p className="rka-mfa-error">{message}</p>
          {onCancel && (
            <button className="rka-button rka-button-secondary" onClick={onCancel}>
              Back
            </button>
          )}
        </div>
      )
    }

    return (
      <div className="rka-mfa-enrollment">
        <h3 className="rka-h3">Set up two-factor authentication</h3>
        <p>
          Scan this QR code with an authenticator app (e.g. Google Authenticator, 1Password), then
          enter the current code below to activate it.
        </p>
        <div className="rka-mfa-qr">
          <QRCodeSVG value={this.state.provisioningUri} size={192} />
        </div>
        <p className="rka-mfa-secret-label">Or enter this secret manually:</p>
        <div className="rka-mfa-secret">
          <code>{this.state.secret}</code>
          <CopyToClipboard text={this.state.secret} onCopy={() => this.setState({ copied: true })}>
            <button className="rka-button rka-button-secondary rka-button-small" type="button">
              {this.state.copied ? 'Copied' : 'Copy'}
            </button>
          </CopyToClipboard>
        </div>
        <form onSubmit={this.onConfirm}>
          <div className="rka-form-group">
            <label className="rka-label" htmlFor="mfa-enroll-code">
              Verification code
            </label>
            <input
              className="rka-input-txt"
              type="text"
              id="mfa-enroll-code"
              name="code"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              autoFocus
              value={this.state.code}
              onChange={(e) => this.setState({ code: e.currentTarget.value.trim() })}
            />
          </div>
          {message && <p className="rka-mfa-error">{message}</p>}
          <div className="rka-mfa-actions">
            <button
              className={cx('rka-button rka-button-brand', { disabled: submitting })}
              type="submit"
            >
              {submitting ? (
                <div className="sk-cube-small sk-cube-white">
                  <Spinner />
                </div>
              ) : (
                'Activate'
              )}
            </button>
            {onCancel && (
              <button className="rka-button rka-button-secondary" type="button" onClick={onCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    )
  }
}

MfaEnrollment.propTypes = {
  client: PropTypes.object.isRequired,
  onEnrolled: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
}

export default MfaEnrollment
