import React, { Component, PropTypes } from 'react'
import Input from '../forms/Input'
import FormGroup from '../forms/FormGroup'

class Interlacing extends Component {
  render () {
    const INTERLACING_OPTIONS = ['none', 'line', 'plane', 'partition']

    const $interlacingOptions = INTERLACING_OPTIONS
    .map((option) => {
      return (
        <label key={option} className="rka-checkbox is-disabled">
          <Input className="rka-checkbox-input" type="radio" name="interlacing.mode" value={option}
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
  onChange: PropTypes.func

}

export default Interlacing
