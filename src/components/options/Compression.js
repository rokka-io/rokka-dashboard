import React, { Component, PropTypes } from 'react'
import InputRange from '../forms/InputRange'
import FormGroup from '../forms/FormGroup'

class Compression extends Component {
  render () {
    return (
      <FormGroup label="Image compression">
        <InputRange onChange={this.props.onChange}
          min={this.props.min} max={this.props.max}
          name="png.compression_level" value={this.props.value}
        />
      </FormGroup>
    )
  }
}

Compression.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func
}

export default Compression
