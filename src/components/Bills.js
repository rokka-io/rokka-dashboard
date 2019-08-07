import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { authRequired } from '../utils/auth'
import BaseLayout from './layouts/BaseLayout'
import { Route } from 'react-router-dom'
import BillDetail from './BillDetail'
import moment from 'moment'
import { Redirect } from 'react-router'

class Bills extends PureComponent {
  render() {
    return (
      <BaseLayout {...this.props}>
        <Route
          path="/bills"
          exact
          render={props => {
            return (
              <Redirect
                to={`/bills/${moment()
                  .startOf('month')
                  .format('YYYY-MM')}-1`}
              />
            )
          }}
        />
        <Route
          path="/bills/:date"
          render={props => <BillDetail {...{ ...this.props, ...{ router: props } }} />}
        />
      </BaseLayout>
    )
  }
}

Bills.propTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  auth: PropTypes.object
}

export default authRequired(Bills)
