import React from 'react'
import BaseStack from './BaseStack'
import SelectStackOption from './SelectStackOption'
import BooleanStackOption from './BooleanStackOption'
import RangeStackOption from './RangeStackOption'
import StringStackOption from './StringStackOption'
import PropTypes from 'prop-types'
import ArrayStringStackOption from './ArrayStringStackOption'
import ColorStackOption from './ColorStackOption'
import { readableInputLabel } from '../../utils/string'

/**
 * Creates stack options based the definition from the /stackoptions API call.
 *
 * @param {string}   name           Current option name/key
 * @param {{}}       options        Options to display
 * @param {{}}       defaultOptions Options definitions
 * @param {[]}       [stacks]       List of stacks for basestack select
 * @param {Function} [onChange]     Callback when options change.
 * @returns {React.Component}
 */
const StackOption = ({ name, options, defaultOptions, stacks, onChange }) => {
  const definitions = defaultOptions[name]
  const setOption = options[name]
  const value = setOption ? setOption.value : definitions.default
  const error = setOption.error || null

  const optionProps = {
    label: readableInputLabel(name),
    name,
    value,
    definitions,
    onChange,
    error
  }

  if (name === 'basestack') {
    return <BaseStack {...optionProps} stacks={stacks} />
  }
  if (name.includes('color')) {
    return <ColorStackOption {...optionProps} />
  }

  if (Array.isArray(definitions.values)) {
    return <SelectStackOption {...optionProps} />
  }

  const typ = Array.isArray(definitions.type)
    ? definitions.type.filter(t => t !== 'null')[0]
    : definitions.type

  switch (typ) {
    case 'boolean':
      return <BooleanStackOption {...optionProps} />
    case 'integer':
    case 'number':
      return <RangeStackOption {...optionProps} />
    case 'array':
      return <ArrayStringStackOption {...optionProps} />
    default:
      return <StringStackOption {...optionProps} />
  }
}
StackOption.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  defaultOptions: PropTypes.object.isRequired,
  stacks: PropTypes.object,
  onChange: PropTypes.func
}

export default StackOption
