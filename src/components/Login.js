import React, { Component } from 'react'
import TransitionGroup from 'react-addons-css-transition-group'
import FramelessLayout from './layouts/FramelessLayout'
import { login } from '../state'
import cx from 'classnames'

class Login extends Component {
  constructor () {
    super()

    this.state = {
      organization: null,
      apiKey: null,
      showTransition: false
    }

    this.onLogin = this.onLogin.bind(this)
  }

  onLogin (e) {
    e.preventDefault()

    const successCb = (done) => {
      this.setState({ showTransition: true })
      setTimeout(done, 900)
    }

    login(this.state.organization, this.state.apiKey, successCb)
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
      <TransitionGroup component="div"
        transitionName="login-transition"
        transitionAppear
        transitionAppearTimeout={0}
        transitionEnterTimeout={0}
        transitionLeaveTimeout={0}>
        <FramelessLayout className={cx('rka-login-page', {'login-transition-leave': this.state.showTransition})} {...this.props}>
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
                    <input className="rka-button rka-button-brand mt-sm" type="submit" value="Login" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </FramelessLayout>
      </TransitionGroup>
    )
  }
}

export default Login
