import React, { Component, PropTypes } from 'react'
import { authRequired } from '../utils/auth'
import FramelessLayout from './layouts/FramelessLayout'

class Signup extends Component {
  render () {
    return (
      <FramelessLayout {...this.props}>
        <div className="rka-signup-container">
          <div className="row">
            <div className="col-md-5">
              <div className="rka-signup-brand">
                <i className="rka-header-logo mb-lg" />
                <h2 className="txt-white rka-h2">Try out rokka for 90 days.</h2>
                <p className="mt-sm txt-white">rokka is free to use for 90 days.</p>
                <p className="txt-white">No monthly costs, no credit card required.</p>
                <p className="rka-login-brand-powered">Powered by Liip.</p>
              </div>
            </div>
            <div className="col-md-7">
              <div className="rka-signup-form-container">
                <form onSubmit={this.onLogin}>
                  <div className="rka-form-group">
                    <label className="rka-label" htmlFor="name">What should we call you?</label>
                    <input className="rka-input-txt" type="text" id="name" name="name"
                      onChange={(e) => this.onChange(e)} />
                  </div>
                  <div className="rka-form-group">
                    <label className="rka-label" htmlFor="organization">Organization</label>
                    <input className="rka-input-txt" type="text" id="organization" name="organization"
                      onChange={(e) => this.onChange(e)} />
                  </div>
                  <div className="rka-form-group">
                    <label className="rka-label" htmlFor="email">E-mail</label>
                    <input className="rka-input-txt" type="email" id="email" name="email"
                      onChange={(e) => this.onChange(e)} />
                  </div>
                  <div className="rka-form-group">
                    <label className="rka-label" htmlFor="description">Describe where and how you plan to use rokka</label>
                    <input className="rka-input-txt" type="text" id="description" name="description"
                      onChange={(e) => this.onChange(e)} />
                  </div>
                  <input className="rka-button rka-button-brand mt-sm" type="submit" value="Start free trial" />
                  <p className="txt-gray-darkest mt-md lh-lg">
                    By creating an account,
                    you agree to rokka's
                    <a href="#" className="pl-xs rka-link">Terms & Conditions</a></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </FramelessLayout>
    )
  }
}

Signup.propTypes = {
  auth: PropTypes.object
}

export default authRequired(Signup)
