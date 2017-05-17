import React, { Component, PropTypes } from 'react'
import InputColor from '../forms/InputColor'
import InputRange from '../forms/InputRange'
import FormGroup from '../forms/FormGroup'

class Rotate extends Component {
  isRequired (field) {
    return this.props.required.indexOf(field) !== -1
  }

  render () {
    const { defaults, values, errors = {} } = this.props

    return (
      <div className="row">
        <div className="col-md-12">
          <FormGroup label="Angle" required={this.isRequired('angle')} error={errors.angle}>
            <InputRange name="angle" min={defaults.angle.minimum} max={defaults.angle.maximum}
              value={values.angle} defaultValue={defaults.angle.default} onChange={this.props.onChange} />
          </FormGroup>
        </div>
        <div className="col-md-6">
          <FormGroup label="Background color" required={this.isRequired('background_color')} error={errors.color}>
            <InputColor name="background_color" value={values.background_color || '000000'}
              onChange={this.props.onChange} />
          </FormGroup>
        </div>
        <div className="col-md-6">
          <FormGroup label="Background opacity" required={this.isRequired('background_opacity')} error={errors.background_opacity}>
            <InputRange
              name="background_opacity"
              min={defaults.background_opacity.minimum}
              max={defaults.background_opacity.maximum}
              value={values.background_opacity}
              defaultValue={defaults.background_opacity.default}
              onChange={this.props.onChange}
            />
          </FormGroup>
        </div>
      </div>
    )
  }
}

Rotate.propTypes = {
  onChange: PropTypes.func,
  defaults: PropTypes.shape({
    angle: PropTypes.shape({
      minimum: PropTypes.number,
      maximum: PropTypes.number
    })
  }),
  values: PropTypes.shape({
    angle: PropTypes.string,
    background_color: PropTypes.string,
    background_opacity: PropTypes.string
  }),
  required: PropTypes.array.isRequired,
  errors: PropTypes.object
}

export default Rotate
