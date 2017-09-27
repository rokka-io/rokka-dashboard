import PropTypes from 'prop-types'
import React, { Component } from 'react'
import InputRange from '../forms/InputRange.js'
import FormGroup from '../forms/FormGroup'

class Blur extends Component {
  isRequired (field) {
    return this.props.required.indexOf(field) !== -1
  }

  render () {
    const { defaults, values, errors = {} } = this.props

    return (
      <div className="row">
        <div className="col-md-6">
          <FormGroup label="Blur Sigma" required={this.isRequired('sigma')} error={errors.sigma}>
            <InputRange
              name="sigma"
              min={defaults.sigma.minimum}
              max={defaults.sigma.maximum}
              value={values.sigma}
              defaultValue={defaults.sigma.default}
              onChange={this.props.onChange}
            />
          </FormGroup>
        </div>
        <div className="col-md-6">
          <FormGroup label="Blur Radius" required={this.isRequired('radius')} error={errors.radius}>
            <InputRange
              name="radius"
              min={defaults.radius.minimum}
              max={defaults.radius.maximum}
              value={values.radius}
              defaultValue={defaults.radius.default}
              onChange={this.props.onChange}
            />
          </FormGroup>
        </div>
      </div>
    )
  }
}

Blur.propTypes = {
  onChange: PropTypes.func,
  defaults: PropTypes.shape({
    radius: PropTypes.shape({
      minimum: PropTypes.number,
      maximum: PropTypes.number
    }),
    sigma: PropTypes.shape({
      minimum: PropTypes.number,
      maximum: PropTypes.number
    })
  }),
  values: PropTypes.shape({
    radius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sigma: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  required: PropTypes.array.isRequired,
  errors: PropTypes.object
}

export default Blur
