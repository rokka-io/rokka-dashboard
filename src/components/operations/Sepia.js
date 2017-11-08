import PropTypes from 'prop-types'
import React, { Component } from 'react'
import InputRange from '../forms/InputRange.js'
import FormGroup from '../forms/FormGroup'

class Sepia extends Component {
  isRequired (field) {
    return this.props.required.indexOf(field) !== -1
  }

  render () {
    const { defaults, values, errors = {} } = this.props

    return (
      <FormGroup label="Threshold" required={this.isRequired('threshold')} error={errors.threshold}>
        <InputRange
          name="threshold"
          min={defaults.threshold.minimum}
          max={defaults.threshold.maximum}
          value={values.threshold}
          defaultValue={defaults.threshold.default}
          onChange={this.props.onChange}
        />
      </FormGroup>
    )
  }
}

Sepia.propTypes = {
  onChange: PropTypes.func,
  defaults: PropTypes.shape({
    fuzzy: PropTypes.shape({
      minimum: PropTypes.number,
      maximum: PropTypes.number
    })
  }),
  values: PropTypes.shape({
    fuzzy: PropTypes.string
  }),
  required: PropTypes.array.isRequired,
  errors: PropTypes.object
}

export default Sepia
