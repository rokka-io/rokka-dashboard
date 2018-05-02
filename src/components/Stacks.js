import PropTypes from 'prop-types'
import React, { PureComponent, cloneElement } from 'react'
import { authRequired } from '../utils/auth'
import BaseLayout from './layouts/BaseLayout'

class Stacks extends PureComponent {
  render () {
    return (
      <BaseLayout {...this.props}>
        <div className="section">
          <div className="row">
            <div className="col-md-12">
              {this.props.children
                ? cloneElement(this.props.children, this.props)
                : null
              }
            </div>
          </div>
        </div>
      </BaseLayout>
    )
  }
}

Stacks.propTypes = {
  children: PropTypes.node.isRequired
}
export default authRequired(Stacks)
