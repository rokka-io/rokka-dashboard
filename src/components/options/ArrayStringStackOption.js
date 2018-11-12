import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from '../forms/FormGroup'
import Input from '../forms/Input'

const ArrayStringStackOption = ({ label, name, value, definitions, required, onChange, error }) => {
  // default value may be null
  if (value === null) {
    value = ''
  } else {
    value = value.join(',')
  }
  const placeholder = onChange ? 'Comma-separated value' : null
  return (
    <FormGroup label={label} htmlFor={name} error={error} required={required}>
      <Input
        name={name}
        id={name}
        className="rka-input-txt"
        value={value}
        defaultValue={definitions.default}
        onChange={onChange}
        placeholder={placeholder}
      />
    </FormGroup>
  )
}
ArrayStringStackOption.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  definitions: PropTypes.object.isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  required: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default ArrayStringStackOption
