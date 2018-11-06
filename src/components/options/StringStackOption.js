import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from '../forms/FormGroup'
import Input from '../forms/Input'

const StringStackOption = ({ name, value, definitions, onChange, error }) => {
  // default value may be null
  if (value === null) {
    value = ''
  }
  return (
    <FormGroup label={name} htmlFor={name} error={error}>
      <Input name={name} id={name} className="rka-input-txt" value={value} onChange={onChange} />
    </FormGroup>
  )
}
StringStackOption.propTypes = {
  name: PropTypes.string.isRequired,
  definitions: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default StringStackOption
