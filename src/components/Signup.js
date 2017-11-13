import PropTypes from 'prop-types'
import React, { Component } from 'react'
import rokka from '../rokka'
import Spinner from './Spinner'
import FramelessLayout from './layouts/FramelessLayout'
import { login, setAlert } from '../state'

function hasUpperCase (str) {
  return str.toLowerCase() !== str
}

class Signup extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      organization: '',
      showTransition: false,
      showLoader: false,
      organizationOnlyLowercaseError: false
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (e) {
    e.preventDefault()
    this.setState({ showLoader: true })
    rokka.users.create(this.state.email, this.state.organization).then(response => {
      login(this.state.organization, response.body.api_key, (done) => {
        setAlert('success', 'Successfully signed up. You will receive an email with the credentials', 5000)
        this.setState({ showLoader: false })
        this.props.router.push('/')
        done()
      })
    }).catch((err) => {
      this.setState({ showLoader: false })
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
    let { organizationOnlyLowercaseError } = this.state

    const target = e.target
    let value = target.value
    const name = target.name

    if (name === 'organization' && hasUpperCase(value)) {
      value = value.toLowerCase()
      organizationOnlyLowercaseError = true
    }

    this.setState({
      [name]: value,
      organizationOnlyLowercaseError
    })
  }

  render () {
    const { organization, organizationOnlyLowercaseError, email } = this.state

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
                    <input className="rka-input-txt" type="text" value={organization} id="organization" name="organization"
                      onChange={(e) => this.onChange(e)} />
                    {organizationOnlyLowercaseError && <div className="mt-xs txt-xs txt-gray">Organizations can only be in lowercase</div>}
                  </div>
                  <div className="rka-form-group">
                    <label className="rka-label" htmlFor="email">E-mail</label>
                    <input className="rka-input-txt" value={email} type="email" id="email" name="email"
                      onChange={(e) => this.onChange(e)} />
                  </div>
                  <button className="rka-button rka-button-brand mt-sm" type="submit">
                    { this.state.showLoader ? <div className="sk-cube-small sk-cube-white"><Spinner /></div> : 'Start free trial' }
                  </button>
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
