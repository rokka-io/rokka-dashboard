import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Select from 'react-select'
import FormGroup from '../forms/FormGroup'

class BaseStack extends Component {
  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  onChange (selectedOption) {
    this.props.onChange({name: 'basestack', value: selectedOption.value})
  }

  render () {
    if (!this.props.onChange) {
      if (!this.props.value) {
        return null
      }
      return (
        <FormGroup label="Base Stack">
          <Link to={`/stacks/${this.props.value}`} className="rka-link">{this.props.value}</Link>
        </FormGroup>
      )
    }

    if (!this.props.stacks.items) {
      return null
    }

    const options = this.props.stacks.items.map(item => {
      return {
        value: item.name,
        label: item.name
      }
    })
    return (
      <FormGroup label="Base Stack" classname="mb-n">
        <Select
          name="basestack"
          placeholder="Enter base stack, default: no base stack used"
          value={this.props.value}
          onChange={this.onChange}
          options={options}
        />
      </FormGroup>
    )
  }
}

BaseStack.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  stacks: PropTypes.object
}

export default BaseStack
