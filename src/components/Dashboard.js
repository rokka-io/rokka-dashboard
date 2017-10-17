import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { authRequired } from '../utils/auth'
import BaseLayout from './layouts/BaseLayout'
import { Link } from 'react-router'
// import ImageList from './images/List'
import Stats from './dashboard/Stats'

class Dashboard extends Component {
  constructor () {
    super()

    this.onClickImage = this.onClickImage.bind(this)
  }

  onClickImage (e, image) {
    e.preventDefault()

    this.props.router.push(`/images/${image.hash}`)
  }

  render () {
    return (
      <BaseLayout className="rka-dashboard" {...this.props}>
        <section className="rka-section">
          <Stats organization={this.props.auth.organization} />
          <div className="rka-box">
            <h2 className="rka-h2">Latest images</h2>
            <Link to="images" className="rka-box-link rka-link">View all</Link>
            {/* <ImageList onClickImage={this.onClickImage} limit={12} organization={this.props.auth.organization} /> */}
          </div>
        </section>
      </BaseLayout>
    )
  }
}
Dashboard.propTypes = {
  auth: PropTypes.shape({
    organization: PropTypes.string.isRequired
  }).isRequired,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default authRequired(Dashboard)
