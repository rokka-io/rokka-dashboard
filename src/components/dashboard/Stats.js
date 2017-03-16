import React, { PureComponent, PropTypes } from 'react'
import moment from 'moment'
import rokka from '../../rokka'
import Chart from './Chart'
import Spinner from '../Spinner'
import getStats from './graphdata'

class Stats extends PureComponent {
  constructor () {
    super()

    this.state = {
      from: moment().subtract(1, 'months'),
      to: moment(),
      stats: {}
    }
  }

  componentDidMount () {
    this.fetchStats()
  }

  statsDateRange () {
    const { from, to } = this.state
    return (
      <p className="flo-r rka-h2 mt-xs">
        {from.toDate().toLocaleDateString()}
        <span className="ph-sm">-</span>
        {to.toDate().toLocaleDateString()}
      </p>
    )
  }

  fetchStats () {
    const { from, to } = this.state
    rokka.stats.get(this.props.organization, from.format('YYYY-MM-DD'), to.format('YYYY-MM-DD'))
      .then(({ body }) => {
        this.setState({
          stats: getStats(from, to, body)
        })
      })
      .catch(e => {
        console.error(e)
      })
  }

  render () {
    const { stats, totals, symbols } = this.state.stats
    if (!stats) {
      return <Spinner />
    }

    return (
      <div>
        <div className="mb-md clearfix">
          <h1 className="rka-h1 flo-l">Dashboard</h1>
          {this.statsDateRange()}
        </div>
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
}
Stats.propTypes = {
  organization: PropTypes.string.isRequired
}

export default Stats
