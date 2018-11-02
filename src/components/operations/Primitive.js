import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import InputRange from '../forms/InputRange'
import FormGroup from '../forms/FormGroup'

class Primitive extends PureComponent {
  render() {
    const { defaults, values, errors = {} } = this.props

    return (
      <div className="row">
        <div className="col-md-6">
          <FormGroup label="Count" error={errors.count}>
            <InputRange
              name="count"
              min={defaults.count.minimum}
              max={defaults.count.maximum}
              value={values.count}
              defaultValue={defaults.count.default}
              onChange={this.props.onChange}
            />
          </FormGroup>
        </div>
        <div className="col-md-6">
          <FormGroup label="Mode" error={errors.mode}>
            <InputRange
              name="mode"
              min={defaults.mode.minimum}
              max={defaults.mode.maximum}
              value={values.mode}
              defaultValue={defaults.mode.default}
              onChange={this.props.onChange}
            />
          </FormGroup>
        </div>
      </div>
    )
  }
}

Primitive.propTypes = {
  onChange: PropTypes.func,
  defaults: PropTypes.shape({
    count: PropTypes.shape({
      minimum: PropTypes.number,
      maximum: PropTypes.number
    }),
    mode: PropTypes.shape({
      minimum: PropTypes.number,
      maximum: PropTypes.number
    })
  }),
  values: PropTypes.shape({
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    mode: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  errors: PropTypes.object
}

export default Primitive
