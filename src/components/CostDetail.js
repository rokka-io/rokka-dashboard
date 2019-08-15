import { authRequired } from '../utils/auth'
import React, { PureComponent } from 'react'
import rokka from '../rokka'
import _ from 'lodash'
import PropTypes from 'prop-types'
import CostChooser from './CostChooser'
import format from 'format-number'

const DEFAULT_STATE = {
  org: 'loading',
  month: 'loading',
  data: {}
}
const numberFormat = format({ padRight: 2 })

class CostDetail extends PureComponent {
  constructor(props) {
    super(props)
    this.state = DEFAULT_STATE
  }

  componentDidMount() {
    this.getCosts(this.props.router.match.params.date)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.router.match.params.date !== this.props.router.match.params.date) {
      this.getCosts(nextProps.router.match.params.date)
    }
  }

  getCosts(date) {
    this.setState(DEFAULT_STATE)
    rokka()
      .billing.get(this.props.auth.organization, date, date)
      .then(({ body }) => {
        _.forOwn(body, (months, org) => {
          _.forOwn(months, (values, month) => {
            this.setState({ org: org, month: month, data: values })
          })
        })
      })
      .catch(err => {
        this.setState({ org: 'error' })
      })
  }

  getPositions = (title, data) => {
    if (!data) {
      return null
    }
    return _.reduce(
      data,
      (result, values, key) => {
        if (key === 'total') {
          result.push(
            <tr key={key} className={'mb-md'} style={{ height: '3em', fontStyle: 'italic' }}>
              <td style={{ paddingTop: '1em' }}>Subtotal</td>
              <td>
                {values.units_consumed.toLocaleString()} {values.unit}
              </td>
              <td>{numberFormat(values.price_in_chf)} CHF</td>
            </tr>
          )
          return result
        }
        result.push(
          <tr key={key}>
            <td>
              {values.range.from.toLocaleString()} -{' '}
              {values.range.to === 999999999 ? '∞' : values.range.to.toLocaleString()} {values.unit}
            </td>
            <td>
              {values.price_per_unit ? values.price_per_unit + ' CHF * ' : ''}
              {values.units_consumed.toLocaleString()} {values.unit}
            </td>
            <td>{numberFormat(values.price_in_chf)} CHF</td>
          </tr>
        )
        return result
      },
      [
        <tr key={'title'}>
          <td colSpan="2" className={'rka-h3 mb-md'}>
            {title}
          </td>
          <td />
        </tr>
      ]
    )
  }

  getTable = data => {
    return (
      <table key={'table'}>
        <tbody>
          {this.getPositions('Storage', data.storage)}
          {this.getPositions('Traffic', data.traffic)}
          {this.getPositions('Traffic External', data.traffic_external)}
          {this.getPositions('Rendering Transactions', data.rendering_transactions)}
          <tr className={'rka-h3 mb-md'}>
            <td colSpan={2}>Total</td>
            <td>{numberFormat(data.total.price_in_chf)} CHF</td>
          </tr>
        </tbody>
      </table>
    )
  }

  render() {
    const orgs = _.keys(this.state.data.organizations)
    return (
      <div className={'rka-table-costs'}>
        <CostChooser router={this.props.router} />
        <div className="section rka-box no-min-height">
          <h2 className={'rka-h2 mb-md'}>
            {this.state.org === 'loading' || this.state.org === 'error'
              ? 'Loading cost overview ... (may take a while)'
              : 'Provisional cost overview for master organization ' +
                this.state.org +
                ' and month ' +
                this.state.month}
          </h2>
          {this.state.org === 'error' ? 'Error loading costs' : null}
          {this.state.data.combined ? this.getTable(this.state.data.combined) : null}
        </div>
        {this.getForecast()}
        {orgs.length > 1 ? (
          <div className="section rka-box no-min-height" style={{ lineHeight: '1.2em' }}>
            The data includes the following organisations: <br />
            {_.keys(this.state.data.organizations).join(', ')}
          </div>
        ) : null}

        <div className="section rka-box no-min-height" style={{ lineHeight: '1.2em' }}>
          These numbers are of provisional and informative nature only. The final bill may be
          different. If you have questions, do not hesitate to{' '}
          <a
            style={{ color: 'black' }}
            rel="noopener noreferrer"
            target="_blank"
            href={'https://rokka.io/en/contact/'}
          >
            contact us
          </a>
          .
        </div>
      </div>
    )
  }

  getForecast() {
    if (!this.state.data.combined_forecast) {
      return null
    }
    return [
      <div key={'title2'} className="section rka-box no-min-height">
        <h2 className={'rka-h2 mb-md '}>Forecast for this month</h2>
        {this.getTable(this.state.data.combined_forecast)}
      </div>
    ]
  }
}

CostDetail.propTypes = {
  auth: PropTypes.shape({
    organization: PropTypes.string.isRequired
  }).isRequired,
  router: PropTypes.shape({
    match: PropTypes.shape({
      params: PropTypes.shape({
        date: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  }).isRequired
}

export default authRequired(CostDetail)
