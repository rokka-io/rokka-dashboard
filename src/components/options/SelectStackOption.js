import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from '../forms/FormGroup'
import Select from '../forms/Select'

const SelectStackOption = ({ name, value, definitions, onChange, error }) => {
  // default value may be null
  if (value === null) {
    value = ''
  }
  return (
    <FormGroup label={name} htmlFor={name} error={error}>
      <Select name={name} id={name} value={value} className="rka-select" onChange={onChange}>
        {definitions.values.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </FormGroup>
  )
}
SelectStackOption.propTypes = {
  name: PropTypes.string.isRequired,
  definitions: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default SelectStackOption
