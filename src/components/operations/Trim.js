import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import InputRange from '../forms/InputRange.js'
import FormGroup from '../forms/FormGroup'

class Trim extends PureComponent {
  isRequired (field) {
    return this.props.required.indexOf(field) !== -1
  }

  render () {
    const { defaults, values, errors = {} } = this.props

    return (
      <FormGroup label="Fuzzy" required={this.isRequired('fuzzy')} error={errors.fuzzy}>
        <InputRange
          name="fuzzy"
          min={defaults.fuzzy.minimum}
          max={defaults.fuzzy.maximum}
          value={values.fuzzy}
          defaultValue={defaults.fuzzy.default}
          onChange={this.props.onChange}
        />
      </FormGroup>
    )
  }
}

Trim.propTypes = {
  onChange: PropTypes.func,
  defaults: PropTypes.shape({
    fuzzy: PropTypes.shape({
      minimum: PropTypes.number,
      maximum: PropTypes.number
    })
  }),
  values: PropTypes.shape({
    fuzzy: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  required: PropTypes.array.isRequired,
  errors: PropTypes.object
}

export default Trim
