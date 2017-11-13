import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import FramelessLayout from './layouts/FramelessLayout'
import Spinner from './Spinner'
import { login } from '../state'
import cx from 'classnames'

class Login extends Component {
  constructor () {
    super()

    this.state = {
      organization: null,
      apiKey: null,
      showLoader: false,
      showTransition: false
    }

    this.onLogin = this.onLogin.bind(this)
  }

  onLogin (e) {
    e.preventDefault()

    this.setState({ showLoader: true })

    const successCb = (done) => {
      this.setState({
        showTransition: true,
        showLoader: false
      })
      setTimeout(done, 900)
    }

    login(this.state.organization, this.state.apiKey, successCb)
      .catch(() => {
        this.setState({showLoader: false})
      })
  }

  onChange (e) {
    const target = e.currentTarget
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  render () {
    return (
      <CSSTransition appear classNames="login-transition" timeout={0}>
        <FramelessLayout className={cx('rka-login-page', {'login-transition-exit': this.state.showTransition})} {...this.props}>
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
                <div className="rka-login-form-container">
                  <form onSubmit={this.onLogin}>
                    <div className="rka-form-group">
                      <label className="rka-label" htmlFor="organization">Organization</label>
                      <input className="rka-input-txt" type="text" id="organization" name="organization"
                        defaultValue={this.state.organization} onChange={(e) => this.onChange(e)} />
                    </div>
                    <div className="rka-form-group">
                      <label className="rka-label" htmlFor="apiKey">Api Key</label>
                      <input className="rka-input-txt" type="password" id="apiKey" name="apiKey"
                        defaultValue={this.state.apiKey} onChange={(e) => this.onChange(e)} />
                    </div>
                    <button className="rka-button rka-button-brand mt-sm" ref="loginButton" type="submit">
                      { this.state.showLoader ? <div className="sk-cube-small sk-cube-white"><Spinner /></div> : 'Login' }
                    </button>
                  </form>
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
