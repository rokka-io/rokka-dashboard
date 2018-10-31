import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { styles } from '../forms/ReactSelect'
import FormGroup from '../forms/FormGroup'

class BaseStack extends PureComponent {
  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  onChange (selectedOption) {
    this.props.onChange({name: 'basestack', value: selectedOption.value})
  }

  render () {
    const { onChange, value, stacks = {}, error } = this.props

    if (!onChange) {
      if (!value) {
        return null
      }
      return (
        <FormGroup label="Base Stack">
          <Link to={`/stacks/${value}`} className="rka-link">{value}</Link>
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
      <FormGroup label="Base Stack" className="mb-n" error={error}>
        <Select
          name="basestack"
          placeholder="Enter base stack, default: no base stack used"
          value={options.filter(( { value: v }) => value === v)}
          onChange={this.onChange}
          options={options}
          styles={styles}
        />
      </FormGroup>
    )
  }
}

BaseStack.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  stacks: PropTypes.object,
  error: PropTypes.string
}

export default BaseStack
