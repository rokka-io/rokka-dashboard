import React, { PureComponent, PropTypes } from 'react'
import moment from 'moment'
import rokka from '../../rokka'
import Chart from './Chart'
import Spinner from '../Spinner'
import getStats from './graphdata'
import Calendar from './Calendar'

class Stats extends PureComponent {

  constructor () {
    super()

    this.state = {
      from: moment().subtract(1, 'months'),
      to: moment(),
      stats: {},
      showCalendar: false
    }

    this.onRangeChange = this.onRangeChange.bind(this)
    this.onBlurHideCalendar = this.onBlurHideCalendar.bind(this)
  }

  componentDidMount () {
    this.fetchStats()
  }

  statsDateRange () {
    return (
      <Calendar
        onBlurHideCalendar={this.onBlurHideCalendar}
        onRangeChange={this.onRangeChange}
        from={this.state.from} to={this.state.to}
        calendarRef={(calendarRef) => { this.calendarRef = calendarRef }}
        dateClick={() => { this.setState({showCalendar: !this.state.showCalendar}, () => this.calendarRef.focus()) }}
        showCalendar={this.state.showCalendar}
      />
    )
  }

  onRangeChange (dateString, [from, to], event) {
    if (!from || !to || !event) {
      return
    }
    this.setState({from: from.dateMoment, to: to.dateMoment, showCalendar: false, stats: {}}, () => this.fetchStats())
  }

  onBlurHideCalendar (event) {
    this.setState({showCalendar: false})
  }

  fetchStats () {
    const { from, to } = this.state
    const toPlusOne = to.clone()
    toPlusOne.add(1, 'day') // ROKKA-152: Stats API from/to are exclusive
    rokka.stats.get(this.props.organization, from.format('YYYY-MM-DD'), toPlusOne.format('YYYY-MM-DD'))
      .then(({ body }) => {
        this.setState({
          stats: getStats(from, to, body)
        })
      })
      .catch(e => {
        console.error(e)
      })
  }

  renderStatistics () {
    const { stats, totals, symbols } = this.state.stats

    return (
      <div>
        <div className="row">
          <div className="col-md-4 col-sm-4 txt-c">
            <div className="rka-box no-min-height">
              <div className="txt-xl pb-sm txt-brand">{totals.traffic.toLocaleString()} {symbols.traffic}</div>
              <div className="txt-md">Traffic</div>
            </div>
          </div>
          <div className="col-md-4 col-sm-4 txt-c">
            <div className="rka-box no-min-height">
              <div className="txt-xl pb-sm txt-brand">{totals.space.toLocaleString()} {symbols.space}</div>
              <div className="txt-md">Storage</div>
            </div>
          </div>
          <div className="col-md-4 col-sm-4 txt-c">
            <div className="rka-box no-min-height">
              <div className="txt-xl pb-sm txt-brand">{totals.files.toLocaleString()}</div>
              <div className="txt-md">Images</div>
            </div>
          </div>
        </div>
        <div className="rka-box">
          <h2 className="rka-h2">Traffic in {symbols.traffic}</h2>
          <Chart type="area" data={stats.traffic} yPointSymbol={`{value} ${symbols.traffic}`} />
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-6">
            <div className="rka-box">
              <h2 className="rka-h2">Storage in {symbols.space}</h2>
              <Chart type="column" data={stats.space} yPointSymbol={`{value} ${symbols.space}`} />
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="rka-box">
              <h2 className="rka-h2">Number of images</h2>
              <Chart type="column" data={stats.files} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  render () {
    const { stats } = this.state.stats

    return (
      <div>
        <div className="mb-md clearfix">
          <h1 className="rka-h1 flo-l">Dashboard</h1>
          {this.statsDateRange()}
        </div>
        { stats ? this.renderStatistics() : <Spinner /> }
      </div>
    )
  }
}
Stats.propTypes = {
  organization: PropTypes.string.isRequired
}

export default Stats
