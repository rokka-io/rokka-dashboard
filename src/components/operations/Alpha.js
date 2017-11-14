import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Select from '../forms/Select'
import FormGroup from '../forms/FormGroup'

class Alpha extends Component {
  isRequired (field) {
    return this.props.required.indexOf(field) !== -1
  }

  render () {
    const { defaults, values, errors = {} } = this.props

    console.log(defaults, values, errors)
    const $alphaModeOptions = defaults.mode.values
      .map((option) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        )
      })

    return (
      <div className="row">
        <div className="col-md-6">
          <FormGroup label="Alpha mode" required={this.isRequired('alpha')}
            error={errors.mode}>
            <Select
              name="mode"
              className="rka-select"
              value={values.mode}
              defaultValue={defaults.mode.default}
              onChange={this.props.onChange}>
              {$alphaModeOptions}
            </Select>
          </FormGroup>
        </div>
      </div>
    )
  }
}

Alpha.propTypes = {
  onChange: PropTypes.func,
  defaults: PropTypes.shape({
    mode: PropTypes.shape({
      values: PropTypes.array
    })
  }),
  values: PropTypes.shape({
    rotation_direction: PropTypes.string
  }),
  required: PropTypes.array.isRequired,
  errors: PropTypes.object
}

export default Alpha
