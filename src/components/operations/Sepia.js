import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import InputRange from '../forms/InputRange.js'
import FormGroup from '../forms/FormGroup'

class Sepia extends PureComponent {
  render () {
    const { values } = this.props

    /* threshold is deprecated - remove check and FormGroup code after 2018-06-01 */
    if (this.props.onChange || !values.threshold) {
      return null
    }

    return (
      <FormGroup label="Threshold">
        <InputRange
          name="threshold"
          min={0}
          max={100}
          value={values.threshold}
          defaultValue={80}
        />
      </FormGroup>
    )
  }
}

Sepia.propTypes = {
  onChange: PropTypes.func,
  // threshold is deprecated, remove after 2018-06-01
  values: PropTypes.shape({
    threshold: PropTypes.string
  })
}

export default Sepia
