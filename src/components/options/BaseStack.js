import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { styles } from '../forms/ReactSelect'
import FormGroup from '../forms/FormGroup'

const BaseStack = ({ name, value, definitions, stacks = {}, onChange, error }) => {
  if (!onChange) {
    if (!value) {
      return null
    }
    return (
      <FormGroup label="Base Stack">
        <Link to={`/stacks/${value}`} className="rka-link">
          {value}
        </Link>
      </FormGroup>
    )
  }

  if (!stacks.items) {
    return null
  }

  const options = stacks.items.map(item => {
    return {
      value: item.name,
      label: item.name
    }
  })
  return (
    <FormGroup label="Base Stack" className="mb-md" error={error}>
      <Select
        name="basestack"
        placeholder="Enter base stack"
        value={options.filter(({ value: v }) => value === v)}
        onChange={({ value }) => onChange({ name: 'basestack', value })}
        options={options}
        styles={styles}
      />
    </FormGroup>
  )
}
BaseStack.propTypes = {
  name: PropTypes.string.isRequired,
  definitions: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  stacks: PropTypes.object
}

export default BaseStack
