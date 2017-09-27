import PropTypes from 'prop-types'
import React, { Component } from 'react'
import InputRange from '../forms/InputRange'
import InputColor from '../forms/InputColor'
import FormGroup from '../forms/FormGroup'

class Dropshadow extends Component {
  isRequired (field) {
    return this.props.required.indexOf(field) !== -1
  }

  render () {
    const { defaults, values, errors = {} } = this.props

    return (
      <div className="row">
        <div className="col-md-4">
          <FormGroup label="Horizontal" required={this.isRequired('horizontal')} error={errors.horizontal}>
            <InputRange name="horizontal" min={defaults.horizontal.minimum} max={defaults.horizontal.maximum}
              value={values.horizontal} defaultValue={defaults.horizontal.default} onChange={this.props.onChange} />
          </FormGroup>
        </div>
        <div className="col-md-4">
          <FormGroup label="Vertical" required={this.isRequired('vertical')} error={errors.vertical}>
            <InputRange name="vertical" min={defaults.vertical.minimum} max={defaults.vertical.maximum}
              value={values.vertical} defaultValue={defaults.vertical.default} onChange={this.props.onChange} />
          </FormGroup>
        </div>
        <div className="col-md-4">
          <FormGroup label="Opacity" required={this.isRequired('opacity')} error={errors.opacity}>
            <InputRange name="opacity" min={defaults.opacity.minimum} max={defaults.opacity.maximum}
              value={values.opacity} defaultValue={defaults.opacity.default} onChange={this.props.onChange} />
          </FormGroup>
        </div>
        <div className="col-md-4">
          <FormGroup label="Color" required={this.isRequired('color')} error={errors.color}>
            <InputColor name="color" value={values.color} defaultValue={defaults.color.default} onChange={this.props.onChange} />
          </FormGroup>
        </div>
        <div className="col-md-4">
          <FormGroup label="Blur radius" required={this.isRequired('blur_radius')} error={errors.blur_radius}>
            <InputRange name="blur_radius" min={defaults.blur_radius.minimum} max={defaults.blur_radius.maximum}
              value={values.blur_radius} defaultValue={defaults.blur_radius.default} onChange={this.props.onChange} />
          </FormGroup>
        </div>
        <div className="col-md-4">
          <FormGroup label="Sigma" required={this.isRequired('sigma')} error={errors.sigma}>
            <InputRange name="sigma" min={defaults.sigma.minimum} max={defaults.sigma.maximum}
              value={values.sigma} defaultValue={defaults.sigma.default} onChange={this.props.onChange} />
          </FormGroup>
        </div>
      </div>
    )
  }
}

Dropshadow.propTypes = {
  onChange: PropTypes.func,
  defaults: PropTypes.shape({
    horizontal: PropTypes.shape({
      minimum: PropTypes.number,
      maximum: PropTypes.number
    }),
    vertical: PropTypes.shape({
      minimum: PropTypes.number,
      maximum: PropTypes.number
    }),
    opacity: PropTypes.shape({
      minimum: PropTypes.number,
      maximum: PropTypes.number
    }),
    sigma: PropTypes.shape({
      minimum: PropTypes.number,
      maximum: PropTypes.number
    }),
    blur_radius: PropTypes.shape({
      minimum: PropTypes.number,
      maximum: PropTypes.number
    })
  }),
  values: PropTypes.shape({
    horizontal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    vertical: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    opacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sigma: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    blur_radius: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  required: PropTypes.array.isRequired,
  errors: PropTypes.object
}

export default Dropshadow
