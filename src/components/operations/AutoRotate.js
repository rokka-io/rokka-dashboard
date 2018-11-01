import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import Input from '../forms/Input'
import Select from '../forms/Select'
import FormGroup from '../forms/FormGroup'

class AutoRotate extends PureComponent {
  isRequired(field) {
    return this.props.required.indexOf(field) !== -1
  }

  render() {
    const { defaults, values, errors = {} } = this.props

    const $rotationDirectionOptions = defaults.rotation_direction.values.map(option => {
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
          <FormGroup
            label="Rotation direction"
            required={this.isRequired('rotation_direction')}
            error={errors.rotation_direction}
          >
            <Select
              name="rotation_direction"
              className="rka-select"
              value={values.rotation_direction}
              defaultValue={defaults.rotation_direction.default}
              onChange={this.props.onChange}
            >
              {$rotationDirectionOptions}
            </Select>
          </FormGroup>
        </div>
      </div>
    )
  }
}

AutoRotate.propTypes = {
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
    rotation_direction: PropTypes.shape({
      values: PropTypes.array
    })
  }),
  values: PropTypes.shape({
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    rotation_direction: PropTypes.string
  }),
  required: PropTypes.array.isRequired,
  errors: PropTypes.object
}

export default AutoRotate
