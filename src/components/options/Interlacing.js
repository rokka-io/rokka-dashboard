import React, { Component, PropTypes } from 'react'
import Input from '../forms/Input'
import FormGroup from '../forms/FormGroup'

class Interlacing extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: this.props.value
    }
  }

  onChange (e) {
    this.setState({
      value: e.currentTarget.value
    })
  }

  render () {
    const INTERLACING_OPTIONS = ['none', 'line', 'plane', 'partition']

    const $interlacingOptions = INTERLACING_OPTIONS
    .map((option) => {
      return (
        <label key={option} className="rka-checkbox is-disabled">
          <Input className="rka-checkbox-input" type="radio" name="interlacing-mode" value={option}
            disabled
            defaultChecked={this.state.value === option}
            onChange={(e) => this.onChange(e)} />
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
  value: PropTypes.string
}

export default Interlacing
