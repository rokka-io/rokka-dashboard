import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from '../forms/FormGroup'
import Input from '../forms/Input'

const StringStackOption = ({ label, name, value, definitions, required, onChange, error }) => {
  // default value may be null
  if (value === null || value === undefined) {
    value = ''
  }

  return (
    <FormGroup label={label} htmlFor={name} error={error} required={required}>
      <Input
        type="text"
        name={name}
        id={name}
        defaultValue={definitions.default}
        placeholder={
          definitions.description && definitions.description.length && onChange
            ? definitions.description
            : definitions.name
        }
        className="rka-input-txt"
        value={value}
        onChange={onChange}
      />
    </FormGroup>
  )
}
StringStackOption.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  definitions: PropTypes.object.isRequired,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default StringStackOption
