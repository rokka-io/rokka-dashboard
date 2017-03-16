import React, { Component, PropTypes } from 'react'
import InputRange from '../forms/InputRange'
import FormGroup from '../forms/FormGroup'

class Quality extends Component {
  render () {
    return (
      <FormGroup label="Image quality">
        <InputRange min={0} max={100} value={this.props.value} />
      </FormGroup>
    )
  }
}

Quality.propTypes = {
  value: PropTypes.string
}

export default Quality
