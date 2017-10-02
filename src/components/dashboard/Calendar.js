import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import DatePicker from '@jetbrains/ring-ui/components/date-picker/date-picker'

class Calendar extends PureComponent {
  render () {
    const { onRangeChange, from, to } = this.props
    return (
      <div className="height-smaller flo-r pos-r">
        <DatePicker from={from} to={to} onChange={onRangeChange} />
      </div>
    )
  }
}

Calendar.propTypes = {
  onRangeChange: PropTypes.func.isRequired,
  from: PropTypes.object.isRequired,
  to: PropTypes.object.isRequired
}

export default Calendar
