import React, { PureComponent } from 'react'
import { Route } from 'react-router'
import { authRequired } from '../utils/auth'
import BaseLayout from './layouts/BaseLayout'
import NoStackSelected from './NoStackSelected'
import Stack from './Stack'

class Stacks extends PureComponent {
  render () {
    return (
      <BaseLayout {...this.props}>
        <div className="section">
          <div className="row">
            <div className="col-md-12">
              <Route path="/stacks" exact render={props => <NoStackSelected {...{...this.props, ...{ router: props }}} />} />
              <Route path="/stacks/:name" render={props => <Stack {...{...this.props, ...{ router: props }}} />} />
            </div>
          </div>
        </div>
      </BaseLayout>
    )
  }
}

export default authRequired(Stacks)
