import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from '../forms/FormGroup'
import Input from '../forms/Input'

const BooleanStackOption = ({ label, name, value, definitions, required, onChange, error }) => {
  // default value may be null
  if (value === null) {
    value = false
  }

  return (
    <FormGroup label={label} htmlFor={name} error={error} required={required}>
      <Input
        name={name}
        id={name}
        defaultValue={definitions.default}
        type="checkbox"
        checked={value}
        onChange={onChange}
        className="rka-input-checkbox"
      />
    </FormGroup>
  )
}
BooleanStackOption.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  definitions: PropTypes.object.isRequired,
  required: PropTypes.bool,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default BooleanStackOption
