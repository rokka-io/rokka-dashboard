import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from '../forms/FormGroup'
import InputColor from '../forms/InputColor'

const ColorStackOption = ({ label, name, value, definitions, required, onChange, error }) => {
  // default value may be null
  if (value === null) {
    value = ''
  }
  return (
    <FormGroup label={label} htmlFor={name} error={error} required={required}>
      <InputColor
        name={name}
        id={name}
        value={value}
        defaultValue={definitions.default}
        onChange={onChange}
      />
    </FormGroup>
  )
}
ColorStackOption.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  definitions: PropTypes.object.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default ColorStackOption
