import React, { PureComponent, PropTypes } from 'react'
import Input from '../forms/Input'
import Select from '../forms/Select'
import FormGroup from '../forms/FormGroup'

class Resize extends PureComponent {
  isRequired (field) {
    return this.props.required.indexOf(field) !== -1
  }

  render () {
    const { defaults, values, errors = {} } = this.props

    const $upscaleOptions = defaults.upscale.values
    .map((option) => {
      return (
        <option key={option} value={option}>
          {option}
        </option>
      )
    })

    const $modeOptions = defaults.mode.values
    .map((option) => {
      return (
        <option key={option} value={option}>
          {option}
        </option>
      )
    })

    const $filterOptions = defaults.filter.values
    .map((option) => {
      return (
        <option key={option} value={option}>
          {option}
        </option>
      )
    })

    return (
      <div className="row">
        <div className="col-md-4">
          <FormGroup label="Width" required={this.isRequired('width')} error={errors.width}>
            <Input
              name="width"
              type="text"
              className="rka-input-txt"
              placeholder="width"
              value={values.width}
              defaultValue={defaults.width.default}
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
              value={values.height}
              defaultValue={defaults.height.default}
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
              onChange={this.props.onChange}>
              {$upscaleOptions}
            </Select>
          </FormGroup>
        </div>
        <div className="col-md-6">
          <FormGroup label="Mode" required={this.isRequired('mode')} error={errors.mode}>
            <Select
              name="mode"
              className="rka-select"
              value={values.mode}
              defaultValue={defaults.mode.default}
              onChange={this.props.onChange}>
              {$modeOptions}
            </Select>
          </FormGroup>
        </div>
        <div className="col-md-6">
          <FormGroup label="Filter" required={this.isRequired('filter')} error={errors.filter}>
            <Select
              name="filter"
              className="rka-select"
              value={values.filter}
              defaultValue={defaults.filter.default}
              onChange={this.props.onChange}>
              {$filterOptions}
            </Select>
          </FormGroup>
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
    mode: PropTypes.shape({
      values: PropTypes.array
    }),
    filter: PropTypes.shape({
      values: PropTypes.array
    })
  }),
  values: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
    upscale: PropTypes.string,
    mode: PropTypes.string,
    filter: PropTypes.string
  }),
  required: PropTypes.array.isRequired,
  errors: PropTypes.object
}

export default Resize
