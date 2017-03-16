import React, { Component, PropTypes } from 'react'
import { authRequired } from '../utils/auth'
import { clearImages } from '../state'
import BaseLayout from './layouts/BaseLayout'
import ImageList from './images/List'
import UploadImage from './images/Upload'

class Images extends Component {
  constructor () {
    super()

    this.onClickImage = this.onClickImage.bind(this)
  }

  onClickImage (e, image) {
    e.preventDefault()

    this.props.router.push(`/images/${image.hash}`)
  }

  componentWillUnmount () {
    clearImages()
  }

  render () {
    return (
      <BaseLayout {...this.props}>
        <h1 className="rka-h1 mb-md">Images</h1>
        <UploadImage organization={this.props.auth.organization} />
        <section className="rka-section rka-box pa-md mt-md">
          <ImageList enableSearch onClickImage={this.onClickImage} limit={12} enableLoadMore organization={this.props.auth.organization} images={this.props.images} />
        </section>
      </BaseLayout>
    )
  }
}

Images.propTypes = {
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  auth: PropTypes.object,
  images: PropTypes.array
}

export default authRequired(Images)
