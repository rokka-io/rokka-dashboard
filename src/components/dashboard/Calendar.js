import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { DayPickerRangeController } from 'react-dates'
import enhanceWithClickOutside from 'react-click-outside'
import moment from '../../utils/moment'

const SUNDAY = 0
const MONDAY = 1
const SATURDAY = 6

class Calendar extends PureComponent {
  constructor (props) {
    super(props)

    this.today = moment()
  }

  render () {
    const {onRangeChange, from, to, calendarRef, dateClick, showCalendar} = this.props
    return (
      <div className="height-smaller flo-r pos-r">
        <div className="flo-r rka-h2" onClick={dateClick}>
          <p className="flo-r rka-h2 mt-xs click-div">
            {from.toDate().toLocaleDateString()}
            <span className="ph-sm">-</span>
            {to.toDate().toLocaleDateString()}
          </p>
        </div>
        {showCalendar ? (
          <div tabIndex="0" className="flo-r mt-xs calendar-wrapper dis-b" ref={calendarRef}>
            <DayPickerRangeController
              startDate={from}
              endDate={to}
              onDatesChange={onRangeChange}
              focusedInput={null} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
              onFocusChange={focusedInput => { console.log(focusedInput) }} // PropTypes.func.isRequired,
              firstDayOfWeek={MONDAY}
              enableOutsideDays
              hideKeyboardShortcutsPanel
              isOutsideRange={date => date.isAfter(this.today, 'day')}
              isDayHighlighted={date => {
                const day = date.day()

                console.log(date.format('YYYY-MM-DD'), day, day === SUNDAY || day === SATURDAY)

                return day === SUNDAY || day === SATURDAY
              }}
            />
          </div>
        ) : null}
      </div>
    )
  }

  handleClickOutside () {
    this.props.onBlurHideCalendar()
  }
}

Calendar.propTypes = {
  onBlurHideCalendar: PropTypes.func.isRequired,
  onRangeChange: PropTypes.func.isRequired,
  from: PropTypes.object.isRequired,
  to: PropTypes.object.isRequired,
  calendarRef: PropTypes.func.isRequired,
  dateClick: PropTypes.func.isRequired,
  showCalendar: PropTypes.bool.isRequired
}

export default enhanceWithClickOutside(Calendar)
