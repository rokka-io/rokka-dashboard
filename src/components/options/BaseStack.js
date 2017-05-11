import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Input from '../forms/Input'
import FormGroup from '../forms/FormGroup'

class BaseStack extends Component {
  render () {
    if (!this.props.onChange) {
      return (
        <FormGroup label="Base Stack">
          <Link to={`/stacks/${this.props.value}`} className="rka-link">{this.props.value}</Link>
        </FormGroup>
      )
    }
    return (
      <FormGroup label="Base Stack">
        <Input
          name="basestack"
          type="text"
          className="rka-input-txt"
          placeholder="Enter base stack, default: no base stack used"
          minLength={this.props.minLength}
          value={this.props.value}
          onChange={this.props.onChange} />
      </FormGroup>
    )
  }
}

BaseStack.propTypes = {
  value: PropTypes.string,
  minLength: PropTypes.number,
  onChange: PropTypes.func
}

export default BaseStack
