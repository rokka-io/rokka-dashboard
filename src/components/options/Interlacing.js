import React, { Component, PropTypes } from 'react'
import Input from '../forms/Input'
import FormGroup from '../forms/FormGroup'

class Interlacing extends Component {
  render () {
    const $interlacingOptions = this.props.options.map((option) => {
      return (
        <label key={option} className="rka-checkbox is-disabled">
          <Input className="rka-checkbox-input" type="radio"
            name="interlacing.mode" value={option}
            disabled={!this.props.onChange}
            defaultChecked={this.props.value === option}
            onChange={this.props.onChange} />
          {option}
        </label>
      )
    })

    return (
      <FormGroup label="Interlacing mode">
        {$interlacingOptions}
      </FormGroup>
    )
  }
}

Interlacing.propTypes = {
  value: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func
}

export default Interlacing
