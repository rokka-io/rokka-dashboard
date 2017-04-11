import React, { PureComponent, PropTypes } from 'react'
import { MonthView } from 'react-date-picker'
import enhanceWithClickOutside from 'react-click-outside'

class Calendar extends PureComponent {

  render () {
    const {onRangeChange, from, to, calendarRef, dateClick, showCalendar} = this.props
    return (
      <div className="height-smaller flo-r pos-r">
        <div className="flo-r rka-h2 height-20-px" onClick={dateClick}>
          <p className="flo-r rka-h2 mt-xs height-20-px click-div">
            {from.toDate().toLocaleDateString()}
            <span className="ph-sm">-</span>
            {to.toDate().toLocaleDateString()}
          </p>
        </div>
        {showCalendar ? (
          <div tabIndex="0" className="flo-r mt-xs calendar-wrapper dis-b" ref={calendarRef}>
            <MonthView
              onRangeChange={onRangeChange}
              theme={null}
              weekNumbers={false}
              locale="en"
              highlightRangeOnMouseMove
              enableHistoryView={false}
              weekStartDay={1}
              footer={false}
              defaultRange={[from, to]}
              className="calendar float-r"
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
