import React, { Component, PropTypes } from 'react'
import InputRange from '../forms/InputRange'
import FormGroup from '../forms/FormGroup'

class Quality extends Component {
  render () {
    return (
      <FormGroup label="Image quality">
        <InputRange onChange={this.props.onChange}
          min={this.props.min} max={this.props.max}
          name="jpg.quality" value={this.props.value}
        />
      </FormGroup>
    )
  }
}

Quality.propTypes = {
  value: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func

}

export default Quality
