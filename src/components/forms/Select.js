import React, { PropTypes } from 'react'

const Select = ({ value, defaultValue, placeholder, disabled, children, ...attrs }) => {
  const ph = defaultValue
    ? `${placeholder || attrs.name || attrs.type} (default: ${defaultValue})`
    : placeholder

  const val = disabled || !attrs.onChange
    ? (value || defaultValue)
    : value

  return <select {...attrs} value={val} placeholder={ph} disabled={disabled || !attrs.onChange}>
    <option key="__default">{ph}</option>
    {children}
  </select>
}

Select.propTypes = {
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node
}

export default Select
