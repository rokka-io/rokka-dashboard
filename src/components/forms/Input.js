import React, { PropTypes } from 'react'

const Input = ({ value, defaultValue, placeholder, disabled, ...attrs }) => {
  const val = disabled || !attrs.onChange
    ? (value || defaultValue)
    : value

  if (attrs.onChange) {
    attrs.value = val || ''
  } else {
    attrs.defaultValue = val
  }

  const ph = defaultValue
    ? `${placeholder || attrs.name || attrs.type} (default: ${defaultValue})`
    : placeholder

  return <input {...attrs} placeholder={ph} disabled={disabled || !attrs.onChange} />
}

Input.propTypes = {
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool
}

export default Input
