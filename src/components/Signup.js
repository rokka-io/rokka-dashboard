import React, { Component, PropTypes } from 'react'
import rokka from '../rokka'
import FramelessLayout from './layouts/FramelessLayout'
import { login } from '../state'
import {setAlert} from '../state/index'

class Signup extends Component {

  constructor () {
    super()

    this.state = {
      email: '',
      organization: '',
      showTransition: false
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (e) {
    e.preventDefault()
    rokka.users.create(this.state.email, this.state.organization).then(response => {
      login(this.state.organization, response.body.api_key, (done) => {
        this.props.router.push('/')
        done()
      })
    }).catch((err) => {
      let message = err.error.error.message
      if (err.statusCode === 403 || err.statusCode === 404) {
        setAlert('error', 'Authentication failed')
      } else if (err.statusCode === 400) {
        setAlert('error', message)
      } else {
        setAlert('error', 'Unknown error occurred')
      }
    })
  }

  onChange (e) {
    const target = e.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

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
                <form onSubmit={this.onSubmit}>
                  <div className="rka-form-group">
                    <label className="rka-label" htmlFor="organization">Organization</label>
                    <input className="rka-input-txt" type="text" value={this.state.organization} id="organization" name="organization"
                      onChange={(e) => this.onChange(e)} />
                  </div>
                  <div className="rka-form-group">
                    <label className="rka-label" htmlFor="email">E-mail</label>
                    <input className="rka-input-txt" value={this.state.email} type="email" id="email" name="email"
                      onChange={(e) => this.onChange(e)} />
                  </div>
                  <input className="rka-button rka-button-brand mt-sm" type="submit" value="Start free trial" />
                  <p className="txt-gray-darkest mt-md lh-lg">
                    By creating an account,
                    you agree to rokka's
                    <a href="http://rokka.io/assets/pdf/Rokka_Terms_of_use_EN.pdf" target="_blank" className="pl-xs rka-link">Terms & Conditions</a></p>
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
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default Signup
