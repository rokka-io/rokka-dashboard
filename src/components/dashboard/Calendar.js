import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import moment from 'moment'
import { Calendar as CalendarComponent } from 'react-calendar-component'
import enhanceWithClickOutside from 'react-click-outside'
import cx from 'classnames'

class Calendar extends PureComponent {
  constructor (props) {
    super(props)

    this.today = moment()
    this.state = {
      originalStart: props.from,
      originalEnd: props.to,
      date: this.today,
      start: props.from,
      end: props.to,
      temporaryEnd: null
    }

    this.onKeyDown = this.onKeyDown.bind(this)
  }

  onKeyDown (e) {
    if (e.keyCode === 27) { // escape
      this.props.close()
    }
  }

  componentDidMount () {
    window.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.onKeyDown)
  }

  onChangeMonth (date) {
    this.setState({date})
  }

  onPickDate (date) {
    let { start, end, temporaryEnd } = this.state
    if (start && end) {
      start = null
      end = null
      temporaryEnd = null
    }
    if (start === null) {
      start = date
    } else if (!start.isSame(date, 'day')) {
      end = date
    }
    if (start && end && end.isBefore(start, 'day')) {
      const intermediate = start
      start = end
      end = intermediate
    }
    this.setState({start, end, temporaryEnd}, () => {
      const { start, end } = this.state
      if (start && end) {
        this.props.onRangeChange(start, end)
      }
    })
  }

  onMouseOver (date) {
    let { start, end } = this.state

    if (!start || (start && end)) {
      return
    }

    const daysDiff = date.diff(start, 'day')
    let temporaryEnd = null
    if (daysDiff !== 0) {
      temporaryEnd = start.clone().add(daysDiff, 'day')
    }

    this.setState({
      temporaryEnd
    })
  }

  render () {
    let { start, end, temporaryEnd } = this.state
    const { from, to, onDateClick, showCalendar } = this.props

    // on mouse over case
    if (!end && temporaryEnd) {
      if (temporaryEnd.isBefore(start)) {
        end = start
        start = temporaryEnd
      } else {
        end = temporaryEnd
      }
    }

    return (
      <div className="height-smaller flo-r pos-r">
        <div className="flo-r rka-h2" onClick={onDateClick}>
          <p className="flo-r rka-h2 mt-xs click-div">
            {from.toDate().toLocaleDateString()}
            <span className="ph-sm">-</span>
            {to.toDate().toLocaleDateString()}
          </p>
        </div>
        {showCalendar ? (
          <div tabIndex="0" className="flo-r mt-xs calendar-wrapper dis-b">
            <CalendarComponent
              onChangeMonth={(date) => this.onChangeMonth(date)}
              date={this.state.date}
              onPickDate={(date) => this.onPickDate(date)}
              weekOffset={1}
              renderHeader={(date, handlePrevMonth, handleNextMonth) => (
                <div>
                  <div className="Calendar-header">
                    <button onClick={handlePrevMonth}>«</button>
                    <div className="Calendar-header-currentDate">
                      {date.format('MMMM YYYY')}
                    </div>
                    <button onClick={handleNextMonth}>»</button>
                  </div>
                  <div className="Calendar-grid Calendar-week-day-names mb-sm">
                    <div className="Calendar-grid-item">Mon</div>
                    <div className="Calendar-grid-item">Tue</div>
                    <div className="Calendar-grid-item">Wed</div>
                    <div className="Calendar-grid-item">Thu</div>
                    <div className="Calendar-grid-item">Fri</div>
                    <div className="Calendar-grid-item">Sat</div>
                    <div className="Calendar-grid-item">Sun</div>
                  </div>
                </div>
              )}
              renderDay={date => {
                const first = start && start.isSame(date, 'day')
                const last = end && end.isSame(date, 'day')
                const inRange = start && end && date.isBetween(start, end, 'day', '[]')
                const future = date.isAfter(this.today, 'day')
                const hoverable = !future && !inRange
                const className = cx('date-item', {
                  'today': date.isSame(this.today, 'day'),
                  'weekend': date.isoWeekday() >= 6,
                  'selected': inRange,
                  future,
                  first,
                  last,
                  hoverable
                })
                return (
                  <div className={className} onMouseOver={() => !future && this.onMouseOver(date)}>
                    <div className="text">
                      {date.format('D')}
                    </div>
                  </div>
                )
              }}
            />
          </div>
        ) : null}
      </div>
    )
  }

  handleClickOutside () {
    this.props.close()
  }
}

Calendar.propTypes = {
  close: PropTypes.func.isRequired,
  onRangeChange: PropTypes.func.isRequired,
  from: PropTypes.object.isRequired,
  to: PropTypes.object.isRequired,
  onDateClick: PropTypes.func.isRequired,
  showCalendar: PropTypes.bool.isRequired
}

export default enhanceWithClickOutside(Calendar)
