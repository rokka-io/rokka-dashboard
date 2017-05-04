import React, { Component, PropTypes } from 'react'
import InputRange from '../forms/InputRange'
import FormGroup from '../forms/FormGroup'

class Compression extends Component {
  render () {
    return (
      <FormGroup label="Image compression">
        <InputRange onChange={this.props.onChange} min={0} max={9} name="png.compression_level" value={this.props.value} />
      </FormGroup>
    )
  }
}

Compression.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default Compression
