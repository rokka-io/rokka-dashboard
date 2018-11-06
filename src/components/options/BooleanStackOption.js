import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from '../forms/FormGroup'
import Input from '../forms/Input'

const BooleanStackOption = ({ name, value, definitions, onChange, error }) => {
  // default value may be null
  if (value === null) {
    value = false
  }

  return (
    <FormGroup label={name} htmlFor={name} error={error}>
      <Input
        name={name}
        id={name}
        type="checkbox"
        checked={value}
        onChange={onChange}
        className="rka-input-checkbox"
      />
    </FormGroup>
  )
}
BooleanStackOption.propTypes = {
  name: PropTypes.string.isRequired,
  definitions: PropTypes.object.isRequired,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default BooleanStackOption
