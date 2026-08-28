import React, { PureComponent } from 'react'
import { CSSTransition } from 'react-transition-group'
import { QRCodeSVG } from 'qrcode.react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import FramelessLayout from './layouts/FramelessLayout'
import Spinner from './Spinner'
import { login, setAlert, removeAlert } from '../state'
import { rawKeyClient } from '../rokka'
import { getApiErrorMessage, needsMfaEnrollment, needsTotp } from '../utils/errors'
import cx from 'classnames'

// Plain organization + Api Key.
const MODE_LOGIN = 'login'
// The key has `requires_mfa`, we need the current code from the authenticator app.
const MODE_TOTP = 'totp'
// The key has `requires_mfa`, but the user has no TOTP setup yet. It can't do
// anything else than that setup, so we offer it right here.
const MODE_ENROLL = 'enroll'

const DEFAULT_STATE = {
  organization: null,
  apiKey: null,
  showLoader: false,
  showTransition: false,
  mode: MODE_LOGIN,
  totp: '',
  mfaSetup: null,
  hint: null,
}

class Login extends PureComponent {
  constructor() {
    super()

    this.state = DEFAULT_STATE

    this.onLogin = this.onLogin.bind(this)
    this.onConfirmEnrollment = this.onConfirmEnrollment.bind(this)
  }

  onLogin(e) {
    e.preventDefault()

    this.setState({ showLoader: true, hint: null })

    const successCb = (done) => {
      this.setState({
        showTransition: true,
        showLoader: false,
      })
      setTimeout(done, 900)
    }

    // an empty string, not null: the state's login() branches on a truthy key
    const totp = this.state.mode === MODE_TOTP ? this.state.totp : ''

    login(this.state.organization, this.state.apiKey, successCb, totp).catch((err) => {
      if (needsMfaEnrollment(err)) {
        return this.startEnrollment()
      }
      if (needsTotp(err)) {
        // either the first attempt without a code, or a wrong/reused one. The
        // state already put the reason into the alert.
        return this.setState({ showLoader: false, mode: MODE_TOTP, totp: '' })
      }
      this.setState({ showLoader: false, mode: MODE_LOGIN, totp: '', mfaSetup: null })
    })
  }

  /**
   * Start (or restart) the TOTP setup with the raw Api Key.
   *
   * This has to go through `rawKeyClient()`: the regular client tries to mint a
   * token first, which is precisely what this key can't do yet.
   */
  startEnrollment() {
    rawKeyClient(this.state.apiKey)
      .user.setupMfaTotp()
      .then(({ body }) => {
        removeAlert()
        this.setState({
          showLoader: false,
          mode: MODE_ENROLL,
          mfaSetup: body,
          totp: '',
        })
      })
      .catch((err) => {
        setAlert('error', 'Could not start the two-factor setup: ' + getApiErrorMessage(err), 10000)
        this.setState({ showLoader: false, mode: MODE_LOGIN, totp: '', mfaSetup: null })
      })
  }

  onConfirmEnrollment(e) {
    e.preventDefault()

    this.setState({ showLoader: true, hint: null })

    rawKeyClient(this.state.apiKey)
      .user.confirmMfaTotp(this.state.totp)
      .then(() => {
        removeAlert()
        this.setState({
          showLoader: false,
          mode: MODE_TOTP,
          mfaSetup: null,
          totp: '',
          // the code we just used is burned, minting a token with it fails
          hint: 'Two-factor authentication is set up. Wait for the next code in your app and enter it here to log in.',
        })
      })
      .catch((err) => {
        const message =
          err.statusCode === 429
            ? 'Too many code attempts. Please wait a few minutes and try again.'
            : getApiErrorMessage(err, 'The code was not accepted')
        setAlert('error', message, 10000)
        this.setState({ showLoader: false, totp: '' })
      })
  }

  onChange(e) {
    const target = e.currentTarget
    const value = target.value.trim()
    const name = target.name

    this.setState({
      [name]: value,
    })
  }

  renderLoginFields() {
    return (
      <>
        <div className="rka-form-group">
          <label className="rka-label" htmlFor="organization">
            Organization
          </label>
          <input
            className="rka-input-txt"
            type="text"
            id="organization"
            name="organization"
            defaultValue={this.state.organization}
            onChange={(e) => this.onChange(e)}
          />
        </div>
        <div className="rka-form-group">
          <label className="rka-label" htmlFor="apiKey">
            Api Key
          </label>
          <input
            className="rka-input-txt"
            type="password"
            id="apiKey"
            name="apiKey"
            defaultValue={this.state.apiKey}
            onChange={(e) => this.onChange(e)}
          />
        </div>
      </>
    )
  }

