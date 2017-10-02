import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Input from '../forms/Input'
import InputRange from '../forms/InputRange'
import FormGroup from '../forms/FormGroup'

class Crop extends Component {
  isRequired (field) {
    return this.props.required.indexOf(field) !== -1
  }

  render () {
    const { defaults, values, errors = {} } = this.props

    return (
      <div className="row">
        <div className="col-md-6">
          <FormGroup label="Width" required={this.isRequired('width')} error={errors.width}>
            <InputRange name="width" min={defaults.width.minimum} max={defaults.width.maximum}
              value={values.width} defaultValue={defaults.width.value} onChange={this.props.onChange} />
          </FormGroup>
        </div>
        <div className="col-md-6">
          <FormGroup label="Height" required={this.isRequired('height')} error={errors.height}>
            <InputRange name="height" min={defaults.height.minimum} max={defaults.height.maximum}
              value={values.height} defaultValue={defaults.height.value} onChange={this.props.onChange} />
          </FormGroup>
        </div>
        <div className="col-md-6">
          <FormGroup label="Anchor" required={this.isRequired('anchor')} error={errors.anchor}>
            <Input
              name="anchor"
              type="text"
              className="rka-input-txt"
              placeholder="Anchor"
              defaultValue={defaults.anchor.default}
              value={values.anchor}
              onChange={this.props.onChange}
            />
          </FormGroup>
        </div>
      </div>
    )
  }
}

Crop.propTypes = {
  onChange: PropTypes.func,
  defaults: PropTypes.shape({
    width: PropTypes.shape({
      minimum: PropTypes.number,
      maximum: PropTypes.number
    }),
    height: PropTypes.shape({
      minimum: PropTypes.number,
      maximum: PropTypes.number
    })
  }),
  values: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    anchor: PropTypes.string
  }),
  required: PropTypes.array.isRequired,
  errors: PropTypes.object
}

export default Crop
