import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import moment from 'moment'
import { Calendar as CalendarComponent } from 'react-calendar-component'
import enhanceWithClickOutside from 'react-click-outside'
import cx from 'classnames'

class Calendar extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      date: moment(),
      start: null,
      end: null,
      selectedRange: new Set()
    }
  }

  onChangeMonth (date) {
    this.setState({date})
  }

  onPickDate (date) {
    let { start, end } = this.state
    if (start && end) {
      start = null
      end = null
    }
    if (start === null) {
      start = date
    } else {
      end = date
    }
    if (start && end && end.isBefore(start)) {
      const intermediate = start
      start = end
      end = intermediate
    }
    this.setState({start, end})
  }

  onMouseOver (date) {
    const { start, end } = this.state
    let selectedRange = null

    if (!start || (start && end) || start.isSame(date)) {
      return
    }
    const daysDiff = date.diff(start, 'days')
    if (daysDiff < 0) {
      selectedRange = new Set(Array(Math.abs(daysDiff)).fill().map((_, i) => date.clone().add(i, 'day').format()))
    } else {
      selectedRange = new Set(Array(daysDiff).fill().map((_, i) => start.clone().add(i, 'day').format()))
    }
    this.setState({selectedRange})
  }

  render () {
    const today = moment()
    const { start, end, selectedRange } = this.state

    return (
      <CalendarComponent
        onChangeMonth={(date) => this.onChangeMonth(date)}
        date={this.state.date}
        onPickDate={(date) => this.onPickDate(date)}
        weekOffset={1}
        renderDay={date => {
          const selected = date.isSame(start) || date.isSame(end)
          const inRange = start && end && date.isBetween(start, end, 'day')
          const hover = selectedRange.has(date.format())
          const className = cx('fill', {
            'today': date.isSame(today, 'day'),
            'weekend': date.isoWeekday() >= 6,
            'selected': selected || inRange || hover
          })
          return (
            <div className={className} onMouseOver={() => this.onMouseOver(date)}>
              {date.format('D')}
            </div>
          )
        }}
      />
    )
    /*
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
            <MonthView
              onRangeChange={onRangeChange}
              weekNumbers={false}
              locale="en"
              maxDate={new Date()}
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
    */
  }

  handleClickOutside () {
    this.props.onBlurHideCalendar()
  }
}

Calendar.propTypes = {
  onBlurHideCalendar: PropTypes.func.isRequired
  /*
  onRangeChange: PropTypes.func.isRequired,
  from: PropTypes.object.isRequired,
  to: PropTypes.object.isRequired,
  calendarRef: PropTypes.func.isRequired,
  dateClick: PropTypes.func.isRequired,
  showCalendar: PropTypes.bool.isRequired
  */
}

export default enhanceWithClickOutside(Calendar)
