import React, { PureComponent, PropTypes } from 'react'
import Input from '../forms/Input'
import InputColor from '../forms/InputColor'
import Select from '../forms/Select'
import InputRange from '../forms/InputRange'
import FormGroup from '../forms/FormGroup'

class Composition extends PureComponent {
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
              value={values.width} defaultValue={defaults.width.default} onChange={this.props.onChange} />
          </FormGroup>
        </div>
        <div className="col-md-6">
          <FormGroup label="Height" required={this.isRequired('height')} error={errors.height}>
            <InputRange name="height" min={defaults.height.minimum} max={defaults.height.maximum}
              value={values.height} defaultValue={defaults.height.default} onChange={this.props.onChange} />
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
              {defaults.mode.values.map(option => <option key={option} value={option}>{option}</option>)}
            </Select>
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
        <div className="col-md-6">
          <FormGroup label="Secondary Color" required={this.isRequired('secondary_color')} error={errors.color}>
            <InputColor name="secondary_color" value={values.secondary_color || defaults.secondary_color.default}
              onChange={this.props.onChange} />
          </FormGroup>
        </div>
        <div className="col-md-6">
          <FormGroup label="Secondary opacity" required={this.isRequired('secondary_opacity')} error={errors.secondary_opacity}>
            <InputRange name="secondary_opacity" min={defaults.secondary_opacity.minimum} max={defaults.secondary_opacity.maximum}
              value={values.secondary_opacity} defaultValue={defaults.secondary_opacity.default} onChange={this.props.onChange} />
          </FormGroup>
        </div>
      </div>
    )
  }
}

Composition.propTypes = {
  onChange: PropTypes.func,
  defaults: PropTypes.shape({
    mode: PropTypes.shape({
      values: PropTypes.array
    }),
    width: PropTypes.shape({
      minimum: PropTypes.number,
      maximum: PropTypes.number
    }),
    height: PropTypes.shape({
      minimum: PropTypes.number,
      maximum: PropTypes.number
    }),
    anchor: PropTypes.shape({
      default: PropTypes.string
    }),
    secondary_color: PropTypes.shape({
      default: PropTypes.string
    }),
    secondary_opacity: PropTypes.shape({
      minimum: PropTypes.number,
      maximum: PropTypes.number
    })
  }),
  values: PropTypes.shape({
    mode: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    anchor: PropTypes.string,
    secondary_color: PropTypes.string,
    secondary_opacity: PropTypes.string
  }),
  required: PropTypes.array.isRequired,
  errors: PropTypes.object
}

export default Composition
