import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from '../forms/FormGroup'
import InputRange from '../forms/InputRange'

const RangeStackOption = ({ label, name, value, definitions, required, onChange, error }) => {
  // default value may be null
  if (value === null) {
    value = ''
  }
  const step = definitions.type === 'number' ? 0.1 : 1

  return (
    <FormGroup label={label} error={error} required={required}>
      <InputRange
        onChange={onChange}
        defaultValue={definitions.default}
        min={definitions.minimum}
        max={definitions.maximum}
        step={step}
        name={name}
        value={value}
      />
    </FormGroup>
  )
}
RangeStackOption.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  definitions: PropTypes.object.isRequired,
  required: PropTypes.bool,
  value: PropTypes.number,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default RangeStackOption
