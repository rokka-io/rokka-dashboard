import React from 'react'
import PropTypes from 'prop-types'
import FormGroup from '../forms/FormGroup'
import Select from '../forms/Select'

const SelectStackOption = ({ label, name, value, definitions, required, onChange, error }) => {
  // default value may be null
  if (value === null) {
    value = ''
  }
  return (
    <FormGroup label={label} htmlFor={name} error={error} required={required}>
      <Select
        name={name}
        id={name}
        value={value}
        defaultValue={definitions.default}
        className="rka-select"
        onChange={onChange}
      >
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
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  definitions: PropTypes.object.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default SelectStackOption
