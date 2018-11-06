import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from '../forms/FormGroup'
import Input from '../forms/Input'

const ArrayStringStackOption = ({ name, value, definitions, onChange, error }) => {
  // default value may be null
  if (value === null) {
    value = ''
  } else {
    value = value.join(',')
  }
  const placeholder = onChange ? 'Comma-separated value' : null
  return (
    <FormGroup label={name} htmlFor={name} error={error}>
      <Input
        name={name}
        id={name}
        className="rka-input-txt"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </FormGroup>
  )
}
ArrayStringStackOption.propTypes = {
  name: PropTypes.string.isRequired,
  definitions: PropTypes.object.isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default ArrayStringStackOption
