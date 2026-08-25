import React, { PureComponent } from 'react'
import { CSSTransition } from 'react-transition-group'
import FramelessLayout from './layouts/FramelessLayout'
import Spinner from './Spinner'
import MfaEnrollment from './MfaEnrollment'
import { login } from '../state'
import { createApiKeyClient } from '../rokka'
import {
  classifyMfaError,
  MFA_REQUIRED,
  MFA_ENROLLMENT_REQUIRED,
  TOTP_INVALID,
  TOTP_RATE_LIMITED,
} from '../utils/mfaErrors'
import cx from 'classnames'

class Login extends PureComponent {
  constructor() {
    super()

    this.state = {
      organization: null,
      apiKey: null,
      showLoader: false,
      showTransition: false,
      step: 'credentials', // credentials | totp | enrolling
      totp: '',
      mfaMessage: null,
    }

    this.onLogin = this.onLogin.bind(this)
    this.onSubmitTotp = this.onSubmitTotp.bind(this)
    this.doLogin = this.doLogin.bind(this)
  }

  onLogin(e) {
    e.preventDefault()
    this.doLogin()
  }

  onSubmitTotp(e) {
    e.preventDefault()
    const totp = this.state.totp.trim()
    if (!totp) {
      return
    }
    this.doLogin(totp)
  }

  doLogin(totp) {
    this.setState({ showLoader: true, mfaMessage: null })

    const successCb = (done) => {
      this.setState({
        showTransition: true,
        showLoader: false,
      })
      setTimeout(done, 900)
    }

    login(this.state.organization, this.state.apiKey, successCb, totp).catch((err) => {
      const kind = classifyMfaError(err)
      if (kind === MFA_REQUIRED) {
        this.setState({ step: 'totp', totp: '', showLoader: false, mfaMessage: null })
      } else if (kind === TOTP_INVALID) {
        this.setState({
          step: 'totp',
          totp: '',
          showLoader: false,
          mfaMessage: 'Invalid or already used code. Please try again.',
        })
      } else if (kind === TOTP_RATE_LIMITED) {
        this.setState({
          step: 'totp',
          totp: '',
          showLoader: false,
          mfaMessage: 'Too many attempts. Please wait a moment and try again.',
        })
      } else if (kind === MFA_ENROLLMENT_REQUIRED) {
        this.setState({ step: 'enrolling', showLoader: false })
      } else {
        // a non-MFA error, the global alert (set in state.login) handles it
        this.setState({ showLoader: false })
      }
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

  renderCredentials() {
    return (
      <form onSubmit={this.onLogin}>
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
            'Login'
          )}
        </button>
      </form>
    )
  }

  renderTotp() {
    return (
      <form onSubmit={this.onSubmitTotp}>
        <h3 className="rka-h3">Two-factor authentication</h3>
        <p>Enter the current code from your authenticator app.</p>
        <div className="rka-form-group">
          <label className="rka-label" htmlFor="totp">
            Verification code
          </label>
          <input
            className="rka-input-txt"
            type="text"
            id="totp"
            name="totp"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            autoFocus
            value={this.state.totp}
            onChange={(e) => this.onChange(e)}
          />
        </div>
        {this.state.mfaMessage && <p className="rka-mfa-error">{this.state.mfaMessage}</p>}
        <div className="rka-mfa-actions">
          <button
            className={cx('rka-button rka-button-brand', { disabled: this.state.showLoader })}
            type="submit"
          >
            {this.state.showLoader ? (
              <div className="sk-cube-small sk-cube-white">
                <Spinner />
              </div>
            ) : (
              'Verify'
            )}
          </button>
          <button
            className="rka-button rka-button-secondary"
            type="button"
            onClick={() => this.setState({ step: 'credentials', totp: '', mfaMessage: null })}
          >
            Back
          </button>
        </div>
      </form>
    )
  }

  renderStep() {
    if (this.state.step === 'totp') {
      return this.renderTotp()
    }
    if (this.state.step === 'enrolling') {
      return (
        <MfaEnrollment
          client={createApiKeyClient(this.state.apiKey)}
          onEnrolled={(code) => this.doLogin(code)}
          onCancel={() => this.setState({ step: 'credentials', mfaMessage: null })}
        />
      )
    }
    return this.renderCredentials()
  }

  render() {
    return (
      <CSSTransition appear classNames="login-transition" timeout={0}>
        <FramelessLayout
          className={cx('rka-login-page', { 'login-transition-exit': this.state.showTransition })}
          {...this.props}
        >
          <div className="rka-login-container">
            <div className="row">
              <div className="col-md-5">
                <div className="rka-login-brand">
                  <i className="rka-header-logo mb-lg" />
                  <h2 className="txt-white rka-h2">Web images done right.</h2>
                  <p className="rka-login-brand-powered">Powered by Liip.</p>
                </div>
              </div>
              <div className="col-md-7">
                <div className="rka-login-form-container">{this.renderStep()}</div>
              </div>
            </div>
          </div>
        </FramelessLayout>
      </CSSTransition>
    )
  }
}

export default Login
