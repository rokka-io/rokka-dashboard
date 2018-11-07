import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import InputRange from '../forms/InputRange.js'
import FormGroup from '../forms/FormGroup'

class Blur extends PureComponent {
  isRequired(field) {
    return this.props.required.indexOf(field) !== -1
  }

  render() {
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
      </div>
    )
  }
}

Blur.propTypes = {
  onChange: PropTypes.func,
  defaults: PropTypes.shape({
    sigma: PropTypes.shape({
      minimum: PropTypes.number,
      maximum: PropTypes.number
    })
  }),
  values: PropTypes.shape({
    sigma: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  required: PropTypes.array.isRequired,
  errors: PropTypes.object
}

export default Blur
