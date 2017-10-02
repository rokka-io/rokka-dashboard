import PropTypes from 'prop-types'
import React from 'react'

const Select = ({ value, defaultValue, placeholder, disabled, children, ...props }) => {
  const ph = defaultValue
    ? `${placeholder || props.name || props.type || ''} (default: ${defaultValue})`
    : placeholder

  const val = disabled || !props.onChange
    ? (value || defaultValue)
    : value

  return <select {...props} value={val} placeholder={ph} disabled={disabled || !props.onChange}>
    <option key="__default">{ph}</option>
    {children}
  </select>
}

Select.propTypes = {
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  onChange: PropTypes.func,
  type: PropTypes.string,
  name: PropTypes.string
}

export default Select
