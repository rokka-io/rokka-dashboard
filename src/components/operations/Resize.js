import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import Input from '../forms/Input'
import Select from '../forms/Select'
import FormGroup from '../forms/FormGroup'

class Resize extends PureComponent {
  isRequired(field) {
    return this.props.required.indexOf(field) !== -1
  }

  render() {
    const { defaults, values, errors = {} } = this.props

    const boolValues = ['true', 'false']
    const $upscaleOptions = boolValues.map(option => {
      return (
        <option key={option} value={option}>
          {option}
        </option>
      )
    })

    const $upscaleDPROptions = boolValues.map(option => {
      return (
        <option key={option} value={option}>
          {option}
        </option>
      )
    })

    const $modeOptions = defaults.mode.values.map(option => {
      return (
        <option key={option} value={option}>
          {option}
        </option>
      )
    })

    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <FormGroup label="Width" required={this.isRequired('width')} error={errors.width}>
              <Input
                name="width"
                type="text"
                className="rka-input-txt"
                placeholder="width"
                value={values.width || ''}
                defaultValue={defaults.width.default || ''}
                onChange={this.props.onChange}
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup label="Height" required={this.isRequired('height')} error={errors.height}>
              <Input
                name="height"
                type="text"
                className="rka-input-txt"
                placeholder="height"
                value={values.height || ''}
                defaultValue={defaults.height.default || ''}
                onChange={this.props.onChange}
              />
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup label="Upscale" required={this.isRequired('upscale')} error={errors.upscale}>
              <Select
                name="upscale"
                className="rka-select"
                value={values.upscale}
                defaultValue={defaults.upscale.default}
                onChange={this.props.onChange}
              >
                {$upscaleOptions}
              </Select>
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <FormGroup
              label="Upscale DPR"
              required={this.isRequired('upscale_dpr')}
              error={errors.upscale_dpr}
            >
              <Select
                name="upscale_dpr"
                className="rka-select"
                value={values.upscale_dpr}
                defaultValue={defaults.upscale_dpr.default}
                onChange={this.props.onChange}
              >
                {$upscaleDPROptions}
              </Select>
            </FormGroup>
          </div>
          <div className="col-md-4">
            <FormGroup label="Mode" required={this.isRequired('mode')} error={errors.mode}>
              <Select
                name="mode"
                className="rka-select"
                value={values.mode}
                defaultValue={defaults.mode.default}
                onChange={this.props.onChange}
              >
                {$modeOptions}
              </Select>
            </FormGroup>
          </div>
        </div>
      </div>
    )
  }
}

Resize.propTypes = {
  onChange: PropTypes.func,
  defaults: PropTypes.shape({
    width: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number
    }),
    height: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number
    }),
    upscale: PropTypes.shape({
      values: PropTypes.array
    }),
    upscale_dpr: PropTypes.shape({
      values: PropTypes.array
    }),
    mode: PropTypes.shape({
      values: PropTypes.array
    })
  }),
  values: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    upscale: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    upscale_dpr: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    mode: PropTypes.string
  }),
  required: PropTypes.array.isRequired,
  errors: PropTypes.object
}

export default Resize