  renderTotpField(label) {
    return (
      <div className="rka-form-group">
        <label className="rka-label" htmlFor="totp">
          {label}
        </label>
        <input
          className="rka-input-txt"
          type="text"
          id="totp"
          name="totp"
          autoComplete="one-time-code"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          autoFocus
          value={this.state.totp}
          onChange={(e) => this.onChange(e)}
        />
      </div>
    )
  }

  renderSubmitButton(label) {
    return (
      <button
        className={cx('rka-button rka-button-brand mt-sm', {
          disabled: this.state.showLoader,
        })}
        type="submit"
      >
        {this.state.showLoader ? (
          <div className="sk-cube-small sk-cube-white">
            <Spinner />
          </div>
        ) : (
          label
        )}
      </button>
    )
  }

  renderCancelButton() {
    return (
      <button
        className="rka-button rka-button-secondary mt-sm mr-md"
        type="button"
        onClick={() => {
          removeAlert()
          this.setState({ mode: MODE_LOGIN, totp: '', mfaSetup: null, hint: null })
        }}
      >
        Back
      </button>
    )
  }

  renderEnrollment() {
    const { secret, provisioning_uri: provisioningUri } = this.state.mfaSetup

    return (
      <form onSubmit={this.onConfirmEnrollment}>
        <h3 className="rka-h3 mb-sm">Set up two-factor authentication</h3>
        <p className="mb-sm">
          This Api Key requires two-factor authentication, which isn't set up yet. Scan this code
          with your authenticator app, then enter the code it shows.
        </p>
        {provisioningUri && (
          <div className="mb-sm">
            <QRCodeSVG value={provisioningUri} size={160} />
          </div>
        )}
        {secret && (
          <div className="mb-sm">
            <div>Or enter this secret manually:</div>
            <div style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{secret}</div>
            <CopyToClipboard
              text={secret}
              onCopy={() => setAlert('success', 'Secret copied', 2000)}
            >
              <button className="rka-button rka-button-secondary mt-sm" type="button">
                Copy secret
              </button>
            </CopyToClipboard>
          </div>
        )}
        {this.renderTotpField('Code from your app')}
        {this.renderCancelButton()}
        {this.renderSubmitButton('Confirm')}
      </form>
    )
  }

  renderForm() {
    if (this.state.mode === MODE_ENROLL && this.state.mfaSetup) {
      return this.renderEnrollment()
    }

    return (
      <form onSubmit={this.onLogin}>
        {this.state.mode === MODE_TOTP ? (
          <>
            <h3 className="rka-h3 mb-sm">Two-factor authentication</h3>
            {this.state.hint && <p className="mb-sm">{this.state.hint}</p>}
            {this.renderTotpField('Code from your app')}
            {this.renderCancelButton()}
            {this.renderSubmitButton('Login')}
          </>
        ) : (
          <>
            {this.renderLoginFields()}
            {this.renderSubmitButton('Login')}
          </>
        )}
      </form>
    )
  }

  render() {
    const isMfaStep = this.state.mode !== MODE_LOGIN

    return (
      <CSSTransition appear classNames="login-transition" timeout={0}>
        <FramelessLayout
          className={cx('rka-login-page', { 'login-transition-exit': this.state.showTransition })}
          {...this.props}
        >
          <div className={cx('rka-login-container', { 'rka-login-container-mfa': isMfaStep })}>
            <div className="row">
              <div className="col-md-5">
                <div className="rka-login-brand">
                  <i className="rka-header-logo mb-lg" />
                  <h2 className="txt-white rka-h2">Web images done right.</h2>
                  <p className="rka-login-brand-powered">Powered by Liip.</p>
                </div>
              </div>
              <div className="col-md-7">
                <div
                  className={cx('rka-login-form-container', {
                    'rka-login-form-container-mfa': isMfaStep,
                  })}
                >
                  {this.renderForm()}
                </div>
              </div>
            </div>
          </div>
        </FramelessLayout>
      </CSSTransition>
    )
  }
}

export default Login
