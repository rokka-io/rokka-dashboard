import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { authRequired } from '../utils/auth'
import BaseLayout from './layouts/BaseLayout'
import { Route } from 'react-router-dom'
import CostDetail from './CostDetail'
import moment from 'moment'
import { Redirect } from 'react-router'

class Costs extends PureComponent {
  render() {
    return (
      <BaseLayout {...this.props}>
        <Route
          path="/costs"
          exact
          render={props => {
            return (
              <Redirect
                to={`/costs/${moment()
                  .startOf('month')
                  .format('YYYY-MM')}-1`}
              />
            )
          }}
        />
        <Route
          path="/costs/:date"
          render={props => <CostDetail {...{ ...this.props, ...{ router: props } }} />}
        />
      </BaseLayout>
    )
  }
}

Costs.propTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  auth: PropTypes.object
}

export default authRequired(Costs)
