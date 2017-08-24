import React, { Component, PropTypes } from 'react'
import Input from '../forms/Input'
import FormGroup from '../forms/FormGroup'

class Interlacing extends Component {
  render () {
    const $interlacingOptions = this.props.options.map((option) => {
      const checked = this.props.value === option
      return (
        <label key={option} className="rka-checkbox is-disabled">
          <Input className="rka-checkbox-input" type="radio"
            name="interlacing.mode" value={option} checked={checked}
            disabled={!this.props.onChange}
            onChange={this.props.onChange} />
          {option}
        </label>
      )
    })

    return (
      <FormGroup label="Interlacing mode" error={this.props.error}>
        {$interlacingOptions}
      </FormGroup>
    )
  }
}

Interlacing.propTypes = {
  value: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default Interlacing
