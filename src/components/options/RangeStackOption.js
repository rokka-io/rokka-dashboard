import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from '../forms/FormGroup'
import InputRange from '../forms/InputRange'

const RangeStackOption = ({ name, value, definitions, onChange, error }) => {
  // default value may be null
  if (value === null) {
    value = ''
  }
  return (
    <FormGroup label={name} error={error}>
      <InputRange
        onChange={onChange}
        min={definitions.minimum}
        max={definitions.maximum}
        name={name}
        value={value}
      />
    </FormGroup>
  )
}
RangeStackOption.propTypes = {
  name: PropTypes.string.isRequired,
  definitions: PropTypes.object.isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default RangeStackOption
