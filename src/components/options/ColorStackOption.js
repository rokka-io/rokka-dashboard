import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from '../forms/FormGroup'
import InputColor from '../forms/InputColor'

const ColorStackOption = ({ name, value, definitions, onChange, error }) => {
  // default value may be null
  if (value === null) {
    value = ''
  }
  return (
    <FormGroup label={name} htmlFor={name} error={error}>
      <InputColor name={name} id={name} value={value} onChange={onChange} />
    </FormGroup>
  )
}
ColorStackOption.propTypes = {
  name: PropTypes.string.isRequired,
  definitions: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default ColorStackOption
