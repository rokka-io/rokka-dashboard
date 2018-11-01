import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import InputRange from '../forms/InputRange'
import FormGroup from '../forms/FormGroup'

class Compression extends PureComponent {
  render() {
    const { onChange, min, max, value, error } = this.props

    return (
      <FormGroup label="PNG Image compression" error={error}>
        <InputRange
          onChange={onChange}
          min={min}
          max={max}
          name="png.compression_level"
          value={value}
        />
      </FormGroup>
    )
  }
}

Compression.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default Compression
