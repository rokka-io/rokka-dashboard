import PropTypes from 'prop-types'
import React from 'react'

const Input = ({ value, defaultValue, placeholder, disabled, ...props }) => {
  let val = disabled || !props.onChange ? value || defaultValue : value
  if (val === null || val === undefined) {
    val = ''
  }

  const ph = defaultValue
    ? `${placeholder || props.name || props.type || ''} (default: ${defaultValue})`
    : placeholder

  return <input {...props} value={val} placeholder={ph} disabled={disabled || !props.onChange} />
}

Input.propTypes = {
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  type: PropTypes.string,
  name: PropTypes.string
}

export default Input
